import React from "react";
import { makeStyles } from "@material-ui/core";
import '../style/Comments.css'
// const useStyles = makeStyles((theme) => ({
//   reviewCard: {
//     padding: theme.spacing(2),
//     border: "1px solid #ccc",
//     "& > p": {
//     //   paddingTop: theme.spacing(2),
//     },
//     marginTop: theme.spacing(1),
//     marginLeft: "20%",
//     marginRight: "20%"
//   },
// }));

export default function Comments(props) {
//   const classes = useStyles();
  let month = new Date(props.comment.createdAt).toLocaleString("default", {
    month: "short",
  });
  let day = new Date(props.comment.createdAt).getDate();
  return (
    <div className="reviewCard" >
      <h5>{props.comment.user.name}</h5>
      <p style={{marginTop:"0", marginBottom:"0" }} className="comment">Comment: {props.comment.comment}</p>
      <p style={{ marginBottom:"0"}}>{`${month} ${day}`}</p>
    </div>
  );
}