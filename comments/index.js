const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.use(cors());
const commentsByPostId = {};

app.get("/posts/:id/comments", (req, resp) => {
  resp.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, resp) => {
  const commentId = randomBytes(8).toString("hex");
  const { message } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, message: message });

  commentsByPostId[postId] = comments;

  await axios.post("http://event-bus-service:4005/events", {
    type: "CommentCreated",
    data: { postId, id: commentId, message, status: "pending" },
  });

  resp.status(201).send(commentsByPostId);
});

app.post("/events", (req, resp) => {
  console.log("got some event in comments service");
  const event = req.body;
  if (event.type == "CommentModerated") {
    axios.post("http://event-bus-service:4005/events", {
      type: "CommentUpdated",
      data: {
        postId: event.data.postId,
        id: event.data.id,
        message: event.data.message,
        status: event.data.status,
      },
    });
  }

  console.log(event.type);
  resp.send({});
});

app.listen(4001, () => {
  console.log("running on server 4001");
});
