const apiKey = '&appid=3c67eb2a486191e0bf6c7872930b3799';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
// const userLocation = document.getElementById('zipcode').value;
const date = new Date();
const day = new Date().getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[day];
const month = new Date().getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonth = months[month];
const currentDate = new Date().getDate();
const currentYear = new Date().getFullYear();
const timeHours = new Date().getHours();
const timeMins = new Date().getMinutes();
const timeSecs = new Date().getSeconds();
const timePeriod = (timeHours >= 0 && timeHours <= 11) ? 'AM' : 'PM';
const timeNow = `${timeHours}:${timeMins}:${timeSecs} ${timePeriod}`
const dateNow = `${currentMonth} ${currentDate}, ${currentYear}`
console.log(date)
console.log(timeNow)
console.log(dateNow)

// const baseURL = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=3c67eb2a486191e0bf6c7872930b3799

// const generateWeatherData
document.getElementById('generate').addEventListener('click', performWeatherAction);


    function performWeatherAction(){
        const userLocation = document.getElementById('location').value;
        const userContent = document.getElementById('feelings').value;
        console.log(userContent)


    getLocationWeather(baseURL, userLocation, apiKey).then(function(data){
        console.log(data);
    
    postLocationWeather('/abt', {temperature: data.main.temp, place: data.name, country: data.sys.country, date: dateNow, userResponse: userContent, time: timeNow});

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
// getLocationWeather(baseURL, location, apiKey)

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

// postLocationWeather('/abt', {answer: 4})

//GET request to the server to get stored data
const retrieveWeatherData = async () => {
    const res = await fetch('/abt');

    try {
        const newData = await res.json();
        console.log(newData);
        const entryHolder = document.getElementById('entryHolder').innerHTML;
        console.log(entryHolder)
        for (let i = 0; i < newData.length; i++){
            document.getElementById('loc').innerHTML = newData[i].location;
            document.getElementById('date').innerHTML = newData[i].date;
            document.getElementById('temp').innerHTML = newData[i].temperature;
            // Math.round(allData.temp)+ 'degrees'
            document.getElementById('content').innerHTML = newData[i].userResponse;
            document.getElementById('time').innerHTML = newData[i].time;
            // entryHolder += newData[i]
        }
        return newData
    } catch (error) {
        console.log('error: location is valid', error)
    }
}