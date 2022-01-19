const apiKey = '&appid=3c67eb2a486191e0bf6c7872930b3799&units=metric';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=`;

const locationEntry = document.getElementById('loc');
const commentInput = document.getElementById('content');

document.getElementById('generate').addEventListener('click', validateEntry);

    
function validateEntry(){
    const userLocationEntry = document.getElementById('location').value;
    const userContentEntry = document.getElementById('feelings').value;

    if (userLocationEntry == "" || userContentEntry == ""){
        alert("You need to add location name and how you feel about this place");
        console.log(false)
        return false
    }else{
        performWeatherAction()
        console.log(true)
        // return true
    }
}

function performWeatherAction(){
        const userLocation = document.getElementById('location').value;
        const userContent = document.getElementById('feelings').value;
        const locationEntryValue = userLocation;
        
        const callToAPI = baseURL + locationEntryValue + apiKey;




        // CHAINED Promises to getlocation data using GET
        // Add data to POST and send to app endpoint in the server
    getLocationWeather(callToAPI).then(function (data){
        console.log(data);

        postLocationWeather("/", {
            data: data,
            myCity: userLocation, 
            comment: userContent,
            currentTime: currentTime(),
            updatedDate: updatedDate()
    })

    retrieveWeatherData()

})


// perform api POST request to the server to get weather data
// postLocationWeather("/", {
//             myCity: userLocation, 
//             comment: userContent,
//             currentTime: currentTime(),
//             updatedDate: updatedDate()
//     }).then(function(data){
//             console.log(data)

//         retrieveWeatherData()
//     });
}

function currentTime(){
    const timeHours = new Date().getHours();
    const timeMins = new Date().getMinutes();
    const timeSecs = new Date().getSeconds();
    const timePeriod = (timeHours >= 0 && timeHours <= 11) ? 'AM' : 'PM';
    
    const timeNow = `${timeHours}:${timeMins}:${timeSecs} ${timePeriod}`
    return timeNow
}

function updatedDate(){
    const d = new Date();
    const day = d.getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = days[day];
    const month = d.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[month];
    const currentDate = d.getDate();
    const currentYear = d.getFullYear();

    const dateNow = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`
    return dateNow
}


//GET request to OpenWeatherAPI to get location weather data
const getLocationWeather = async (callAPI) => {
    // const userLocation = document.getElementById('location').value;
    // const locationEntryValue = locationEntry.value
    // console.log(locationEntryValue)

    const res = await fetch(callAPI);
    // console.log(res)

    try {
        const newData = await res.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log('error', error)
    }
}
// getLocationWeather(callToAPI)

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
        const newWeatherData = await response.json();
        console.log(newWeatherData);
        return newWeatherData
    } catch (error) {
        console.log('error detected', error)
    }
}


// //GET request to the server to get stored data
const retrieveWeatherData = async () => {
    const res = await fetch('/weatherData');
    console.log(res)

    try {
        const newData = await res.json();
        // console.log(newData);
        // Dynamically update the UI with the data received from the server
            locationEntry.innerHTML = newData.data.name + ', ' + newData.data.sys.country;
            document.getElementById('date').innerHTML = newData.updatedDate;
            locationEntry.setAttribute('style', 'background: #3b4a6b; color: white;')
            document.getElementById('temp').innerHTML = 'Temperature: ' + Math.round(newData.data.main.temp) + ' degrees';
            commentInput.innerHTML = newData.comment;
            commentInput.style.cssText = 'background-color: #FF8C00; color: #fff;';
            document.getElementById('time').innerHTML = newData.currentTime;
            document.getElementById('inputLoc').innerHTML = newData.data.name + ', ' + newData.data.sys.country;

            document.getElementById('weather-description').innerHTML = 'Weather Description: ' + newData.data.weather[0].description;
            document.getElementById('weather-main').innerHTML = 'Main: ' + newData.data.weather[0].main;
            document.getElementById('min-temp').innerHTML = 'Min. Temperature: ' + Math.round(newData.data.main.temp_min) + ' degrees';
            document.getElementById('max-temp').innerHTML = 'Max. Temperature: ' + Math.round(newData.data.main.temp_max) + ' degrees';
            document.getElementById('main-pressure').innerHTML = newData.data.main.pressure;
            document.getElementById('main-humidity').innerHTML = 'Humidity: ' + newData.data.main.humidity;
            document.getElementById('coord-lat').innerHTML = 'Latitude: ' + newData.data.coord.lat;
            document.getElementById('coord-lon').innerHTML = 'Longitude: ' + newData.data.coord.lon;
            document.getElementById('wind-deg').innerHTML = 'Wind Degree: ' + newData.data.wind.deg;
            document.getElementById('wind-speed').innerHTML = 'Wind Speed: ' + newData.data.wind.speed;
        
        return newData
    } catch (error) {
        console.log('error', error)
    }
}

// retrieveWeatherData()
