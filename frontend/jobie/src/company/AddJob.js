import React,{useState,useEffect} from 'react';
import axios from "axios";
import '../static/css/auth.css';
import {useNavigate} from "react-router-dom";
const AddJob = () =>{
    const navigate = useNavigate();
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
    const onhandler=async(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append("username",localStorage.getItem("user"));
        formData.append("job_id",e.target.job_id.value);
        formData.append("company_name",e.target.company_name.value)
        formData.append("title",e.target.title.value)
        formData.append("description",e.target.description.value)
        // formData.append("logo")
        const res = await axios.post("http://localhost:8000/addjob",formData)
        
        if (res.status === 200){
            navigate('/');
        }
        else{
            console.log("Error");
        }
    }
    return (
        <div className="auth_container">
            <div className="auth-banner">
                <img src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53596f8e24933d7a06b0c7_peep-67.svg" alt="" className="login-banner_img" />
            </div>
            <form className="auth_form" onSubmit={onhandler}>
            <h1 className="auth-title">Add Job</h1>
                <input type="text" name="job_id"  placeholder="job_id" className="auth-entry" />
                <input type="text" name="company_name"  className="auth-entry" placeholder="company_name" value={company} disabled/>
                <input type="text" name="title" placeholder="Job Title" className="auth-entry"/>
                <input type="text" name="description" placeholder="Description" className="auth-entry"/>
                {/* <button>Register</button> */}
                
                <input type="submit" value="Register"  className="auth-entry entry-btn"/>
            </form>
        </div>
    )
}
export default AddJob;