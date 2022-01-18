# weather-journal-app

## Link to project
https://roland2rule-weather-app.herokuapp.com/

## Project Description
This is an asynchronous web application built to read the weather information of user's location (city). They can enter their city in the location box and write comment(s) about their city in the comment box, and then click on the generate button to get the necessary weather information about their city populated dynamically on the web page.


## Technologies used
Asynchronous Javascript: This allows me to use async with HTTP request methods (GET and POST) to send user data input from the UI to the my backend. Using async gives me access to await, try and catch methods.

Axios: I used axios to get data from Openweather website API through my server.js file. With this, users do not have access to my API key from the client side.

Chained Promises: Data from the server was connected with GET request to enable the dynamic updates of user's request on the browser interface.

## Project running & installation
node

Node dependencies installed:

express: npm install express

cors: npm install cors

bodyParser: npm install body-parser

axios: npm install axios

// Express to run server and routes
const express = require("express");

const path = require("path");

const axios = require("axios");
