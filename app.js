const express = require('express');
const logger = require("morgan");
const cors = require("cors");
const dbInit = require("./config/db");
const helmet = require("helmet");
const path = require("path")
require("dotenv").config();

const app = express();
const PORT = 5000;
const NODE_ENV = "PRODUCTION";

app.use("/images",express.static(path.join(__dirname,"public","images")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if (NODE_ENV === "DEV") {
    app.use(logger("dev"));
  }
app.use(helmet({ contentSecurityPolicy: false }));

dbInit();

app.use("/Social-Hunt",express.static("build"));
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use("/Social-Hunt/api/user", userRoutes);
app.use("/Social-Hunt/api/post", postRoutes);
app.use("/Social-Hunt/api/comment", commentRoutes);

app.listen(PORT, ()=>{console.log(`listening to PORT ${PORT}`)});
