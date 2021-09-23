
function searchCity(city) {
  let apiKey = `3a887c11a858210e0003566c69e3307b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios(apiUrl).then(tempDetails);
}

function citySearch(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  currentCity.innerHTML = `${cityInput.value}`; 
  searchCity(cityInput.value);
}

function tempDetails(response) {
  let currentTemp = document.querySelector("#temp");
  let tempDescription = document.querySelector("#temp-desc");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherIcon = document.querySelector("#weather-icon");

  fahrenheitTemperature = response.data.main.temp;

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  tempDescription.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  localTime(response.data.name);
  forecastTemp(response.data.coord);
}

function localTime(city) {
  let apiKey = `24b62e707b504c83a59cadfaa50afb0a`;
  let apiUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${city}`;
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

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function forecast(response) {
  let forecastDaily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecastDaily.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<li class="forecast day-${index}">
          <div>${formatForecastDate(forecastDay.dt)} </div>
          ${Math.round(
            forecastDay.temp.max
          )}°F <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="35"/>
        </li>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

function forecastTemp(coords) {
  apiKey = `3a887c11a858210e0003566c69e3307b`;
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(forecast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocationTemp);
}

function currentLocationTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `3a887c11a858210e0003566c69e3307b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(localTemp);
}

function localTemp(response) {
  let nowCity = document.querySelector("#city");
  let nowTemp = document.querySelector("#temp");
  let nowTempDescription = document.querySelector("#temp-desc");
  let nowWindSpeed = document.querySelector("#wind-speed");
  let nowHumidity = document.querySelector("#humidity");
  let nowWeatherIcon = document.querySelector("#weather-icon");

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
  let fahrTemp = (fahrenheitTemperature - 32) * (5 / 9);
  currentTemp.innerHTML = Math.round(fahrTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function cToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let fahrenheitTemperature = null;

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", cToF);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fToC);

searchCity("Chicago");