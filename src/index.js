function refreshWeather(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#tmp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);

  let description = document.querySelector("#desc");
  description.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windy = document.querySelector("#wind");
  windy.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3od7af2214ca31898090dtcb837a2247";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearchSubmit);

function showForecast() {
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let changeHtml = document.querySelector("#frcst");
  changeHtml.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "3od7af2214ca31898090dtcb837a2247";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(showForecast);
}

searchCity("Paris");
showForecast();
