const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const cors = require("cors");
const app = express();
app.use(bodyParser.json());

app.use(cors());
const events = [];

app.post("/events", (req, res) => {
  const event = req.body;
  console.log("received some event");
  console.log(event);
  events.push(event);
  axios.post("http://posts-clip-service:4000/events", event);
  axios.post("http://comments-clip-service:4001/events", event);
  axios.post("http://moderation-clip-service:4003/events", event);
  axios.post("http://query-clip-service:4004/events", event);
  res.send({ status: "OK" });
});

app.get("/allEvents", (req, res) => {
  res.send(events);
});

app.get("/afterEvent", (req, res) => {
  const lastEvent = req.body;

  const index = events.findIndex((event) => event.id === lastEvent.id);

  const pushEvents = events.slice(index);
  res.send(pushEvents);
});

app.listen(4005, () => {
  console.log("listening on port number 4005");
});
