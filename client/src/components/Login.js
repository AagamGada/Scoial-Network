import React, { useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../context/UserContext';
import { useSnackbar } from 'notistack';
import axios from '../utils/axios';
import '../style/Login.css'

export default function NewLogin() {
    const {userDispatch}=useContext(UserContext);
    const history = useHistory();
    const {enqueueSnackbar}=useSnackbar();
    const [loginValue,setloginValues]=useState({
        email:"",
        password:"",
    });
    const handleSubmit=async(ev)=>{
        ev.preventDefault();
        try{
            const {data}=await axios.post("/api/user/login",loginValue);
            userDispatch({type:"LOGIN_USER",payload:data.payload});
            let accessToken=data.accessToken;
            localStorage.setItem("auth-token",accessToken);
            enqueueSnackbar("Logged in Successfully",{variant:"success"})
            history.push("/Social-Hunt/")
        }catch(err){
            console.log(err);
            enqueueSnackbar("Invalid login credentials",{variant:"error"})
        }
    }
    const handleChangeInput=(ev)=>{
        setloginValues((prev)=>({
            ...prev,[ev.target.name]:ev.target.value,
        }));
    }
    return (
    <div className="center">
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" required name="email" onChange={handleChangeInput} value={loginValue.email}/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input type="password" required name="password" onChange={handleChangeInput} value={loginValue.password}/>
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login"/>
        <div className="signup_link">
          Not a member? <Link to="/Social-Hunt/signup">Signup</Link>
        </div>
      </form> 
    </div>
    )
}
