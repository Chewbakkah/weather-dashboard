let apiKey = "579b64ec752a4651bfdc49c3c591949e";
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
const abbrFullName = {"AZ":"Arizona","AL":"Alabama","AK":"Alaska","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming"};
const fullNameAbbr = {"arizona":"AZ","alabama":"AL","alaska":"AK","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","districtofcolumbia":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","newhampshire":"NH","newjersey":"NJ","newmexico":"NM","newyork":"NY","northcarolina":"NC","northdakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhodeisland":"RI","southcarolina":"SC","southdakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","westvirginia":"WV","wisconsin":"WI","wyoming":"WY"};
//dayArray each top level is a day
//dayArray secondary level stores 0 = Weather Type | 1 = weather icon | 2 = temp low | 3 = temp high | 4 = wind speed | 5 = humidity
let dayArray = [[], [], [], [], [], []];

// weather API https://openweathermap.org/

let getEndpoint3 = function () {
    endpoint = `https://tile.openweathermap.org/map/precipitation_new/5/${lat}/${lon}.png?appid=${apiKey}`;
  
    fetch(endpoint)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonData) {
        console.log(jsonData);
        }
      )
  };

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
  endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch},tx,usa&units=imperial&appid=${apiKey}`;

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
      console.log(stateAbbr);
      localStorage.setItem("lastCity", citySearch);
      localStorage.setItem("lastState", stateSearch);
      localStorage.setItem("lastStateAbbr", stateAbbr);
      console.log(stateSearch);
      getEndpoint1();
    }
  };

  function convertStateToAbbr(stateSearch) {
    if(stateSearch === undefined) return stateSearch;
    var strInput = stateSearch;
    var strStateToFind = strInput.toLowerCase().replace(/\ /g, '');
    stateAbbr = fullNameAbbr[strStateToFind];
    console.log(stateAbbr);
  }

// let populateCurrent = function(){
//   currentWeatherEl.innerHTML = 
// }

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
