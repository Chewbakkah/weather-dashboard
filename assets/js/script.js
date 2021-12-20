let apiKey = "579b64ec752a4651bfdc49c3c591949e";
let navEl = document.querySelector("#nav");
let citySearchEl = document.querySelector("#city-search");
let stateSearchEl = document.querySelector("#state");
let pastSearchEl = document.querySelector("#past-search");
let currentWeatherEl = document.querySelector("#current-weather");
let currentMapEl = document.querySelector("#current-map");
let futureEl = document.querySelector("#future");
let goBtnEl = document.querySelector("#goBtn");
let cityErrorEl = document.querySelector("#city-error");
let citySearch;
let stateSearch;
let lat;
let lon;
let currentTemp;
let currentFeel;
let currentWind;
let currentHumidity;
let currentUV;
//dayArray each top level is a day
//dayArray secondary level stores 0 = Weather Type | 1 = weather icon | 2 = temp low | 3 = temp high | 4 = wind speed | 5 = humidity
let dayArray = [[], [], [], [], [], []];

// weather API https://openweathermap.org/


let getEndpoint2 = function () {
  endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData);
      currentUV = jsonData.current.uvi;
      for (i = 1; i < 7; i++) {
        let weatherTemp = jsonData.daily[i + 1].weather[0].description;
        dayArray[i - 1][0] = weatherTemp;
        let weatherIcon = jsonData.daily[i + 1].weather[0].icon;
        dayArray[i - 1][1] = weatherIcon;
        let tempLow = jsonData.daily[i + 1].temp.min;
        dayArray[i - 1][2] = tempLow;
        let tempHigh = jsonData.daily[i + 1].temp.max;
        dayArray[i - 1][3] = tempHigh;
        let windSpeed = jsonData.daily[i + 1].wind_speed;
        dayArray[i - 1][4] = windSpeed;
        let humidity = jsonData.daily[i + 1].humidity;
        dayArray[i - 1][5] = humidity;
      }
      console.log(dayArray);
    });
};

let getEndpoint1 = function () {
  endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch},${stateSearch},usa&units=imperial&appid=${apiKey}`;

  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      console.log(jsonData);
      lat = jsonData.coord.lat;
      lon = jsonData.coord.lon;
      currentTemp = jsonData.main.temp;
      currentFeel = jsonData.main.feels_like;
      currentWind = jsonData.wind.speed;
      currentHumidity = jsonData.main.humidity;
    })
    .then(function () {
      getEndpoint2();
    });
};

let loadData = function () {
  if (localStorage.getItem("lastCity") !== null) {
    citySearch = localStorage.getItem("lastCity");
    citySearchEl.value = citySearch;
    stateSearch = localStorage.getItem("lastState");
    stateSearchEl.value = stateSearch;
    getEndpoint1();
  }
};

let captureCity = function (event) {
    event.preventDefault();
    if (citySearchEl.value == "") {
      cityErrorEl.classList.remove("hidden");
    } else {
      cityErrorEl.classList.add("hidden");
      citySearch = citySearchEl.value;
      stateSearch = stateSearchEl.value;
      localStorage.setItem("lastCity", citySearch);
      localStorage.setItem("lastState", stateSearch);
      getEndpoint1();
    }
  };

loadData();
goBtnEl.addEventListener("click", captureCity);
//TO Do:
// Capture search form and turn into coordinates for weather API
// This may require a new secondary API?

// Store search results in local storage and display on main page as options
// check search against already stored cities to prevent duplicates
// Make delete button for removing these clickable cities

// Call info from weather API and store variables
// current weather should provide the following: city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// UV index needs to be colored based on severity
// 6 day forcast needed
// style info for display on main page
// push info to main page sections
// push info with variable classes so that css file can style based on conditions

// style elements in css file
// style conditional classes based on weather type

// BONUS STUFF:
// add date and time to app
// add background weather images
// add dark and light modes
// local time?
