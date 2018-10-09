const https = require("https");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("WoW Raid Helper server listening on 3000");
  setInterval(() => {
    https.get("https://wow-raid-helper.herokuapp.com/");
    console.log("Stop Idling Heroku");
  }, 300000);
});
