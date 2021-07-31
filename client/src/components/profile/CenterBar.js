import React, { useState, useContext, useEffect } from "react";
import "../../style/CenterBar.css";
import Post from "./Post";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { PostContext } from "../../context/PostContext";
import axios from "../../utils/axios";
import { UserContext } from "../../context/UserContext";
import { useSnackbar } from "notistack";
import Emoji from "../Emoji";
export default function CenterBar() {
  const { postState, postDispatch } = useContext(PostContext);
  const { userState, userDispatch } = useContext(UserContext);
  const [emoji, setEmoji] = useState(false);
  const [post, setPost] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);

  const handleEmoji = (emoji) => {
    setPost((prev) => prev + emoji);
  };
  async function getPersonalPost() {
    try {
      const { data } = await axios.get("/api/post/personalPost");
      postDispatch({ type: "POSTS_LOADED", payload: data });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  const handlePost = async (ev) => {
    ev.preventDefault();
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
      const { data } = await axios.post(`/api/post`, {
        content: post,
        image: `http://localhost:5000/images/${fileName}`,
      });
      postDispatch({ type: "ADD_POST", payload: data });
      enqueueSnackbar("Posted Successfully", { variant: "success" });
      setPost("");
      getPersonalPost();
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
    getPersonalPost();
    return () => {
      postDispatch({ type: "POST_UNLOADED" });
      postDispatch({ type: "POSTS_UNLOADED" });
    };
  }, []);
  return (
    <div className="CenterBar">
      <div className="centerWrapper">
        <div className="sharePersonal" style={{ background: "white" }}>
          <div className="shareWrapper">
            <div className="shareTop">
              <img className="shareProfileImg" src={userState.user?.image} alt="" />
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
      </div>
    </div>
  );
}
