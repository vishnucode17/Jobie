import React,{useState} from 'react';
import axios from "axios";
import '../static/css/auth.css';
import {useNavigate} from "react-router-dom";
const Register = () =>{
    const navigate = useNavigate();
    const [username, setUsername]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onhandler=async(e)=>{
        console.log("hi")
        e.preventDefault();
        let formData = new FormData();
        setUsername(e.target.username.value);
        setFirstName(e.target.first_name.value);
        setLastName(e.target.last_name.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value);
        formData.append("username",username);
        formData.append("first_name",firstName);
        formData.append("last_name",lastName);
        formData.append("email",email);
        formData.append("password",password);
        const res = await axios.post("http://localhost:8000/register",formData)
        // await axios({
        //     url: "http://localhost:8000/register",
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
                
        //     },
        //     data: formData,
        // })
        // .then((res)=>{
        //     let stat_code = res.statusCode;
        //     if (res.statusCode ===201 ){
        //         navigate('/login')
        //     }
        // })
        // .catch((err)=>console.log(err));
        if (res.status === 201){
            navigate('/login');
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
            <h1 className="auth-title">Register</h1>
                <input type="text" name="username"  placeholder="Username" className="auth-entry"/>
                <input type="text" name='first_name' placeholder="First Name" className="auth-entry"/>
                <input type="text" name='last_name' placeholder="Last Name" className="auth-entry"/>
                <input type="email" name='email' placeholder="Email" className="auth-entry"/>
                <input type="password" name="password" placeholder='Password' className="auth-entry"/>
                <input type="submit" value="Register"  className="auth-entry entry-btn"/>
            </form>
        </div>
    )
}
export default Register;