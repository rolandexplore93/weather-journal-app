// Setup an empty JS object to act as endpoint for all routes
projectData = {
  name: "vikky"
};

// Express to run server and routes
const express = require("express");

// Start up an instance app
const app = express();

// Dependencies
//Configure express to use body-parser as middleware
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure express to use cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("weather-journal-app"));

// server setup
const port = 3000;
const server = app.listen(port, function listener() {
  console.log("Server is working at port: " + port);
});

//GET route to return projectData
app.get("/abt", (req, res) => {
  res.send(projectData)
})