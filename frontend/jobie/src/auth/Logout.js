import {useNavigate} from "react-router-dom";
const Logout = () =>{
    const navigate = useNavigate();
    localStorage.removeItem("token");
    navigate('/');
}
export default Logout;