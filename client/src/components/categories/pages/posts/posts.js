import React from "react";
import Post from "./post";

export default function Posts({ posts }) {
  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        prefill: true,
      }}
      className="posts scrollbar connect-background"
      key={posts}
    >
      {posts.map((p, index) => (
        <Post post={p} key={"mykey" + index} />
      ))}
    </div>
  );
}
