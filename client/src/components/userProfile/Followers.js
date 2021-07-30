import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "../../utils/axios";
import { useParams } from "react-router";
const Followers = ({ setShowFollowers }) => {
  const [allFollowers, setAllFollowers] = useState(null);
  const params = useParams();
  async function getFollowers() {
    console.log("hi");
    try {
      const userId = params.userId;
      console.log(userId);
      const { data } = await axios.get(`/api/user/followers/${userId}`);
      setAllFollowers(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFollowers();
  }, [params.userId]);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Followers</h5>
        <hr />
        <div className="follow_content">
          <UserCard setShowFollowers={setShowFollowers} allFollowers={allFollowers}>
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
