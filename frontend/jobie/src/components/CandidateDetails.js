import axios from "axios";
import {useState,useEffect} from "react";
const CandidateDetails = () =>{
    
    async function onhandle(e){
        e.preventDefault();
        let formData = new FormData();
        formData.append("username",e.target.username.value);
        formData.append("about",e.target.about.value);
        formData.append("phone",e.target.phone.value);
        formData.append("institution",e.target.institution.value);
        formData.append("year",e.target.year_of_graduation.value);
        formData.append("skills",e.target.skills.value);
        formData.append("start_date",e.target.start.value);
        formData.append("end_date",e.target.end.value);
        formData.append("company_name",e.target.company.value)
        const res = await axios.post("http://localhost:8000/addprofile",formData)
    }
    return (
        <>
            <div className="form_body">
                    <div className="personal_details">
                        <h1>Add your details</h1>
                        <form onSubmit={onhandle}>
                        <h2>Personal Details</h2>
                        <input type="text" disabled value={localStorage.getItem('user')} name="username"/>
                        <input type="phone" placeholder="Phone" name="phone"/>
                        <textarea name="about" cols="30" rows="10" placeholder="Say about yourself"></textarea>
                        <h2>Education Details</h2>
                        <input type="text" placeholder="Institution Name" name="institution"/>
                        <input type="text" name="year_of_graduation" placeholder="Year of Graduation"/>
                        <h2>Professional Details</h2>
                        <input type="text" placeholder="Company Name" name="company"/>
                        <input type="text" name="start"/>
                        <input type="text" name="end"/>
                        <textarea name="skills" placeholder="Enter your skills" cols="30" rows="10"></textarea>
                       
                        <button>Submit</button>
                        </form>

                    </div>
                </div>
        </>
    )
}

export default CandidateDetails;