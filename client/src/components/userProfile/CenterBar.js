import React, { useState, useContext, useEffect } from 'react';
import "../../style/CenterBar.css";
import UserPosts from './Post';
// import PersonImg from "../../images/person1.jpg";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { PostContext } from "../../context/PostContext";
import axios from "../../utils/axios";
import { useSnackbar } from "notistack";
import { useParams } from 'react-router';
export default function CenterBar() {
    const params = useParams();
    const { postState, postDispatch } = useContext(PostContext);
    const [allPost, setAllPost] = useState(0);
    // const [emoji, setEmoji] = useState(false);
    // const [post, setPost] = useState();
    // const { enqueueSnackbar } = useSnackbar();

    // const handleEmoji =(emoji)=>{
    //     setPost((prev)=>prev+emoji);
    // }
    async function getUserPost() {
        try {
            const userId = params.userId;
            const { data } = await axios.get(`/api/post/user/${userId}`);
            postDispatch({ type: "POSTS_LOADED", payload: data });
            console.log(data);
            console.log(postState.posts);
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
    // const handlePost = async (ev) => {
    //     ev.preventDefault();
    //     try {
    //         if (post === "") {
    //             return enqueueSnackbar("Empty Post", { variant: "error" });
    //         }
    //         const { data } = await axios.post(`/api/post`, { content: post });
    //         postDispatch({ type: "ADD_POST", payload: data });
    //         enqueueSnackbar("Posted Successfully", { variant: "success" });
    //         getAllPost()
    //     } catch (err) {
    //         // postDispatch({ type: "USER_ERROR", payload: err.response.data.error });
    //         //   enqueueSnackbar("error", { variant: "error" });
    //         console.log(err);
    //     }
    // };
    useEffect(() => {
        getUserPost();
        return () => {
            postDispatch({ type: "POSTS_UNLOADED" });
          };
    }, []);
    return (
        <div className="CenterBar">
            <div className="centerWrapper">
                {postState.posts.slice(0).map((post) => {
                    return (
                        <UserPosts post={post} key={post._id} />
                    );
                })}
            </div>
        </div>
    )
}

