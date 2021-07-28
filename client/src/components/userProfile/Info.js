import React, { useState, useContext, useEffect } from "react";
// import Avatar from './Avatar'
import FollowBtn from "../profile/FollowBtn";
// import EditProfile from "./EditProfile";
import { UserContext } from "../../context/UserContext";
import Followers from "./Followers";
import Following from "./Following";
import UserCard from "./UserCard";
import { useParams } from "react-router";
import axios from "../../utils/axios";
import "../../style/Profile.css";
import Person from "../../images/person1.jpg";
const Info = () => {
  const params = useParams();
  const { userState } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  async function getParticularUser() {
    try {
      const userId = params.userId;
      const { data } = await axios.get(`/api/user/particularUser/${userId}`);
      setUser(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleFollow = async () => {
    try {
      const userId = params.userId;
      const { data } = await axios.put(`/api/user/follow`, { _id: userId });
      console.log(data);
      // setFollowed(true);
      getParticularUser();
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnFollow = async () => {
    try {
      const userId = params.userId;
      const { data } = await axios.put(`/api/user/unfollow`, { _id: userId });
      console.log(data);
      // setFollowed(false);
      getParticularUser();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getParticularUser();
    console.log(user);
    return () => {
      setUser(null);
    };
  }, [params.userId]);
  // console.log(
  //   user?.followers?.filter((val) => val.user === userState.user._id)
  // );
  var follow = user?.followers?.filter(
    (val) => val.user === userState.user._id
  );

  // const isFollowed =user?.followers.includes(user)
  console.log(user?.followers);
  console.log(userState.user);
  console.log(follow, "<This");
  // if(follow.length == 0){
  //   setFollowed(true)
  // }else{
  //   setFollowed(false)
  // }
  // let followbtn =
  //   user?.followers.includes(userState.user?._id)
  //     ? { htmlColor: "red" }
  //     : { htmlColor: "grey" };
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
            <h2>{user?.name}</h2>
            {/* <button className="btn btn-outline-info" onClick={handleClickOpen}>
              Edit Profile
            </button> */}
            <div>
              {console.log(user)}
              {follow?.length ? (
                <button
                  className="btn btn-outline-danger"
                  onClick={handleUnFollow}
                >
                  UnFollow
                </button>
              ) : (
                <button className="btn btn-outline-info" onClick={handleFollow}>
                  Follow
                </button>
              )}
            </div>
          </div>

          <div className="follow_btn">
            <span className="mr-4" onClick={() => setShowFollowers(true)}>
              {user?.followers.length} Followers
            </span>
            <span className="ml-4" onClick={() => setShowFollowing(true)}>
              {user?.following.length} Following
            </span>
          </div>
          {/* <FollowBtn /> */}
          {/* </div> */}
          {/* <div className="follow_btn">
            <span className="mr-4">{user?.followers.length}Followers</span>
            <span className="ml-4">{user?.following.length}Following</span>
          </div> */}
          {user?.city && (
            <h6>
              {user?.city}
              <span className="text-danger"></span>
            </h6>
          )}
          {user?.bio && <p className="m-0">{user?.bio}</p>}
          <h6 className="m-0"></h6>
          <a target="_blank" rel="noreferrer"></a>
          {/* <p>vcvcv</p> */}
        </div>
        {/* {open && <EditProfile setOpen={setOpen} />}
        <Followers setShowFollowers={setShowFollowers} />
        <Following setShowFollowing={setShowFollowing} /> */}
        {/* {open && <EditProfile setOpen={setOpen} />} */}
        {showFollowers && (
          <Followers
            // users={user.followers}
            setShowFollowers={setShowFollowers}
          />
        )}
        {showFollowing && (
          <Following
            // users={user.following}
            setShowFollowing={setShowFollowing}
          />
        )}
      </div>
    </div>
  );
};
export default Info;
