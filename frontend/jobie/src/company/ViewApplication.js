import axios from "axios";
import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
const ViewApplication =()=>{
    const [data, setData] = useState([]);
    const {application_id} = useParams();
    const [alert,setAlert] = useState(null);
    useEffect(() => {
        async function get_data() {
                const result = await fetch(`http://localhost:8000/viewapplication?application_id=${application_id}`)
                .then(response => response.json())
            setData(result)
            console.log(result)
            return result;
            
        }
        get_data();
    }, [])
    const onhandle=async (e)=>{
        e.preventDefault();
        let stat=e.target.update.value;
        let formData = new FormData();
        formData.append("status",stat);
        formData.append("application_id",application_id);
        const result = await axios.post("http://localhost:8000/updateapplication",formData)
        if (result.status === 200){
            setAlert("Updated Sucessfully")
        }
    }
    return(
        <>
            <div>
                <h1>Username:{data.username}</h1>
                <p>First Name: {data.firstname}</p>
                <p>Last Name: {data.lastname}</p>
                <p>Email: {data.email}</p>
                <p>Phone: {data.phone}</p>
                <p>About: {data.about}</p>
                <p>Institution:{data.institution}</p>
                <p>Year of Graduation: {data.year_of_graduation}</p>
                <p>Comapany Name: {data.company_name}</p>
                <p>Start date:{data.start_date}</p>
                <p>end date:{data.end_date}</p>
                <div className="resume">
                    <p>Resume:</p>
                    <a href={`http://localhost:8000/media/${data.resume}`}><button>Click here to view Resume</button></a>
                </div>
               <form method="post" onSubmit={onhandle}>
               <select name="update" id="" >
                    <option value={data.status}><p>{data.status}</p></option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>
                <button>Update</button>
                {alert?<h3>{alert}</h3>:null}
               </form>
            </div>
        </>
    )
}

export default ViewApplication;