// querySelector to access HTML elements in global scope, to be referred to in other functions.
let historyBar = document.querySelector('#history-ticker');
let mainSection = document.querySelector('main');

// Upon page load, user's search history buttons will appear.
loadHistoryButtons();

// Using API key and endpoint, we pass the user's search input into the getApi function as 'city,' which then calls data about that city.
function getApi(city) {
    let apiKey = "7d62d24437d4b74a7a9fb254a29a521e";
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;

    fetch(requestUrl)
        .then(function (response) {
            // Check if response is ok/status 200-299. If not, alert message prompts user to enter valid city; return stops code.
            if (!response.ok) {
                console.log('error');
                alert('Please enter an actual city.')
                return;
            }
            // Translating the response into data...
            return response.json();
        })
        .then(function (data) {
            // Access array from local storage.
            let cityArray = JSON.parse(localStorage.getItem('city')) || [];

            // Check to see if city already exists in storage//checking for and removing duplicates.
            if (cityArray.includes(data.name)) {
                let index = cityArray.indexOf(data.name);
                cityArray.splice(index, 1);
            }
            // If there aren't any duplicates, add city as a search history button to the front of the list of buttons.
            cityArray.unshift(data.name);
            localStorage.setItem('city', JSON.stringify(cityArray));

            // Main section of current temperature and five-day forecast will appear after response check passes as ok, 
            // and we get all the proper weather info.
            mainSection.setAttribute('style', 'display:flex');

            // Passing in coordinates of city name to access five-day forecast data.
            let lat = data.coord.lat;
            let long = data.coord.lon;
            getForecast(lat, long);

            // Accessing ids from HTML.
            let city = document.querySelector("#city");
            let temp = document.querySelector('#temp');
            let humid = document.querySelector('#humid');
            let wind = document.querySelector('#wind');
            let day = document.querySelector('#date');

            // Formatting the current date.
            let currentDay = dayjs();
            let now = currentDay.format('M/D/YY');

            // Create and display weather conditions icon for current temp.
            let img = document.createElement('img');
            img.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);

            // Display all the data for current temperature.
            city.textContent = data.name;
            day.textContent = now;
            day.appendChild(img);
            // Rounding temperature to not display decimals.
            temp.textContent = Math.round(data.main.temp) + '℉';
            humid.textContent = `Humidity: ${data.main.humidity}`;
            wind.textContent = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

            // User's search gets turned into a button for user to revisit and easily access weather.
            loadHistoryButtons();
        })
};

// User clicks history button; accesses the city name in the history button to run getApi function and display that prior search's weather data.
historyBar.onclick = function (event) {
    console.log(event.target);
    getApi(event.target.textContent);

    // If user leaves and comes back to page, all weather is gone, but clicing a history button will render all of it to reappear again.
    mainSection.setAttribute('style', 'display:flex');
};

// Function to display five-day forecast.
function getForecast(lat, lon) {

    // Using API key and endpoint, we access the five-day forecast for user's desired city.
    let apiKey = "7d62d24437d4b74a7a9fb254a29a521e";
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // For scoping purposes, define different aspects of forecast data to be accessed
            let forecastContainer = document.querySelector('#forecast-container');
            let forecastOneDate;
            let forecastOneTemp;
            let forecastOneHumid;
            let forecastOneWind;

            // For loop generates content for five-day forecast
            for (let i = 0; i < 5; i++) {
                // Acessing that content from the data object using dot notation.
                forecastOneDate = dayjs(data.list[i * 8].dt_txt).format('M/D');
                forecastOneTemp = data.list[i * 8].main.temp;
                forecastOneHumid = data.list[i * 8].main.humidity;
                forecastOneWind = data.list[i * 8].wind.speed;

                // Traversing to the icon section would be too long; trying to shorten a bit by creating variable.
                let iconEl = forecastContainer.children[i].children[1].children[0];

                // Had problem of icons generating repeatedly in section if user entered multiple searches.
                // Resolved this by checking if a child element exists already; if so, remove it, so we can add the most recent one (line 127).
                if (iconEl.firstChild) {
                    iconEl.removeChild(iconEl.firstChild)
                }

                // Creating and displaying weather condition icon for five-day.
                let forecastIcon = document.createElement('img');
                forecastIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.list[i * 8].weather[0].icon}.png`);

                // Traverse the DOM to access and display content to specific parts of five-day forecast.
                // Did it this way because I formatted the cards much too specifically to simply appendChild.
                forecastContainer.children[i].children[0].children[0].textContent = forecastOneDate;
                // Rounding temperature to not display decimals.
                forecastContainer.children[i].children[0].children[1].textContent = Math.round(forecastOneTemp) + '℉';
                // Displaying the current city's weather condition icon.
                iconEl.appendChild(forecastIcon);
                forecastContainer.children[i].children[1].children[1].textContent = `Humidity: ${forecastOneHumid}`;
                forecastContainer.children[i].children[1].children[2].textContent = `Wind Speed: ${Math.round(forecastOneWind)} mph`;
            }
        })
};

// Function to create and show buttons both on page load and when user searches city.
function loadHistoryButtons() {

    // Clears content so empty buttons dont show if no searches have been made.
    historyBar.innerHTML = "";

    // Getting array of data from local storage.
    let cityArray = JSON.parse(localStorage.getItem('city')) || [];

    // Loop to create and display five history buttons at most.
    for (let i = 0; i < cityArray.length && i < 5; i++) {

        let cityBtn = document.createElement('button');

        cityBtn.setAttribute('class', 'btn fssm');
        cityBtn.textContent = cityArray[i];
        historyBar.append(cityBtn);
    }
}

// All the magic above happens when user clicks the search button.
let searchBtn = document.querySelector('#search');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let input = document.querySelector('input').value;

    getApi(input);
});