import React, { useState, useContext } from "react";
// import Avatar from './Avatar'
// import FollowBtn from "./FollowBtn";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/UserContext";
// import Followers from './Followers'
// import Following from './Following'
// import UserCard from './UserCard'
import "../../style/Profile.css";
import Person from "../../images/person1.jpg";
const Info = () => {
  const { userState } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="info">
      <div className="info_container">
        {/* <Avatar src={Person} size="supper-avatar" /> */}
        <img
          src="http://localhost:5000/images/person1.jpg"
           className="supper-avatar"
        />
        <div className="info_content">
          <div className="info_content_title">
            {/* {console.log(userState.user)} */}
            <h2>{userState.user?.name}</h2>
            <button className="btn btn-outline-info" onClick={handleClickOpen}>
              Edit Profile
            </button>
            {/* <FollowBtn /> */}
          </div>
          <div className="follow_btn">
            <span className="mr-4">{userState.user?.followers.length} Followers</span>
            {/* {console.log(userState.user)} */}
            <span className="ml-4">{userState.user?.following.length} Following</span>
          </div>
          <h6>
          {userState.user?.city}<span className="text-danger"></span>
          </h6>
          <p className="m-0">{userState.user?.bio}</p>
          {/* {userState.user?.city && (
            <h6>
              {userState.user?.city}
              <span className="text-danger"></span>
            </h6>
          )}
          {userState.user?.bio && <p className="m-0">{userState.user?.bio}</p>} */}
          <h6 className="m-0"></h6>
          <a target="_blank" rel="noreferrer"></a>
          {/* <p>vcvcv</p> */}
        </div>
        {open && <EditProfile setOpen={setOpen} />}
        {/* <Followers  /> */}
        {/* <Following/> */}
      </div>
    </div>
  );
};
export default Info;
