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

let historyBar = document.querySelector('#history-ticker');
let mainSection = document.querySelector('main');

loadHistoryButtons();



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

            let cityArray = JSON.parse(localStorage.getItem('city')) || [];
            console.log(data);

            if (cityArray.includes(data.name)) {
                let index = cityArray.indexOf(data.name);
                console.log(index);
                cityArray.splice(index, 1);
            }
        
            cityArray.unshift(data.name);
            localStorage.setItem('city', JSON.stringify(cityArray));

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

            let img = document.createElement('img');
            img.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);

            city.textContent = data.name;
            day.textContent = now;
            day.appendChild(img);
            temp.textContent = Math.round(data.main.temp) + '℉';
            humid.textContent = `Humidity: ${data.main.humidity}`;
            wind.textContent = `Wind Speed: ${Math.round(data.wind.speed)} mph`;

            loadHistoryButtons();

        })
};

historyBar.onclick = function (event) {
    console.log(event.target);
    getApi(event.target.textContent);

    mainSection.setAttribute('style', 'display:flex');
};

function getForecast(lat, lon) {
    let apiKey = "7d62d24437d4b74a7a9fb254a29a521e";
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            // if (!response.ok) {
            //     console.log('error');
            //     alert('Please enter an actual city.')
            //     return;
            // }
            return response.json();
        })
        .then(function (data) {
            console.log(data);


            let forecastContainer = document.querySelector('#forecast-container');
            let forecastOneDate;
            let forecastOneTemp;
            let forecastOneHumid;
            let forecastOneWind;

            for (let i = 0; i < 5; i++) {

                forecastOneDate = dayjs(data.list[i * 8].dt_txt).format('M/D');
                forecastOneTemp = data.list[i * 8].main.temp;
                forecastOneHumid = data.list[i * 8].main.humidity;
                forecastOneWind = data.list[i * 8].wind.speed;

                let iconEl = forecastContainer.children[i].children[1].children[0];

                if (iconEl.firstChild) {
                    iconEl.removeChild(iconEl.firstChild)
                }


                let forecastIcon = document.createElement('img');
                forecastIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.list[i * 8].weather[0].icon}.png`);


                forecastContainer.children[i].children[0].children[0].textContent = forecastOneDate;
                forecastContainer.children[i].children[0].children[1].textContent = Math.round(forecastOneTemp) + '℉';
                iconEl.appendChild(forecastIcon);
                forecastContainer.children[i].children[1].children[1].textContent = `Humidity: ${forecastOneHumid}`;
                forecastContainer.children[i].children[1].children[2].textContent = `Wind Speed: ${Math.round(forecastOneWind)} mph`;
            }
        })
};


// function createHistoryBtn (){
//     let cityArray = JSON.parse(localStorage.getItem('city')) || [];
//     let input = document.querySelector('input').value;

//     //lowercase all entries, then capitalize first letter when pulling

//     // if (!cityArray.includes(input)) {
//         // for (let i = 0; i < 5; i++) {
//     let cityBtn = document.createElement('button');
//     cityBtn.setAttribute('class', 'btn fssm');
//     cityBtn.textContent = input;
//     // cityBtn.setAttribute('id', input);

//     // let removeItem = input;
//     // let index = cityArray.indexOf(removeItem);
//     console.log(input);
//     if (!cityArray.includes(input)) {
//        cityArray.push(input);


//     //    console.log(cityArray);
//     //     cityArray.splice(index, 1);
//     //     console.log(cityArray);
//     }

//     console.log(cityArray);
//     historyBar.prepend(cityBtn);
//     historyBar.removeChild(historyBar.lastChild);

//     // }
// };

function loadHistoryButtons() {
    historyBar.innerHTML = "";

    // TRYING TO UPPERCASE FIRST LETTERS
    // let cityNames = cityArray.split(" ");

    // for (let i = 0; i < cityNames.length; i++) {

    //     let firstLetter = cityArray[i][0].toUpperCase()
    //     let restOfName = cityArray[i].slice(1);
    //     cityArray[i] = firstLetter + restOfName;

    //     console.log(cityArray[i]);
    //     console.log(restOfName);
    //     console.log(firstLetter);
    //     console.log(cityNames);
    // }


    let cityArray = JSON.parse(localStorage.getItem('city')) || [];



    for (let i = 0; i < cityArray.length; i++) {
        let cityBtn = document.createElement('button');


        cityBtn.setAttribute('class', 'btn fssm');
        cityBtn.textContent = cityArray[i];



        historyBar.append(cityBtn);


    }


    // cityArray.forEach(function(city) {
    //   let cityBtn = document.createElement('button');
    //   cityBtn.setAttribute('class', 'btn fssm');
    //   cityBtn.textContent = city;
    //   let historyBar = document.querySelector('#history-ticker');
    //   historyBar.append(cityBtn);

    //   cityBtn.onclick = function() {
    //     getApi(city);
    //   };
    // });

    //maybe rewrite with for loop to access cityArray's indexes
}

let searchBtn = document.querySelector('#search');

searchBtn.addEventListener('click', function (event) {
    event.preventDefault();


    mainSection.setAttribute('style', 'display:flex');
    //^bring back when done

    let input = document.querySelector('input').value;

    // input = input.toLowerCase();
    // console.log(input);

    // input = input.split(' ');
    // console.log(input);

    // for (let i = 0; i < input.length; i++) {
    //     input[i] = input[i][0].toUpperCase() + input[i].substr(1);
    // }

    // input = input.join(' ');

    // console.log(input);

    getApi(input);

    console.log('test');
    
   

    // createHistoryBtn();
    // loadHistoryButtons();

    // input= document.querySelector('input').value;
    // input.textContent = '';
});

// TODO: capitalize first letter of each word in history buttons; why are error entries still making buttons?

