import React, { useState, useContext, useEffect } from "react";
import "../../style/Post.css";
import PersonImg from "../../images/person1.jpg";
import { MoreVert, Favorite, ThumbUpAlt } from "@material-ui/icons";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
export default function Post(props) {
  const { postState, postDispatch } = useContext(PostContext);
  const { userState, userDispatch } = useContext(UserContext);
  const [allComments, setAllComments] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [comment, setComment] = useState("");
  const [isLike, setIsLike] = useState(false);
//   const [allPost, setAllPost] = useState(0);
  async function getAllComments() {
    try {
      const { data } = await axios.get(`/api/comment/${props.post._id}`);
      postDispatch({ type: "COMMENTS_LOADED", payload: data });
    //   console.log(data);
      setAllComments(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleComment = async (ev) => {
    // ev.preventDefault();
    try {
      if (comment === "") {
        return enqueueSnackbar("Empty Comment", { variant: "error" });
      }
      const { data } = await axios.post(`/api/comment/${props.post._id}`, {
        comment: comment,
      });
      postDispatch({ type: "POST_COMMENTS", payload: data });
      getAllComments();
      enqueueSnackbar("Posted Successfully", { variant: "success" })
    } catch (err) {
      // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
      //   enqueueSnackbar("error", { variant: "error" });
      console.log(err);
    }
  };
//   async function getAllLikes() {
//     try {
//       const { data } = await axios.get(`/api/post/${props.post._id}`);
//       postDispatch({ type: "LIKES_LOADED", payload: data });
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async function getAllPost() {
//     try {
//         const { data } = await axios.get("/api/post");
//         postDispatch({ type: "POSTS_LOADED", payload: data });
//         console.log(data);
//         postState.posts(data.sort((a, b) => {
//             return new Date(b.createdAt) - new Date(a.createdAt)
//         }))
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

  const handleLike = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.put(`/api/post/likes/${props.post._id}`);
      postDispatch({ type: "POST_LOADED", payload: data });
    //   console.log(userState.user._id);
    //   getAllPost();
    //    getAllLikes();
      setIsLike(true)
      if (props.post.likes.includes(userState.user._id)) {
        setIsLike(false);
      }
    } catch (err) {
      // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
      //   enqueueSnackbar("error", { variant: "error" });
      console.log(err);
    }
  };
  useEffect(() => {
    getAllComments();
    return () => {
        postDispatch({ type: "COMMENTS_UNLOADED" });
      };
  }, []);
  let month = new Date(props.post.createdAt).toLocaleString("default", {
    month: "short",
  });
  let red = isLike ? { htmlColor: "red" } : { htmlColor: "grey" };
  let day = new Date(props.post.createdAt).getDate();
  return (
    <div className="post" style={{ background: "white" }}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postTopImg" src={PersonImg} alt="" />
            <span className="postUser">{props.post.user.name}</span>
            <span className="postDate">{`${month} ${day}`}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="text">{props.post.content}</span>
          {props.post.image && <img src={props.post.image} alt="" className="postImg" />}
          {/* <img src={PersonImg} alt="" className="postImg" /> */}
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
            <Favorite {...red} className="likeIcon" onClick={handleLike} />
            <span className="postLikeCounter">
              {props.post.likes.length} Likes
              {/* {console.log(postState.likes)} */}
              {/* {console.log(allLikes)} */}
            </span>

            {/* <Favorite htmlColor="grey" className="likeIcon" onClick={handleLike}/>
                        <span className="postLikeCounter">{props.post.likes.length} likes</span> */}
          </div>
          <div className="postBottomRight">
            <Link to={`/post/${props.post._id}`}>
            <span className="postCommentText">
              {allComments.length} comments
            </span>
            </Link>
          </div>
        </div>
        {/* <hr class="solid" style={{borderTop: "1px solid black", maxWidth:"100%"}}></hr> */}
        <div className="comments">
          <input
            type="text"
            value={comment}
            className="postComment"
            placeholder="Add a comment.."
            onChange={(ev) => setComment(ev.target.value)}
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
      {/* {JSON.stringify(allComments)} */}
    </div>
  );
}
