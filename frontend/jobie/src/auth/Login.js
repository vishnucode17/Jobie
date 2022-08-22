import '../static/css/auth.css';
import axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import auth_img from '../static/images/auth.png';

const Login=()=>{
    const [is_loggedin,setLoggedin] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem("token")){
            navigate('/');
        }
    },[]);
    
    async function handleLogin(e){
        e.preventDefault();
        var username = e.target.username.value;
        var password = e.target.password.value;
        console.log(username, password);
        await axios({
            url: "http://localhost:8000/token-auth",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            data: {
                username: username,
                password: password
            },
        })
        .then(res=>{
            if (res.status==200){
                setLoggedin(true);
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("user",username);
                navigate('/');
                
            }
            console.log(res)
        })
        .catch(err=>{console.error(err)});
    }
    return(
        <div className="auth_container">
            <div className="auth-banner">
                <img src={auth_img} alt="" className="login-banner_img" />
            </div>
            <form className="auth_form" onSubmit={handleLogin}>
                <h1 className="auth-title">Login</h1>
                <input type="text" name="username"  placeholder="Username" className="auth-entry"/>
                <input type="password" name="password" placeholder='Password' className="auth-entry"/>
                <input type="submit" value="Login"  className="auth-entry entry-btn"/>
            </form>
        </div>
    )
}
export default Login;