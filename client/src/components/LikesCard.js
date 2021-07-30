import React from "react";
import "../style/Profile.css";
const LikesCard = ({ setShowLikes, allLikes }) => {
  const handleCloseAll = () => {
    if (setShowLikes) setShowLikes(false);
  };
  return (
    <div className="follow">
      <div className="follow_box">
        <h5 className="text-center">Likes</h5>
        <hr />
        <div className="follow_content">
          <div className="d-flex p-2  w-100 card">
            <div>
              <div onClick={handleCloseAll}>
                {/* {allFollowers?.slice(0).map((followers) => {
            // return <UserPosts post={post} key={post._id} />;
            return (
              <div className="d-flex align-items-center mt-3 ">
                <img src={followers.user.image} className="big-avatar" />
                <div className="ml-1" style={{ transform: "translateY(-2px)" }}>
                  <span className="d-block">{followers.user.name}</span>
                  <small style={{ opacity: 0.7 }}></small>
                </div>
              </div>
            );
          })} */}
                {console.log(allLikes)}
              </div>
            </div>
          </div>
        </div>
        <div className="close" onClick={() => setShowLikes(false)}>
          &times;
        </div>
      </div>
    </div>
  );
};
export default LikesCard;