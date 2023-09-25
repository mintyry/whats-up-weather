/* GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history */
//click search button will do three things: bring up history button, show current weather, fill five forecast cards
/*WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed */
//main weather will show city, date, icons for weather conditions, temp, humid, wind speed.
/* WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity*/
//cards will do the same, minus city name
/* WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city */
//click history buttons that populate will show main weather and cards

let forecastContainer = document.querySelector('#forecast-container');
let forecastOneDate;
let forecastOneTemp;
let forecastOneHumid;
let forecastOneWind;


function getApi(city) {
    let apiKey = "7d62d24437d4b74a7a9fb254a29a521e";
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                console.log('error');
                alert('Please enter an actual city.')
                return;
            }
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            let lat = data.coord.lat;
            let long = data.coord.lon;
            getForecast(lat, long);

            let city = document.querySelector("#city");
            let temp = document.querySelector('#temp');
            let humid = document.querySelector('#humid');
            let wind = document.querySelector('#wind');
            let day = document.querySelector('#date');

            let currentDay = dayjs();
            let now = currentDay.format('M/D/YY');

            city.textContent = data.name;
            day.textContent = now;
            temp.textContent = Math.round(data.main.temp) + '°F';
            humid.textContent = `Humidity: ${data.main.humidity}`;
            wind.textContent = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

        })
};

function getForecast(lat, lon) {
    let apiKey = "7d62d24437d4b74a7a9fb254a29a521e";
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                console.log('error');
                alert('Please enter an actual city.')
                return;
            }
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < 5; i++) {
                // let forecastContainer= document.querySelector('#forecast-container');
                for (let i = 0; i < data.list.length; i = i + 7) {
                    forecastOneDate = dayjs(data.list[0].dt_txt).format('M/D');
                    forecastOneTemp = data.list[0].main.temp;
                    forecastOneHumid = data.list[0].main.humidity;
                    forecastOneWind = data.list[0].wind.speed;
                }

                forecastContainer.children[i].children[0].children[0].textContent = forecastOneDate;
                forecastContainer.children[i].children[0].children[1].textContent = Math.round(forecastOneTemp) + '°F';
                forecastContainer.children[i].children[1].children[1].textContent = `Humidity: ${forecastOneHumid}`;
                forecastContainer.children[i].children[1].children[2].textContent = `Wind Speed: ${forecastOneWind} mph`;

            }

        })
};

let searchBtn = document.querySelector('#search');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let mainWeatherCard = document.querySelector('#main-weather');

    // mainWeatherCard.setAttribute('style', 'display:flex');
    //^bring back when done

    let input = document.querySelector('input').value;
    // console.log(input);
    getApi(input);
});




/*   let currentWeather =(`<p id="city">${data.name}</p>
                <p id="date">x/xx/xx</p>
                <p id="temp">${data.main.temp}°</p>
                <div id="details-container">
                    <p id="humid">${data.main.humidity}</p>
                    <p id="wind">${data.wind.speed}</p>
                </div>`);
            let mainWeather = document.querySelector('#main-weather');
            mainWeather.innerHTML= currentWeather; */

// for loop item = item + 7

