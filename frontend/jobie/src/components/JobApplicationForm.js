import {useState,useEffect} from "react";
import {useNavigate} from"react-router-dom";
import axios from "axios";
const JobApplicationForm = (props) => {
    const navigate = useNavigate();
    async function onhandle(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("username",e.target.username.value);
        formData.append("job_id",e.target.job_id.value);
        formData.append("note",e.target.note.value);
        formData.append("resume",e.target.resume.files[0]);
        const res = await axios.post("http://localhost:8000/apply",formData)
        if (res.status===200){
            navigate('/myapplications');
        }   
        else if (res.status === 409){
            alert("Already Applied");
        }
    } 
    return (
        <>
            <div className="form_container">
                <div className="company_head">
                    <h1>{props.job_title}</h1>
                    <h3>{props.company}</h3>
                </div>
                <div className="form_body">
                    <div className="personal_details">
                        <form method="POST" onSubmit={onhandle} encType="multipart/form-data">
                            <input type="text" value={localStorage.getItem('user')} name="username" disabled/>
                            <input type="text"  value={props.job_id} disabled hidden name="job_id"/>
                            <input type="text" name="note" placeholder="Say About you"/>
                           <div>
                             <p>Resume:</p>
                            <input type="file" name="resume"  />
                           </div>
                            <button>Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default JobApplicationForm