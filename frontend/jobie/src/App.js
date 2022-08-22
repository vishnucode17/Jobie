import Header from "./utilities/Header";
import Home from "./common/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import JobList from "./components/JobList";
import JobView from "./components/JobView";
import CandidateDetails from "./components/CandidateDetails";
import MyApplications from "./components/MyApplications";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import axios from "axios";
import {useState,useEffect} from "react";
import AddCompany from "./company/AddCompany";
import ViewApplications from "./company/ViewApplications";
import ViewApplication from "./company/ViewApplication";
import AddJob from "./company/AddJob";
function App() {
  const [logged_in,setLoggedIn] = useState(false);
  const [username,setUsername] = useState("");
  if (localStorage.getItem("token") && !logged_in) {
    setLoggedIn(true);
  }
  
  async function login(){
    if (logged_in) {
      const res = await axios.get('http://localhost:8000/current_user/',{
      headers:{
        Authorization: `JWT ${localStorage.getItem("token")}`,
      }
    })
    .then (res => res.json())
    .then (json => {
      setUsername({username:json.username});
    });
    }
  }
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element = {<Home/>}/>
        <Route exact path="/register" element = {<Register/>}/>
        <Route exact path="/login" element = {<Login/>}/>
        <Route exact path="/explore" element={<JobList/>}/>
        <Route exact path="/explore/:job_id" element={<JobView/>}/>
        <Route exact path="/profile/edit" element={<CandidateDetails/>}/>
        <Route exact path="/myapplications" element={<MyApplications/>}/>
        <Route exact path="/addcompany" element={<AddCompany/>}/>
        <Route exact path="/allapplications" element={<ViewApplications/>}/>
        <Route exact path="/application/:application_id" element={<ViewApplication/>}/>
        <Route exact path="/addjob" element={<AddJob/>}/>


      </Routes>
    </Router>
  );
}

export default App;
