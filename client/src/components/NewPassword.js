import React, {useState} from 'react'
import { useParams } from 'react-router';
import axios from '../utils/axios'
export default function NewPassword() {
    const [passValue,setPassValues]=useState({
        password:"",
    });
    const params = useParams();
    const handleSubmit=async(ev)=>{
        ev.preventDefault();
        try{
            const {data}=await axios.post(`/api/user/newPassword/${params.email}`,passValue);

        }catch(err){
            console.log(err);
        }
    }
    const handleChangeInput=(ev)=>{
        setPassValues((prev)=>({
            ...prev,[ev.target.name]:ev.target.value,
        }));
    }
    return (
        <form onSubmit={handleSubmit}>
              <input type="text" id="password" name="password" onChange={handleChangeInput} value={passValue.password}/>
              <button type="submit">Submit</button>
        </form>
    )
}
