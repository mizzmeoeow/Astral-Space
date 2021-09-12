import React, { useState } from "react";
import Post from "./post";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Posts({ posts }) {
  const [items, setItems] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    setItems(items.concat(Array.from({ length: 10 })));
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 850,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        prefill: true,
      }}
      className="posts scrollbar connect-background"
      key={posts}
    >
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((p, index) => (
          <Post post={p} key={"mykey" + index} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
