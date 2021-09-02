import React, { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { UserContext } from "../context/UserContext";
import { useSnackbar } from "notistack";
import "../style/Login.css";

export default function Signup() {
  const { enqueueSnackbar } = useSnackbar();
    const { userDispatch } = useContext(UserContext);
    const history = useHistory();
    const [registerValues, setRegisterValues] = useState({
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
    });
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            if (registerValues.password !== registerValues.repeatPassword) {
                return enqueueSnackbar("Password Doesn't match", { variant: "error" });
              }
            const { data } = await axios.post("/api/user/register", registerValues);
            let accessToken = data.accessToken;
            localStorage.setItem("auth-token", accessToken);
            userDispatch({ type: "REGISTER_USER", payload: data.payload });

            enqueueSnackbar("Registered Successfully", { variant: "success" });
            history.push("/Social-Hunt/")
        } catch (err) {
          enqueueSnackbar("Invalid credentials",{variant:"error"})
        }
      };
      const handleChangeInput = (ev) => {
        setRegisterValues((prev) => ({
          ...prev,
          [ev.target.name]: ev.target.value,
        }));
      };
  return (
    <div className="centerR">
      <h1>Signup</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="txt_field">
          <input type="text" required onChange={handleChangeInput} value={registerValues.name} name="name"/>
          <span></span>
          <label>Name</label>
        </div>
        <div className="txt_field">
          <input type="text" required onChange={handleChangeInput} value={registerValues.email} name="email"/>
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input type="password" required onChange={handleChangeInput} value={registerValues.password} name="password"/>
          <span></span>
          <label>Password</label>
        </div>
        <div className="txt_field">
          <input type="password" required onChange={handleChangeInput} value={registerValues.repeatPassword} name="repeatPassword"/>
          <span></span>
          <label>Confirm Password</label>
        </div>
        <input type="submit" value="Signup" />
        <div className="signup_link">
          Already a member? <Link to="/Social-Hunt/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
