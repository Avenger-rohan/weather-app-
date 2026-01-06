
// async function showWeather() {
//     // let latitude=15.3333;
//     // let longitude=74.883;
//  let API_KEY="d1845658f92b31c64bd94f06f7188c9c"
// let city="goa"
//    const reponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

// const data=await reponse.json();
// console.log("weather data >"+data)
    


// let newPara=document.createElement('p');
// newPara.textContent=`${data?.main?.temp.toFixed(2)}`
// document.body.appendChild(newPara)
// }





// async function showWeather() {
//     // let latitude=15.3333;
//     // let longitude=74.883;
//  let API_KEY="d1845658f92b31c64bd94f06f7188c9c"
// let city="goa"
//    const reponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

// const data=await reponse.json();
// console.log("weather data >"+data)
    


// let newPara=document.createElement('p');
// newPara.textContent=`${data?.main?.temp.toFixed(2)}`
// document.body.appendChild(newPara)
// }

// async function showWeather() {
//     // let latitude=15.3333;
//     // let longitude=74.883;
//  let API_KEY="d1845658f92b31c64bd94f06f7188c9c"
// let city="goa"
//    const reponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)

// const data=await reponse.json();
// console.log("weather data >"+data)
    


// let newPara=document.createElement('p');
// newPara.textContent=`${data?.main?.temp.toFixed(2)}`
// document.body.appendChild(newPara)
// }



// select the all elements
const yourWeatherTab = document.querySelector("[data-userWeather]");
const searchWeatherTab = document.querySelector("[data-searchWeather]");

const grantAccessBox = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingBox = document.querySelector(".loading-container");
const weatherBox = document.querySelector(".user-info-container");

const searchInput = document.querySelector("[data-searchInput]");
const grantBtn = document.querySelector("[data-grantAccess]");

//  Variable
let activeTab = yourWeatherTab;
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";

activeTab.classList.add("current-tab");
checkSession();

//  Tab switch/////
function switchTab(clickedTab) {
    if (clickedTab === activeTab) return;

    activeTab.classList.remove("current-tab");
    clickedTab.classList.add("current-tab");
    activeTab = clickedTab;

    weatherBox.classList.remove("active");
    loadingBox.classList.remove("active");
    grantAccessBox.classList.remove("active");
    searchForm.classList.remove("active");

    if (clickedTab === searchWeatherTab) {
        searchForm.classList.add("active");
    } else {
        checkSession();
    }
}

yourWeatherTab.addEventListener("click", () => switchTab(yourWeatherTab));
searchWeatherTab.addEventListener("click", () => switchTab(searchWeatherTab));

//  session check
function checkSession() {
    const coords = sessionStorage.getItem("user-coordinates");

    if (!coords) {
        grantAccessBox.classList.add("active");
    } else {
        fetchWeatherByCoords(JSON.parse(coords));
    }
}

//  Fetch by location //////////////
async function fetchWeatherByCoords({ lat, lon }) {
    loadingBox.classList.add("active");

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    loadingBox.classList.remove("active");
    weatherBox.classList.add("active");
    showWeather(data);
}

// show weather 
function showWeather(data) {
    document.querySelector("[data-cityName]").innerText = data.name;
    document.querySelector("[data-countryIcon]").src =
        `https://flagcdn.com/144x108/${data.sys.country.toLowerCase()}.png`;

    document.querySelector("[data-weatherDesc]").innerText =
        data.weather[0].description;

    document.querySelector("[data-weatherIcon]").src =
        `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    document.querySelector("[data-temp]").innerText =
        `${data.main.temp} °C`;

    document.querySelector("[data-windspeed]").innerText =
        `${data.wind.speed} m/s`;

    document.querySelector("[data-humidity]").innerText =
        `${data.main.humidity}%`;

    document.querySelector("[data-cloudiness]").innerText =
        `${data.clouds.all}%`;
}

// loction acess 
grantBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition((pos) => {
        const coords = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        };
        sessionStorage.setItem("user-coordinates", JSON.stringify(coords));
        fetchWeatherByCoords(coords);
    });
});

// city ko search krna 
searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = searchInput.value.trim();
    if (city === "") return;

    loadingBox.classList.add("active");
    weatherBox.classList.remove("active");

    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    loadingBox.classList.remove("active");
    weatherBox.classList.add("active");
    showWeather(data);
});









