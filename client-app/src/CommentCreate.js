import React, { useState } from "react";

import axios from "axios";

export default ({ postID }) => {
  const [comment, SetComment] = useState("");

  const poseComment = async (event) => {
    event.preventDefault();
    await axios.post(
      "http://comments.dev.microservices.gaurav.sh/posts/" +
        postID +
        "/comments",
      {
        message: comment,
      }
    );
    SetComment("");
  };
  return (
    <div>
      <form onSubmit={poseComment}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            value={comment}
            onChange={(e) => SetComment(e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
