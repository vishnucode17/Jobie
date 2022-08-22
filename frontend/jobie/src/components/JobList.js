import axios from "axios";
import { useState, useEffect } from "react";
const JobList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function get_data() {
            const result = await fetch("http://localhost:8000/joblist")
                .then(response => response.json())
            setData(result)
            return result;
        }
        get_data();
    }, [])
    console.log(data);

    return (
        <>
            <div className="job_arena">
                <div className="search">

                </div>
                <div className="job_listing">
                    {data?data.map((job) => {
                        return (
                            <div className="job_card">
                                <div className="company_logo">
                                    <img src="" alt="" />
                                </div>
                                <div className="job_info">
                                    <div key={job.job_id}>
                                        <h1>{job.title}</h1>
                                        <h3>{job.company_name}</h3>
                                        <a href={`/explore/${job.job_id}`}><button>Apply</button></a>
                                    </div>
                                </div>
                            </div>
                        )
                    }):""}
                </div>
            </div>
        </>
    )
};
export default JobList;