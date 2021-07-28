import React, { useEffect, useContext } from 'react';
import "../style/Home.css";
// import { useHistory } from "react-router-dom";
// import { UserContext } from '../context/UserContext';
import CenterBar from './CenterBar';
import AppBar from './AppBar';
export default function Home() {
    // const history = useHistory();
    // const { userState } = useContext(UserContext)
    // let accessToken = localStorage.getItem("auth-token");
    // useEffect(() => {
    //     if (!accessToken) {
    //         history.push("/login");
    //     }
    // }, [])
    
    // console.log(userState.authenticated);
    return (
        <div>
            <AppBar/>
            <CenterBar/>
        </div>
    )
}