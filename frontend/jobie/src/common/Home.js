import React from "react";
import '../static/css/home.css';
const Home = () =>{
    return (
        <div className="home_section">
            <div className="home_banner">
                <div className="intro-info">
                    <h1 id="banner-title">Find the job with <span id="brand-name">Jobie</span></h1>
                    <p id="banner-text">Just Apply and have a cup of Coffee....</p>
                    <div className="action-links">
                        <a href="/addcompany"><button className="btn_action seek">For Companies</button></a>
                        <a href="/explore"><button className="btn_action search">For Jobs</button></a>
                    </div>
                </div>
            <img src="https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5358878e2493fbea064dd9_peep-59.svg" alt="" id="intro-banner"/>
            </div>
        </div>
    )
}
export default Home;