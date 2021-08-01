import React, { useEffect, useState, useContext } from "react";
import UserCard from "./UserCard";
import axios from "../../utils/axios";
// import { useParams } from "react-router";
import { UserContext } from "../../context/UserContext"
const Followers = ({ setShowFollowers }) => {
  const [allFollowers, setAllFollowers] = useState(null);
  const { userState } = useContext(UserContext);
//   const params = useParams();
  async function getFollowers() {
    try {
    //   const userId = params.userId;
      const { data } = await axios.get(`/api/user/followers/${userState.user._id}`);
      setAllFollowers(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFollowers();
  }, []);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Followers</h5>
        <hr />
        <div className="follow_content">
          <UserCard setShowFollowers={setShowFollowers} allFollowers={allFollowers}>
            {/* <FollowBtn /> */}
          </UserCard>
        </div>
        <div className="close" onClick={() => setShowFollowers(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default Followers;
