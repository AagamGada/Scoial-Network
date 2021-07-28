const express = require('express');
const logger = require("morgan");
const cors = require("cors");
const dbInit = require("./config/db");
const helmet = require("helmet");
const path = require("path")
require("dotenv").config();
// const multer=require("multer");

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "DEV";

app.use("/images",express.static(path.join(__dirname,"public","images")));
// const storage=multer.diskStorage({
//   destination:(req,file,callBack)=>{
//     callBack(null,"public/images");
//   },
//   filename:(req,file,callBack)=>{
//     callBack(null,req.body.name);
//   },
// });
// const upload=multer({storage});

// app.use("/images",express.static(path.join(__dirname,"public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (NODE_ENV === "DEV") {
    app.use(logger("dev"));
  }
app.use(helmet({ contentSecurityPolicy: false }));

dbInit();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, ()=>{console.log(`listening to PORT ${PORT}`)});

// app.post("/api/upload",upload.single("file"),(req,res)=>{
//   try{
//     return res.status(200).json("File uploaded successfully.")
//   }
//   catch(err){
//     console.log(err);
//   }
// })