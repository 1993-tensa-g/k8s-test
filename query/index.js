const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

var isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

const handleEvent = (event) => {
  console.log(event);
  if (event.type == "CommentCreated") {
    post = posts[event.data.postId];
    post.comments.push({
      id: event.data.id,
      message: event.data.message,
      status: event.data.status,
    });
  } else if (event.type == "PostCreated") {
    posts[event.data.id] = {
      id: event.data.id,
      title: event.data.title,
      comments: [],
    };
  } else if (event.type == "CommentUpdated") {
    post = posts[event.data.postId];
    post.comments.forEach(function (comment) {
      if (comment.id == event.data.id) {
        comment.status = event.data.status;
      }
    });
  }
};
app.post("/events", (req, resp) => {
  console.log("got event");
  const event = req.body;
  handleEvent(event);
  resp.send({});
});

app.get("/posts", (req, resp) => {
  console.log("here are all posts");
  resp.send(posts);
});

app.listen(4004, async () => {
  console.log("listening on port 4004");
  if (isEmpty(posts)) {
    const response = await axios.get(
      "http://event-bus-service:4005/allEvents",
      {}
    );
    console.log(response);
    response.data.forEach(function (event) {
      handleEvent(event);
    });
  }
});
