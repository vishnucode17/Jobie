import axios from "axios";
import { useState, useEffect } from "react";
import '../static/css/job.css';
const ViewApplications = () => {
    const [data, setData] = useState([]);
    const [company,setCompany] = useState(null);
    useEffect(() => {
        async function get_company() {
            let formData = new FormData();
            formData.append("username",localStorage.getItem("user"))
            const result= await axios.post("http://localhost:8000/getcompany_id",formData)
            setCompany(result.data['company']);
            // console.log(company);
        }
        get_company();
    },[company])
    useEffect(() => {
        async function get_data() {
            let formData = new FormData();
            formData.append("company_name",company);
            if (company){
                const result = await fetch(`http://localhost:8000/applications?company_name=${company}`)
                .then(response => response.json())
            setData(result.data)
            console.log(result.data)
            return result;
            }
        }
        get_data();
    }, [company])
    // console.log(data);

    return (
        <>
            <div id="hi">
            {data.map((job) => {
                    return (
                        <a href={`/application/${job.application_id}`} key={job.application_id}>
                            <div  className="job_card">
                            <h2>{job.username}</h2>
                            <h3>{job.job_id}</h3>
                            <p>{job.applied_on}</p>
                        </div>
                        </a>
                    )
                })}
            
            </div>
        </>
    )
};
export default ViewApplications;