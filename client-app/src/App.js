import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default () => {
  return (
    <div className="container">
      <h1>Create Posts</h1>
      <PostCreate />
      <hr></hr>
      <h1>Previous Posts</h1>
      <PostList />
    </div>
  );
};
