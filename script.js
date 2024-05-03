const APIKEY = "edf8f831eb3e5973bfeee0798b5e92c8";
let locationValue = '';
let lat = 0;
let long = 0;
const searchbtn = document.getElementById("search-btn");
const weatherDisplay = document.getElementById("weather-display")
const time = document.getElementById("time");
const city = document.getElementById("city");
const temperature = document.getElementById("temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");

function fillWeatherDetails(data){
    weatherDisplay.classList.add("show");
    const date  = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    city.textContent= data.name;
    temperature.textContent = `${(data.main.temp - 273).toFixed(1)}°C`;
    time.textContent = `Time : ${hour}:${min}`;
    wind.textContent = `Wind : ${(data.wind.speed * 3.6).toFixed(2)} km/h`;
    humidity.textContent = `Humidity : ${data.main.humidity} %`;
    pressure.textContent = `Pressure : ${data.main.pressure / 100} Pa`

    document.getElementById("locationInput").value="";
}

async function getWeather(lat,long){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIKEY}`
    await fetch(url)
          .then(response => response.json())
          .then(data => {
            fillWeatherDetails(data);
            console.log(data);
          });
}

async function getLatLong(city){
    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKEY}`;
    const response = await fetch(url);
    const data = await response.json();
    lat = data["0"].lat;
    long = data["0"].lon;
    getWeather(lat,long);
}

searchbtn.addEventListener('click', (e) => {
    locationValue = document.getElementById("locationInput").value;
    if(locationValue !== "" && locationValue !== " ")
    getLatLong(locationValue);
    else alert("Please enter valid city name");
});
document.addEventListener('keydown', (e) => {
    locationValue = document.getElementById("locationInput").value;
    if(e.key === "Enter" && locationValue !== "" && locationValue !== " ") 
    getLatLong(locationValue);
})