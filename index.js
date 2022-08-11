const submitButton = document.getElementById("submit-button");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("icon");
const weatherInfo = document.getElementById("weather-description");
const cityName = document.getElementById("city-result");
const textField = document.getElementById("city");

const baseUrl = "https://api.openweathermap.org/data/2.5/";
const url = `${baseUrl}forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`;
let backgroundImageUrl = `https://api.unsplash.com/photos/random/?query=${textField.value}&auto=format&client_id=hGciUY5Pj0GifSYTR7VGVdm43bnnWBgWU0HkalOJyno`;



textField.addEventListener("keydown", function (event) {
  if (
    event.key === "Enter" ||
    (event.key === "Return" && textField.value !== "")
  ) {
    event.preventDefault();
    findWeather(url);
    getBackgroundImage(backgroundImageUrl);
  }
});

function findWeather(city) {
  
  const msgValue = document.querySelector(".msg");
  const url = `${baseUrl}forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
     
      msgValue.innerText = "";
      displayData(data);
      
    })
    .catch((error) => (msgValue.innerText = "Please type in a valid city"));
}



function displayData(data) {
  temperature.innerText = data.list[0].main.temp + "°C";
  weatherQuery = weatherInfo.innerText;
  weatherInfo.innerText = data.list[0].weather[0].description;
  cityName.innerText = data.city.name;
  iconCode = data.list[0].weather[0].icon;
  iconUrl = "https://api.openweathermap.org/img/w/" + iconCode;
  weatherIcon.src = iconUrl;
}

function getBackgroundImage() {
  const textField = document.getElementById("city");
  const body = document.getElementsByTagName("body")[0];
  const photographer = document.querySelector("#photographer");
  backgroundImageUrl = `https://api.unsplash.com/photos/random/?query=${textField.value}&auto=format&client_id=hGciUY5Pj0GifSYTR7VGVdm43bnnWBgWU0HkalOJyno`;

  return fetch(backgroundImageUrl)
    .then((response) => response.json())

    .then((jsonData) => {
      body.style.backgroundImage = `url(${jsonData.urls.regular})`;

      photographer.innerText = "Photo By " + jsonData.user.name;

      const photographerUrl = jsonData.user.links.html;

      photographer.setAttribute("href", photographerUrl);
    })
    .catch((error) => alert(error.message));
}

function useCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const currentLocationUrl = `${baseUrl}weather?lat=${lat}&lon=${long}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`;
      const msgValue = document.querySelector(".msg");
      return fetch(currentLocationUrl)
        .then((response) => response.json())
        .then((result) => {
          msgValue.innerText = "";

          temperature.innerText = result.main.temp + "°C";
          weatherInfo.innerText = result.weather[0].description;
          cityName.innerText = result.name;
          iconCode = result.weather[0].icon;
          iconUrl = "https://api.openweathermap.org/img/w/" + iconCode;
          weatherIcon.src = iconUrl;
        });
    });
  }
}



