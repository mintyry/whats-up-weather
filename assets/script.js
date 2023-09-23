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

let APIkey = "7d62d24437d4b74a7a9fb254a29a521e";
let city;

function getApi() {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

let searchBtn = document.querySelector('#search');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();
    let input = document.querySelector('input').value;
    console.log(input);
});



