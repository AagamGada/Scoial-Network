import React, { useState, useContext, useEffect } from "react";
import "../style/CenterBar.css";
import Post from "./Post";
import PersonImg from "../images/person1.jpg";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { PostContext } from "../context/PostContext";
import axios from "../utils/axios";
import { useSnackbar } from "notistack";
import Emoji from "./Emoji";
export default function CenterBar() {
  const { postState, postDispatch } = useContext(PostContext);
  const [allPost, setAllPost] = useState(0);
  const [emoji, setEmoji] = useState(false);
  const [post, setPost] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const handleEmoji = (emoji) => {
    setPost((prev) => prev + emoji);
  };
  console.log(post);
  async function getAllPost() {
    try {
      const { data } = await axios.get("/api/post");
      postDispatch({ type: "POSTS_LOADED", payload: data });
      console.log(data);
      // setAllPost(
      //   data.sort((a, b) => {
      //     return new Date(b.createdAt) - new Date(a.createdAt);
      //   })
      // );
    } catch (err) {
      console.log(err);
    }
  }
  const handlePost = async (ev) => {
    ev.preventDefault();
    if (file) {
      const fileData = new FormData();
      var fileName = file.name;
      console.log(fileName);
      fileData.append("profile", file);
      fileData.append("name", fileName);
      try {
        await axios.post("/api/user/upload", fileData);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      if (post === "") {
        return enqueueSnackbar("Empty Post", { variant: "error" });
      }
      console.log(fileName);
      const { data } = await axios.post(`/api/post`, {
        content: post,
        image: `http://localhost:5000/images/${fileName}`,
      });
      postDispatch({ type: "ADD_POST", payload: data });
      enqueueSnackbar("Posted Successfully", { variant: "success" });
      setPost("");
      getAllPost();
    } catch (err) {
      console.log(err);
    }
  };
  const openClose = () => {
    if(!emoji){
      setEmoji(true);
    }else{
      setEmoji(false);
    }
  }
  useEffect(() => {
    getAllPost();
    return () => {
      postDispatch({ type: "POST_UNLOADED" });
      postDispatch({ type: "POSTS_UNLOADED" });
    };
  }, []);

  return (
    <div className="CenterBar">
      <div className="centerWrapper">
        <div className="share" style={{ background: "white" }}>
          <div className="shareWrapper">
            <div className="shareTop">
              <img className="shareProfileImg" src={PersonImg} alt="" />
              <input
                type="text"
                className="shareInput"
                placeholder="What is in your mind"
                onChange={(ev) => setPost(ev.target.value)}
                value={post}
              ></input>
            </div>
            <hr className="hr" />
            <div className="shareBottom">
              <div className="option">
                <div className="options">
                  <label htmlFor="file" className="options">
                    <PermMedia htmlColor="tomato" className="icon" />
                    <input
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
                <div className="options">
                  <EmojiEmotions
                    htmlColor="goldenrod"
                    className="icon"
                    onClick={openClose}
                  />
                </div>
              </div>
              <button
                className="postButton"
                onClick={handlePost}
                style={{ fontWeight: "bold" }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        {emoji && <Emoji handleEmoji={handleEmoji} />}
        {postState.posts.slice(0).map((post) => {
          return <Post post={post} key={post._id} />;
        })}
        {console.log(postState)}
      </div>
    </div>
  );
}
