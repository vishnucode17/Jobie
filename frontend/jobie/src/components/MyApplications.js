import axios from "axios";
import { useState, useEffect } from "react";
    import '../static/css/job.css';
const MyApplications=()=>{

    const [data, setData] = useState([]);
    useEffect(() => {
        async function get_data() {
            const result = await fetch(`http://localhost:8000/myapplications?username=${localStorage.getItem('user')}`)
                .then(response => response.json())
            setData(result.data)
            return result;
        }
        get_data();
    }, [])
    console.log(data);
        // console.log(data);
    
        return (
            <>
                <div id="hi">
            {data.map((job) => {
                    return (
                            <div className="job_card"  key={job.application_id}>
                            <h2>{job.username}</h2>
                            <h3>{job.job_id}</h3>
                            <p>{job.applied_on}</p>
                            <strong><p>{job.status}</p></strong>
                        </div>
                    )
                })}
            
            </div>
            </>
        )
    };
export default MyApplications