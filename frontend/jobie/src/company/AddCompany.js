import React,{useState} from 'react';
import axios from "axios";
import '../static/css/auth.css';
import {useNavigate} from "react-router-dom";
const AddCompany = () =>{
    const navigate = useNavigate();

    const onhandler=async(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append("username",e.target.username.value);
        formData.append("company_id",e.target.company_id.value);
        formData.append("company_name",e.target.company_name.value);
        formData.append("category",e.target.category.value);
        formData.append("about",e.target.about.value);
        // formData.append("logo")
        const res = await axios.post("http://localhost:8000/reg_comp",formData)
        
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
            <h1 className="auth-title">Register your company</h1>
                <input type="text" name="username"  placeholder="Username" className="auth-entry" value ={localStorage.getItem('user')} hidden/>
                <input type="text" name="company_id"  className="auth-entry" placeholder="company_id"/>
                <input type="text" name="company_name" placeholder="Company Name" className="auth-entry"/>
                <input type="text" name="category" placeholder="Category" className="auth-entry"/>
                <input type="text" name="about" placeholder="About" className="auth-entry"/>
                {/* <button>Register</button> */}
                
                <input type="submit" value="Register"  className="auth-entry entry-btn"/>
            </form>
        </div>
    )
}
export default AddCompany;