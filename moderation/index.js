const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());

app.post("/events", (req, resp) => {
  console.log("here are all posts");
  console.log("got event");
  const event = req.body;
  console.log(event);
  if (event.type == "CommentCreated") {
    const message = event.data.message;
    if (message.includes("danger")) {
      event.data.status = "rejected";
    } else {
      event.data.status = "moderated";
    }

    event.type = "CommentModerated";
    console.log(event);
    axios.post("http://event-bus-service:4005/events", event);

    res.send({ status: "OK" });
  }
});

app.listen(4003, () => {
  console.log("listening on port 4003");
});
