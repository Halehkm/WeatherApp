function citySearch(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  currentCity.innerHTML = `${cityInput.value}`;
  let apiKey = `3a887c11a858210e0003566c69e3307b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(tempDetails);
}

function tempDetails(response) {
  let currentTemp = document.querySelector("#temp");
  let tempDescription = document.querySelector("#temp-desc");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  tempDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  localTime();
}

function localTime() {
  let currentCity = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  currentCity.innerHTML = `${cityInput.value}`;
  let apiKey = `24b62e707b504c83a59cadfaa50afb0a`;
  let apiUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${cityInput.value}`;
  axios.get(apiUrl).then(formatDate);
}

function formatDate(response) {
  let currentTime = document.querySelector("#hour-minute");
  let currentDay = document.querySelector("#day");
  let currentDate = document.querySelector("#date");
  let date = new Date(response.data.datetime);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let month = date.getMonth() + 1;
  let DD = date.getDate();
  let year = date.getFullYear();

  currentTime.innerHTML = `${hours}:${minutes}`;
  currentDay.innerHTML = `${day}`;
  currentDate.innerHTML = `${month}/${DD}/${year}`;
}

let city = document.querySelector("#city-search");
city.addEventListener("submit", citySearch);

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}

function currentLocationTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `3a887c11a858210e0003566c69e3307b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(localTemp);
}

function localTemp(response) {
  let nowCity = document.querySelector("#city");
  let nowTemp = document.querySelector("#temp");
  let nowTempDescription = document.querySelector("#temp-desc");
  let nowWindSpeed = document.querySelector("#wind-speed");
  let nowHumidity = document.querySelector("#humidity");
  let nowWeatherIcon = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  nowCity.innerHTML = response.data.name;
  nowTemp.innerHTML = Math.round(response.data.main.temp);
  nowTempDescription.innerHTML = response.data.weather[0].description;
  nowWindSpeed.innerHTML = Math.round(response.data.wind.speed);
  nowHumidity.innerHTML = response.data.main.humidity;
  nowWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let nowCitySearch = document.querySelector("#currentLocation-btn");
nowCitySearch.addEventListener("click", currentLocation);

function fToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function cToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", cToF);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fToC);
