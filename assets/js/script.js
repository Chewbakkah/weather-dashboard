let apiKey1 = "5ca1f6d50863dfffced4dd5146b9fd57";
let apiKey2 = "579b64ec752a4651bfdc49c3c591949e";
let navEl = document.querySelector("#nav");
let citySearchEl = document.querySelector("#city-search");
let stateSearchEl = document.querySelector("#state");
let pastSearchEl = document.querySelector("#past-search");
let currentWeatherEl = document.querySelector("#current-weather");
let futureEl = document.querySelector("#future");
let goBtnEl = document.querySelector("#goBtn");
let cityErrorEl = document.querySelector("#city-error");
let stateAbbr;
let citySearch;
let stateSearch;
let lat;
let lon;
let currentTemp;
let currentFeel;
let currentWind;
let currentHumidity;
let currentUV;
const fullNameAbbr = {
  arizona: "AZ",
  alabama: "AL",
  alaska: "AK",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  districtofcolumbia: "DC",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  newhampshire: "NH",
  newjersey: "NJ",
  newmexico: "NM",
  newyork: "NY",
  northcarolina: "NC",
  northdakota: "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  rhodeisland: "RI",
  southcarolina: "SC",
  southdakota: "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  westvirginia: "WV",
  wisconsin: "WI",
  wyoming: "WY",
};
//dayArray each top level is a day
//dayArray secondary level stores 0 = Weather Type | 1 = weather icon | 2 = temp low | 3 = temp high | 4 = wind speed | 5 = humidity
let dayArray = [[], [], [], [], [], []];
let monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dayTextualArray = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];
let date;
// location API https://positionstack.com/
// weather API https://openweathermap.org/

setDate = function () {
  let today = new Date();
  let day = today.getDay();
  date = dayTextualArray[day] + ", " + monthsArray[today.getMonth()] +
    " " +
    today.getDate() +
    ", " +
    today.getFullYear();
};


let getEndpoint2 = function () {
  endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey2}`;

  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      currentTemp = jsonData.current.temp;
      currentFeel = jsonData.current.feels_like;
      currentWind = jsonData.current.wind_speed;
      currentHumidity = jsonData.current.humidity;
      currentUV = jsonData.current.uvi;
      for (i = 1; i < 7; i++) {
        let weatherTemp = jsonData.daily[i + 1].weather[0].description;
        let toTitleCase = function (str) {
          str = str.toLowerCase().split(' ');
          for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
          }
          weatherTemp = str.join(' ');
        };
        toTitleCase(weatherTemp);
        console.log(weatherTemp);
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
      setDate();
      populateCurrent();
      populateFuture();
    });
};

let getEndpoint1 = function () {
  endpoint = `http://api.positionstack.com/v1/forward?access_key=${apiKey1}&query=${citySearch},${stateAbbr}`;

  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonData) {
      lat = jsonData.data[0].latitude;
      lon = jsonData.data[0].longitude;
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
    convertStateToAbbr(stateSearch);
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
    convertStateToAbbr(stateSearch);
    localStorage.setItem("lastCity", citySearch);
    localStorage.setItem("lastState", stateSearch);
    localStorage.setItem("lastStateAbbr", stateAbbr);
    getEndpoint1();
  }
};

function convertStateToAbbr(stateSearch) {
  if (stateSearch === undefined) return stateSearch;
  var strInput = stateSearch;
  var strStateToFind = strInput.toLowerCase().replace(/\ /g, "");
  stateAbbr = fullNameAbbr[strStateToFind];
}

let populateCurrent = function () {
  currentWeatherEl.innerHTML =
    "<h2>For " +
    citySearch +
    ", " +
    stateAbbr +
    "</h2>" + "<h4>" + date + "</h4>" +
    "Temp: " +
    currentTemp +
    "&deg;<br />" +
    "Feels Like: " +
    currentFeel +
    "&deg;F<br />" +
    "Humidity: " +
    currentHumidity +
    "%<br />" +
    "UV Index: " +
    currentUV;
};
//dayArray secondary level stores 0 = Weather Type | 1 = weather icon | 2 = temp low | 3 = temp high | 4 = wind speed | 5 = humidity
let populateFuture = function () {
  futureEl.innerHTML = "";
  let dayTextualArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  let date = new Date();
  let day = date.getDay();
  day = day + 1;
  for (i = 0; i < dayArray.length; i++) {
    day = day + i;
    let futureDayEl = document.createElement("div");
    futureDayEl.className = "future-day col-md-2";
    futureDayEl.innerHTML = dayTextualArray[day] + "<br />" + dayArray[i][0] + "<br />" + "<img src=\"http://openweathermap.org/img/wn/" + dayArray[i][1] + "@2x.png\">" + "<br />Low: " + dayArray[i][2] + "&deg;F" + "<br />High: " + dayArray[i][3] + "&deg;F" + "<br />Wind: " + dayArray[i][4] + "MPH" + "<br />Humidity: " + dayArray[i][5] + "%";


    day = day - i;
    futureEl.appendChild(futureDayEl);
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
