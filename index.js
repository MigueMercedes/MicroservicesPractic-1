// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;
  let unix = Date.parse(date);
  let utc = new Date(date).toUTCString();

  if (isNaN(unix)) {
    unix = date;
  }

  if (utc === "Invalid Date") {
    utc = new Date(parseInt(date)).toUTCString();
  }

  if (utc === "Invalid Date" || unix === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }

  res.json({ unix, utc });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
