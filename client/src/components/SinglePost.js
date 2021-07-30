import React, { useContext, useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import "../style/SinglePost.css";
import PersonImg from "../images/person1.jpg";
import Comments from "..//components/Comments";
import { MoreVert, Favorite, ThumbUpAlt } from "@material-ui/icons";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router";
import axios from "../utils/axios";
import { useSnackbar } from "notistack";
export default function SinglePost() {
  const params = useParams();
  const { userState, userDispatch } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const { postState, postDispatch } = useContext(PostContext);
  const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState("");
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
    const handleComment = async (ev) => {
      ev.preventDefault();
      try {
        if (comment === "") {
          return enqueueSnackbar("Empty Comment", { variant: "error" });
        }
        const postId = params.postId;
        const { data } = await axios.post(`/api/comment/${postId}`, {
          comment: comment,
        });
        postDispatch({ type: "POST_COMMENTS", payload: data });
        getComments();
        enqueueSnackbar("Posted Successfully", { variant: "success" });
        setComment("")
      } catch (err) {
        console.log(err);
      }
    };
    const handleLike = async (ev) => {
      ev.preventDefault();
      try {
        const postId = params.postId;
        const { data } = await axios.put(`/api/post/likes/${postId}`);
        postDispatch({ type: "POST_LOADED", payload: data });
        setIsLike(true);
        if (post.likes.includes(userState.user._id)) {
          setIsLike(false);
        }
        getPost();
      } catch (err) {
        console.log(err);
      }
    };
    
  useEffect(() => {
    getPost();
    getComments();
    return () => {
      postDispatch({ type: "COMMENTS_UNLOADED" });
      postDispatch({ type: "POST_UNLOADED" });
    };
  }, []);
  let month = new Date(post?.createdAt).toLocaleString("default", {
    month: "short",
  });
  let red =
    post?.likes.includes(userState.user?._id) || isLike
      ? { htmlColor: "red" }
      : { htmlColor: "grey" };
  let day = new Date(post?.createdAt).getDate();
  return (
    <div>
    {console.log(post)}
    {console.log(comments)}
    <AppBar />
      <div className="singlePost" style={{ background: "white" }}>
        <div className="postWrapperSingle">
          <div className="postTop">
            <div className="postTopLeft">
              <img className="postTopImg" src={PersonImg} alt="" />
              <span className="postUser">{post?.user.name}</span>
              <span className="postDate">{`${month} ${day}`}</span>
            </div>
          </div>
          <div className="postCenter">
            <span className="text">{post?.content}</span>
            <img src={PersonImg} alt="" className="postImg" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
            <Favorite {...red} className="likeIcon" onClick={handleLike} />
              <span className="postLikeCounter">
                {post?.likes.length} Likes
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">
                {comments[0]?.length} comments
              </span>
            </div>
          </div>
          <div className="comments">
            <input
              type="text"
              className="postComment"
              placeholder="Add a comment.."
              onChange={(ev) => setComment(ev.target.value)}
              value={comment}
            ></input>
            <button
              variant="contained"
              className="commentButton"
              onClick={handleComment}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <h4 style={{ marginLeft: "20%" }} className="postComments">
        Post Comments
      </h4>
      {comments[0]?.slice(0).map((comment) => {
        return <Comments comment={comment} key={comment._id} />;
      })}
    </div>
  );
}
