import React from "react";
import { Link } from "react-router-dom";
import Truncate from "react-truncate";

export default function Post({ post }) {
  return (
    <div className="search-results">
      {post.photo && (
        <img
          className="card__img"
          src={`/images/${post.photo}`}
          alt=""
          key={post.id}
        />
      )}
      <div className="postInfo" key={post.name}>
        <div className="postCats">
          {post.categories.map((c, index) => (
            <span className="postCat" key={"mykey" + index}>
              {c.name}
            </span>
          ))}
        </div>
        <Link to={`post/${post._id}`} className="cat-link" key={post.title}>
          <span className="postTitle" key={post.title}>
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="postDate" key={post.createdAt}>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <div className="desc-container">
        <Truncate
          lines={2}
          ellipsis={
            <span className="postDesc" key={post.desc}>
              <Link
                to={`post/${post._id}`}
                className="cat-link truncate-arrow"
                key={post.title}
              >
                See more...<i className="fas fa-arrow-right truncate-arrow"></i>
              </Link>
            </span>
          }
        >
          {post.body}
        </Truncate>
      </div>
    </div>
  );
}
