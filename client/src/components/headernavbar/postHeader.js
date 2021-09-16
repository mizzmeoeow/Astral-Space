import React, { Component } from "react";

class PostHeader extends Component {
  render() {
    return (
      <div className="category-header">
        <p className="connect-header">Interact with Posts</p>
        <div className="navbar">
          <a href="/dashboard" className="nav-connect cat-nav">
            Home Space
          </a>
          <a href="/connect" className="nav-connect cat-nav">
            Connect
          </a>
        </div>
        <br />
      </div>
    );
  }
}

export default PostHeader;
