import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PostProvider } from "./context/PostContext";
import Profile from "./components/profile/Profile"
import SinglePost from "./components/SinglePost"
import UserProfile from './components/userProfile/UserProfile';
import NewPassword from './components/NewPassword';
import "./App.css"
import ForgotPassword from './components/ForgotPassword';
export default function App() {
  return (
    <Router>
      <UserProvider>
        <PostProvider>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/forgotPassword" component={ForgotPassword}></Route>
            <Route exact path="/newPassword/:email" component={NewPassword}></Route>
            <Route exact path="/profile" component={Profile}></Route>
            <Route exact path="/post/:postId" component={SinglePost}></Route>
            <Route exact path="/userProfile/:userId" component={UserProfile}></Route>
            <Route exact path="/home" component={Home}></Route>
          </Switch>  
        </PostProvider>
      </UserProvider>
    </Router>
  );
}