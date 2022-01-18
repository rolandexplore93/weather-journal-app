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

        // perform api POST request to the server to get weather data
        postLocationWeather("/", {
            myCity: userLocation, 
            comment: userContent,
            currentTime: currentTime(),
            updatedDate: updatedDate()
    }).then(function(data){
            console.log(data)

        retrieveWeatherData()
    });
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


// //GET request to OpenWeatherAPI to get location weather data
// const getLocationWeather = async (baseURL, loc, key) => {
//     const res = await fetch(baseURL+loc+key);
//     console.log(res)

//     try {
//         const newData = await res.json();
//         console.log(newData);
//         return newData
//     } catch (error) {
//         console.log('error', error)
//     }
// }

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
        console.log(newData);
        for (let i = 0; i < newData.length; i++){
            locationEntry.innerHTML = newData[i].name + ', ' + newData[i].sys.country;
            document.getElementById('date').innerHTML = newData[i].clientside.updatedDate;
            locationEntry.setAttribute('style', 'background: #3b4a6b; color: white;')
            document.getElementById('temp').innerHTML = 'Temperature: ' + newData[i].main.temp + ' degrees';
            commentInput.innerHTML = newData[i].clientside.userComment;
            commentInput.style.cssText = 'background-color: #FF8C00; color: #fff;';
            document.getElementById('time').innerHTML = newData[i].clientside.currentTime;
            document.getElementById('inputLoc').innerHTML = newData[i].name + ', ' + newData[i].sys.country;

            document.getElementById('weather-description').innerHTML = 'Weather Description: ' + newData[i].weather[0].description;
            document.getElementById('weather-main').innerHTML = 'Main: ' + newData[i].weather[0].main;
            document.getElementById('min-temp').innerHTML = 'Min. Temperature: ' + newData[i].main.temp_min + ' degrees';
            document.getElementById('max-temp').innerHTML = 'Max. Temperature: ' + newData[i].main.temp_max + ' degrees';
            document.getElementById('main-pressure').innerHTML = newData[i].main.pressure;
            document.getElementById('main-humidity').innerHTML = 'Humidity: ' + newData[i].main.humidity;
            document.getElementById('coord-lat').innerHTML = 'Latitude: ' + newData[i].coord.lat;
            document.getElementById('coord-lon').innerHTML = 'Longitude: ' + newData[i].coord.lon;
            
            document.getElementById('wind-deg').innerHTML = 'Wind Degree: ' + newData[i].wind.deg;
            document.getElementById('wind-speed').innerHTML = 'Wind Speed: ' + newData[i].wind.speed;
        }
        return newData
    } catch (error) {
        console.log('error', error)
    }
}
