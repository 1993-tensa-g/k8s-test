const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get("/posts", (req, resp) => {
  resp.send(posts);
});

app.post("/posts", async (req, resp) => {
  const id = randomBytes(8).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://event-bus-service:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });
  resp.status(201).send(posts[id]);
});

app.post("/events", (req, resp) => {
  console.log("got some event in post service");
  const event = req.body;
  console.log(event.type);
  resp.send({});
});

app.listen(4000, () => {
  console.log("v21");
  console.log("running on server 4000");
});
