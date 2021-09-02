import React from "react";
import AppBar from "./AppBar";
import "../style/LandingPage.css";
import "../style/LineIcons.css";
import "../style/main.css";
import "../style/responsive.css";
import { Link } from "react-router-dom";
export default function LandingPage() {
  return (
    <div>
      <AppBar />
      <h1 className="introText">Share your Content with Everyone</h1>
      <h6 className="intro">An Application to post your thoughts and memories</h6>
      <div className="appButton">
        <Link to="/signup">
        <button className="button">
          <span>Get Started</span>
        </button>
        </Link>
      </div>
      <p className="login">
        Already have a Account? <Link to="/login"><span className="loginLink">Login</span></Link>
      </p>
      <section id="services" className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-xs-12">
              <div className="services-item text-center">
                <div className="icon">
                  <i className="lni-cog"></i>
                </div>
                <h4>Sharing post</h4>
                <p>
                  Share your Content by creating a post which can have image and
                  also emoji attached to it
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xs-12">
              <div className="services-item text-center">
                <div className="icon">
                  <i className="lni-brush"></i>
                </div>
                <h4>Follow and Unfollow</h4>
                <p>
                  Follow or unfollow a particular user and also see the
                  post of the person who he/she follows
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-xs-12">
              <div className="services-item text-center">
                <div className="icon">
                  <i className="lni-heart"></i>
                </div>
                <h4>Like and Comment</h4>
                <p>
                  Like and Comment to a post and also see all the
                  likes and comments of that particular post
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
