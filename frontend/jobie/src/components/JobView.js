import {useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import JobApplicationForm from "./JobApplicationForm";

const JobView = () =>{
    const [data, setData] = useState({});
    let { job_id } = useParams();
    useEffect(() => {
        async function get_data() {
            const result = await fetch(`http://localhost:8000/jobdetails?job_id=${job_id}`)
                .then(response => response.json())
            setData(result)
            return result;
        }
        get_data();
    }, [])

    
    
    return (
        <>
            <h1>{data.title}</h1>
            <h3>{data.company_name}</h3>
            <h2>About Job</h2>
            <p>{data.description}</p>

            <h2>Company Details</h2>
            <p>{data.about}</p>

            <a href=""><button>Apply</button></a>
            <JobApplicationForm job_id={job_id}/>
        </>
    )
}
export default JobView