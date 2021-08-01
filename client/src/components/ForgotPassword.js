import React, { useState } from 'react'
import { Link, } from 'react-router-dom'
import axios from '../utils/axios';
import '../style/Register.css'

const ForgotPassword = () => {
    
    const [loginValue,setloginValues]=useState({
        email:"",
    });
    const handleSubmit=async(ev)=>{
        ev.preventDefault();
        try{
            await axios.post("/api/user/email",loginValue);
        }catch(err){
            console.log(err);
        }
    }
    const handleChangeInput=(ev)=>{
        setloginValues((prev)=>({
            ...prev,[ev.target.name]:ev.target.value,
        }));
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4">Enter Your Email</h3>
                <h4 className="text-uppercase text-center mb-4">To Reset Password</h4>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email"
                    aria-describedby="emailHelp" onChange={handleChangeInput} value={loginValue.email}/>
                    
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                
                <button type="submit" className="btn btn-dark w-100">
                    Submit
                </button>

                <p className="my-2">
                   <Link to="/login" style={{color: "crimson"}}>Click Here When Done</Link>
                </p>
            </form>
        </div>
    )
}

export default ForgotPassword