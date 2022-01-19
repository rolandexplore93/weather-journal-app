// Setup an empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require("express");
const path = require("path");
const axios = require("axios");
// const fs = require("fs")

// Start up an instance app
const app = express();

// Dependencies
//Configure express to use body-parser as middleware
const bodyParser = require("body-parser");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// configure express to use cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder using path.resolve()
// app.use(express.static("weather-journal-app"));
// app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "website")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server setup
const port = process.env.PORT || 3000;
const server = app.listen(port, function listener() {
  console.log("Server is working at port: " + port);
});

app.get("/weatherData", (req, res) => {
  res.send(projectData);
})


app.post("/", async (req, res) => {
  console.log(typeof req.body)

  projectData = req.body;
  console.log(projectData);
  res.send(projectData)
})

























// ALTERNATIVE METHOD USING AXIOS
// API CALL FROM BACKEND

// app.post("/", async (req, res) => {
//   console.log(req.body)
//   // const myCity = req.body.myCity;

//   // const myData = {
//   //   userComment: req.body.comment,
//   //   currentTime: req.body.currentTime,
//   //   updatedDate: req.body.updatedDate
//   // }

//   //  Personal API Key for OpenWeatherMap API
//   // const apiKey = '3c67eb2a486191e0bf6c7872930b3799&units=metric';
//   // const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${myCity}&appid=${apiKey}`;

//   // try {
//   //   const response = await axios.get(baseURL);
//   //   const allResponse = response.data;
//   //   allResponse.clientside = myData;
//   //   projectData = allResponse;
//   //   console.log(projectData);
//   //   res.json(response.data);

//   // } catch (error){
//   //   console.log("error", error)
//   // }

//   // axios.get(baseURL).then(resp => {
//   //   console.log(resp.data)
//   //   projectData.push(resp.data)
//   //   console.log(projectData)
//   // })
// })


//GET route to return projectData
// app.get("/weatherData", (req, res) => {
  // res.send(projectData)
// });

// app.post('/weatherData', (req, res) => {

//   const newEntry = {
//     temperature: 'Temperature: ' + req.body.temperature + ' degrees',
//     location: req.body.place + ', ' + req.body.country,
//     date: req.body.date,
//     userResponse: req.body.userResponse,
//     time: req.body.time,
//     locationTitle: req.body.locationTitle  + ', ' + req.body.country,
//     weatherDescription: 'Weather Description: ' + req.body.weatherDescription,
//     weatherMain: 'Main: ' + req.body.weatherMain,
//     coordLat: 'Latitude: ' + req.body.coordLat,
//     coordLon: 'Longitude: ' + req.body.coordLon,
//     pressure: req.body.pressure,
//     humidity: 'Humidity: ' + req.body.humidity,
//     minTemp: 'Minimum Temperature: ' + req.body.minTemp,
//     maxTemp: 'Maximum Temperature: ' + req.body.maxTemp,
//     windDeg: 'Wind Degree: ' + req.body.windDeg,
//     windSpeed: 'Wind Speed: ' + req.body.windSpeed
//   }

//   projectData.push(newEntry);
//   console.log(projectData);
// })
