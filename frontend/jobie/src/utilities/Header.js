import React from 'react';
import '../static/css/header.css';
import { useNavigate } from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    return (
        <header>
            <nav id="navbar">

                <a href="/" id="nav_brand">
                    <p id="brand-text">Jobie</p>
                </a>
                <ul className="hamburger">
                    {/* <li className="nav_links"><a id="employee" href="">For Job Seekers</a></li>
                        <li className="nav_links"><a id="employer" href="">For Companies</a></li> */}


                    {
                        localStorage.getItem("token") ?

                            <div id="menu">
                                <li className="nav_links logout" onClick={() => {
                                localStorage.removeItem("token");
                                navigate('/');
                            }}
                            >Logout</li>
                            <li className="nav_links"><a href="/explore">Explore</a></li>
                            <li className="nav_links"><a href="/addcompany">Add Company</a></li>
                            <li className="nav_links"><a href="/myapplications">My Applications</a></li>
                            <li className="nav_links"><a href="/allapplications">Received Applications</a></li>
                            </div>
                :
                <>
                    <li className="nav_links"><a href="/login">Login</a></li>
                    <li className="nav_links"><a href="/register">Sign Up</a></li>
                </>

                    }


            </ul>
        </nav>
        </header >
    )
}
export default Header;