import React, {useEffect, useState} from "react";
import UserCard from "./UserCard";
import FollowBtn from "../profile/FollowBtn";
import axios from "../../utils/axios"
import { useParams } from "react-router";
const Following = ({ setShowFollowing }) => {
  const [allFollowing, setAllFollowing] = useState(null);
  const params = useParams();
  async function getFollowing() {
    console.log("hi");
    try {
      const userId = params.userId;
      console.log(userId);
      const { data } = await axios.get(`/api/user/following/${userId}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFollowing();
  }, [params.userId]);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Following</h5>
        <hr />
        <div className="follow_content">
          <UserCard setShowFollowing={setShowFollowing}></UserCard>
          {/* <FollowBtn/>   */}
        </div>
        <div className="close" onClick={() => setShowFollowing(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default Following;
