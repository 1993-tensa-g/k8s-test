import React from "react";

export default ({ comments }) => {
  //console.log(comments);
  const renderedComments = Object.values(comments).map((comment) => {
    console.log(comment);
    return (
      <li
        style={{
          color:
            comment.status === "pending"
              ? "yellow"
              : comment.status === "moderated"
              ? "green"
              : "red",
        }}
      >
        {comment.message}
      </li>
    );
  });

  return (
    <div className="entry-content">
      <ul>{renderedComments}</ul>
    </div>
  );
};
