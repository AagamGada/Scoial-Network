import React from 'react'
import Info from './Info'
import AppBar from '../AppBar'
import CenterBar from './CenterBar'
// import Posts from './PostProfile'
// import Saved from './Saved'
// import LoadIcon from '../../images/loading.gif'
const UserProfile = () => {
    return (
        <div className="profile">
            <AppBar/>
            <Info />
            <div className="profile_tab">
                <button >All Posts</button>
                {/* <button>Saved</button> */}
            </div>
            <CenterBar/>
            {/* <img className="d-block mx-auto" alt="loading" />
            saveTab */}
            {/* <Saved  /> */}
            {/* <Posts  /> */}
        </div>
    )
}
export default UserProfile;