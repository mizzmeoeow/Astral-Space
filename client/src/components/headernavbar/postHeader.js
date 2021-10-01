import React, { Component } from "react";

class PostHeader extends Component {
  render() {
    return (
      <div className="category-header">
        <p className="connect-header edit-post">View or edit a Post</p>
        <div className="navbar post-navbar">
          <a href="/dashboard" className="nav-connect cat-nav post-nav ">
            Home Space
          </a>
          <a href="/connect" className="nav-connect cat-nav post-nav">
            Connect
          </a>
        </div>
        <br />
      </div>
    );
  }
}

export default PostHeader;
