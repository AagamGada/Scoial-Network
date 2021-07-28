import React, { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import "../style/SinglePost.css";
import PersonImg from "../images/person1.jpg";
import Comments from "..//components/Comments";
import { MoreVert, Favorite, ThumbUpAlt } from "@material-ui/icons";
import { PostContext } from "../context/PostContext";
import { useParams } from "react-router";
import axios from "../utils/axios";
export default function SinglePost() {
  const params = useParams();
  //   const { postState, postDispatch } = useContext(PostContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // const fetchPostAndComment = async () => {
    //   try {
    //     const postId = params.postId;
    //     const [postdata, commentdata] = await Promise.all([
    //       axios.get(`/api/post/${postId}`),
    //       axios.get(`api/comment/${postId}`),
    //     ]);
    //     postDispatch({ type: "POST_LOADED", payload: postdata.data.post });
    //     postDispatch({
    //       type: "COMMENTS_LOADED",
    //       payload: commentdata.data.comment,
    //     });
    //     console.log(postState.post);
    //     console.log(postState.comments);
    //   } catch (err) {
    //     // blogDispatch({ type: "BLOG_ERROR", payload: "Internal Server Error" });
    //     console.log(err);
    //   }
    // };
    // fetchPostAndComment();
    const getPost = async () => {
      try {
        const postId = params.postId;
        const data = await axios.get(`/api/post/${postId}`);
        setPost(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getComments = async () => {
      try {
        const postId = params.postId;
        const data = await axios.get(`/api/comment/${postId}`);
        setComments([data.data]);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
    getComments();
  }, []);
  let month = new Date(post?.createdAt).toLocaleString("default", {
    month: "short",
  });
  let day = new Date(post?.createdAt).getDate();
  return (
    <div>
    {console.log(post)}
    {console.log(comments)}
    <AppBar />
      <div className="singlePost" style={{ background: "white" }}>
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img className="postTopImg" src={PersonImg} alt="" />
              <span className="postUser">{post?.user.name}</span>
              <span className="postDate">{`${month} ${day}`}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="text">{post?.content}</span>
            <img src={PersonImg} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              {/* {isLike ? (<>
                      <Favorite htmlColor="red" className="likeIcon" onClick={handleLike} />
                      <span className="postLikeCounter">{props.post.likes.length} Likes</span>
                  </>)
                      :
                      (
                          <>
                              <Favorite htmlColor="grey" className="likeIcon" onClick={handleLike} />
                              <span className="postLikeCounter">{props.post.likes.length} Likes</span>
                          </>
                      )} */}
              <Favorite className="likeIcon" />
              <span className="postLikeCounter">
                {post?.likes.length} Likes
                {/* {console.log(postState.likes)} */}
                {/* {console.log(allLikes)} */}
              </span>

              {/* <Favorite htmlColor="grey" className="likeIcon" onClick={handleLike}/>
                  <span className="postLikeCounter">{props.post.likes.length} likes</span> */}
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">
                {comments[0]?.length} comments
              </span>
            </div>
          </div>
          {/* <hr class="solid" style={{borderTop: "1px solid black", maxWidth:"100%"}}></hr> */}
          <div className="comments">
            <input
              type="text"
              className="postComment"
              placeholder="Add a comment.."
              //   onChange={(ev) => setComment(ev.target.value)}
            ></input>
            <button
              variant="contained"
              className="commentButton"
              //   onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
        {/* {JSON.stringify(allComments)} */}
      </div>
      <h4 style={{ marginLeft: "20%" }} className="postComments">
        Post Comments
      </h4>
      {/* <Comments />
      <Comments />
      <Comments />
      <Comments /> */}
      {comments[0]?.slice(0).map((comment) => {
        return <Comments comment={comment} key={comment._id} />;
      })}

      {/* {console.log(postState.comments)} */}
    </div>
  );
}
