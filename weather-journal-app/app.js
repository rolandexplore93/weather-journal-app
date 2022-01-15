const apiKey = '&appid=3c67eb2a486191e0bf6c7872930b3799';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const date = new Date();
const day = new Date().getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[day];
const month = new Date().getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = months[month];
const currentDate = new Date().getDate();
const currentYear = new Date().getFullYear();
// let timeHours = new Date().getHours();
// let timeMins = new Date().getMinutes();
// let timeSecs = new Date().getSeconds();
// let timePeriod = (timeHours >= 0 && timeHours <= 11) ? 'AM' : 'PM';
// let timeNow = `${timeHours}:${timeMins}:${timeSecs} ${timePeriod}`
const dateNow = `${currentMonth} ${currentDate}, ${currentYear}`

// const baseURL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'

// const generateWeatherData

function currentTime(){
    let timeHours = new Date().getHours();
    let timeMins = new Date().getMinutes();
    let timeSecs = new Date().getSeconds();
    let timePeriod = (timeHours >= 0 && timeHours <= 11) ? 'AM' : 'PM';
    let timeNow = `${timeHours}:${timeMins}:${timeSecs} ${timePeriod}`

    return timeNow
}

document.getElementById('generate').addEventListener('click', performWeatherAction);


    function performWeatherAction(){
        const userLocation = document.getElementById('location').value;
        const userContent = document.getElementById('feelings').value;
        console.log(userContent)


    getLocationWeather(baseURL, userLocation, apiKey).then(function(data){
        console.log(data);
    
    postLocationWeather('/weatherData', {
        temperature: data.main.temp, 
        place: data.name, 
        country: data.sys.country, 
        date: dateNow, 
        userResponse: userContent, 
        // time: timeNow,
        time: currentTime(),
        locationTitle: data.name,
        weatherDescription: data.weather[0].description,
        weatherMain: data.weather[0].main,
        coordLat: data.coord.lat,
        coordLon: data.coord.lon,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max,
        windDeg: data.wind.deg,
        windSpeed: data.wind.speed,
    });
        retrieveWeatherData()
    })
}

//GET request to OpenWeatherAPI to get location weather data
const getLocationWeather = async (baseURL, loc, key) => {
    const res = await fetch(baseURL+loc+key);
    console.log(res)

    try {
        const newData = await res.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log('error: location is valid', error)
    }
}

const postLocationWeather = async (url = '', data = {}) => {
    console.log(data);

    const response = await fetch (url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)  //body data type must be the same as Content-Type
    });
    try {
        const newWeatherData = await res.json();
        console.log(newWeatherData);
        return newWeatherData
    } catch (error) {
        console.log('error detected', error)
    }
}

//GET request to the server to get stored data
const retrieveWeatherData = async () => {
    const res = await fetch('/weatherData');

    try {
        const newData = await res.json();
        console.log(newData);
        for (let i = 0; i < newData.length; i++){
            document.getElementById('loc').innerHTML = newData[i].location;
            document.getElementById('date').innerHTML = newData[i].date;
            document.getElementById('temp').innerHTML = newData[i].temperature;
            document.getElementById('content').innerHTML = newData[i].userResponse;
            document.getElementById('time').innerHTML = newData[i].time;
            document.getElementById('inputLoc').innerHTML = newData[i].locationTitle;

            document.getElementById('weather-description').innerHTML = newData[i].weatherDescription;
            document.getElementById('weather-main').innerHTML = newData[i].weatherMain;
            document.getElementById('min-temp').innerHTML = newData[i].minTemp;
            document.getElementById('max-temp').innerHTML = newData[i].maxTemp;
            document.getElementById('main-pressure').innerHTML = newData[i].pressure;
            document.getElementById('main-humidity').innerHTML = newData[i].humidity;
            document.getElementById('coord-lat').innerHTML = newData[i].coordLat;
            document.getElementById('coord-lon').innerHTML = newData[i].coordLon;
            
            document.getElementById('wind-deg').innerHTML = newData[i].windDeg;
            document.getElementById('wind-speed').innerHTML = newData[i].windSpeed;
        }
        return newData
    } catch (error) {
        console.log('error: location is valid', error)
    }
}