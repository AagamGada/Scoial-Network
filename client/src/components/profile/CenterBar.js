import React, { useState, useContext, useEffect } from 'react';
import "../../style/CenterBar.css";
import Post from './Post';
import PersonImg from "../../images/person1.jpg";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { PostContext } from "../../context/PostContext";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";
import Emoji from '../Emoji';
export default function CenterBar() {
    const { postState, postDispatch } = useContext(PostContext);
    const [allPost, setAllPost] = useState(0);
    const [emoji, setEmoji] = useState(false);
    const [post, setPost] = useState();
    const { enqueueSnackbar } = useSnackbar();

    const handleEmoji =(emoji)=>{
        setPost((prev)=>prev+emoji);
    }
    async function getPersonalPost() {
        try {
            const { data } = await axios.get("/api/post/personalPost");
            postDispatch({ type: "POSTS_LOADED", payload: data });
            console.log(data);
            setAllPost(data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            }))
        }
        catch (err) {
            console.log(err);
        }
    }
    // const handleChange=(ev)=>{
    //     setPost((prev)=>({
    //         ...prev,[ev.target.name]:ev.target.value,
    //     }));
    // }
    const handlePost = async (ev) => {
        ev.preventDefault();
        try {
            if (post === "") {
                return enqueueSnackbar("Empty Post", { variant: "error" });
            }
            const { data } = await axios.post(`/api/post`, { content: post });
            postDispatch({ type: "ADD_POST", payload: data });
            enqueueSnackbar("Posted Successfully", { variant: "success" });
            getPersonalPost()
        } catch (err) {
            // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
            //   enqueueSnackbar("error", { variant: "error" });
            console.log(err);
        }
    };
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
                <div className="share" style={{ background: "white" }}>
                    <div className="shareWrapper">
                        <div className="shareTop">
                            <img className="shareProfileImg" src={PersonImg} alt="" />
                            <input type="text" className="shareInput" placeholder="What is in your mind" onChange={(ev) => setPost(ev.target.value)} value={post}>
                            </input>
                        </div>
                        <hr className="hr" />
                        <div className="shareBottom">
                            <div className="option">
                                <div className="options">
                                    <PermMedia htmlColor="tomato" className="icon" />
                                    {/* <span className="optionText">Photo or Video</span> */}
                                </div>
                                {/* <div className="options">
                                    <Label htmlColor="blue" className="icon" />
                                    <span className="optionText">Tag</span>
                                </div>
                                <div className="options">
                                    <Room htmlColor="green" className="icon" />
                                    <span className="optionText">Loaction</span>
                                </div> */}
                                <div className="options">
                                    <EmojiEmotions htmlColor="goldenrod" className="icon" onClick={() => { setEmoji(true) }} />
                                    {/* <span className="optionText">Feelings</span> */}
                                </div>
                            </div>
                            
                            <button className="postButton" onClick={handlePost} style={{ fontWeight: "bold" }}>Post</button>
                        </div>
                    </div>
                </div>
                {emoji && <Emoji handleEmoji={handleEmoji} />}
                {postState.posts.slice(0).map((post) => {
                    return (
                        <Post post={post} key={post._id} />
                    );
                })}
            </div>
        </div>
    )
}