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
            temp.textContent = Math.round(data.main.temp) + '°';
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

        })
};

let searchBtn = document.querySelector('#search');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let mainWeatherCard = document.querySelector('#main-weather');
    mainWeatherCard.setAttribute('style', 'display:flex');

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

