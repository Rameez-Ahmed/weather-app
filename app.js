// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".loction p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
	unit : "celsius"
}

// App consts and vars
const KELVIN = 273;
//API KEY
const key = "d9c75ab3e611c0babee589f03cd43202";

// check if browser support geolocation
if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
	notificationElement.style.display = "block";
	notificationElement.innerHTML ="<p>Browser doesn't support Geolocation</p>";
}

//set user's postion
function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	getWeather(latitude, longitude);
}

//show error when there is an issue with geolocation service
function showError(error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p>${error.message}</p>`;
}

// Get Weather from api provider
function getWeather(latitude, longitude) {
	let api = `http://api.openweathermap.org/data/2.5/weather?q=Karachi,pk&APPID=e48553f681e61860621b3c0e8441adef`;
	
	fetch(api)
		.then(function(response){
			let data = response.json();
			return data;
			
		})
		.then(function(data){
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.iconId = data.weather[0].icon;
			weather.city= data.name;
			weather.country = data.sys.country;

		})
		.then(function(){

			displayWeather();
		});



} 
// display
function displayWeather(){
	iconElement.innerHTML =`<img src="icons/${weather.iconId}.png"/>`;
	tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
	descElement.innerHTML = weather.description;
	locationElement.innerHTML = `${weather.city}, ${weather.country}`;

}
//c to f
function celsiusToFahrenheit(temperature) {
	return (temperature * 9/5) + 32;
	
}

//action on click
tempElement.addEventListener("click", function(){
	if(weather.temperature.value === undefined) return;

	if(weather.temperature.unit == "celsius"){
		let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
		fahrenheit = Math.floor(fahrenheit);
		tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
		weather.temperature.unit = "fahrenheit";

	}else{
		tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
		weather.temperature.unit = "celsius"

	}


})
