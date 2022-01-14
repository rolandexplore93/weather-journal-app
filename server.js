// Setup an empty JS object to act as endpoint for all routes
projectData = [];

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
app.get("/weatherData", (req, res) => {
  res.send(projectData)
});

app.post('/weatherData', (req, res) => {

  const newEntry = {
    temperature: 'Temperature: ' + req.body.temperature + ' degrees',
    location: req.body.place + ', ' + req.body.country,
    date: req.body.date,
    userResponse: req.body.userResponse,
    time: req.body.time,
    locationTitle: req.body.locationTitle  + ', ' + req.body.country,
    weatherDescription: 'Weather Description: ' + req.body.weatherDescription,
    weatherMain: 'Main: ' + req.body.weatherMain,
    coordLat: 'Latitude: ' + req.body.coordLat,
    coordLon: 'Longitude: ' + req.body.coordLon,
    pressure: req.body.pressure,
    humidity: 'Humidity: ' + req.body.humidity,
    minTemp: 'Minimum Temperature: ' + req.body.minTemp,
    maxTemp: 'Maximum Temperature: ' + req.body.maxTemp,
    windDeg: 'Wind Degree: ' + req.body.windDeg,
    windSpeed: 'Wind Speed: ' + req.body.windSpeed
  }

  projectData.push(newEntry);
  console.log(projectData);
})
