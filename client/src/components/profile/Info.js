import React, { useState, useContext } from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/UserContext";
import "../../style/Profile.css";
import profileImage from "../../images/profileImage.jpg";
import Followers from "./Followers";
import Following from "./Following";
const Info = () => {
  const { userState } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div className="info">
      {console.log(userState.user)}
      <div className="info_container">
        {userState.user?.image ? <img src={userState.user?.image} className="supper-avatar" />: <img src={profileImage} className="supper-avatar" />}
        <div className="info_content">
          <div className="info_content_title">
            <h2>{userState.user?.name}</h2>
            <button className="btn btn-outline-info" onClick={handleClickOpen}>
              Edit Profile
            </button>
          </div>
          <div className="follow_btn">
            <span className="mr-4" onClick={() => setShowFollowers(true)}>
              {userState.user?.followers.length} Followers
            </span>
            <span className="ml-4" onClick={() => setShowFollowing(true)}>
              {userState.user?.following.length} Following
            </span>
          </div>
          <h6>
            {userState.user?.city}
            <span className="text-danger"></span>
          </h6>
          <p className="m-0">{userState.user?.bio}</p>
          <h6 className="m-0"></h6>
          <a target="_blank" rel="noreferrer"></a>
        </div>
        {open && <EditProfile setOpen={setOpen} />}
      </div>
      {showFollowers && <Followers setShowFollowers={setShowFollowers} />}
      {showFollowing && <Following setShowFollowing={setShowFollowing} />}
    </div>
  );
};
export default Info;
