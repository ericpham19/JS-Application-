

let submitButton = document.getElementById("submitBtn");
let temperature = document.getElementById("temp");
let weatherIcon = document.getElementById("icon")
let weatherInfo = document.getElementById("weather-description")
let cityName = document.getElementById("city-result");




function findWeather(){
    let textField = document.getElementById("city");
    let url= `https://api.openweathermap.org/data/2.5/forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`

 
    fetch (url)
    .then(response => response.json())
    .then(data =>{
        console.log (data)
        temperature.innerText = data.list[0].main.temp
        weatherInfo.innerText = data.list[0].weather[0].description
        cityName.innerText = data.city.name;
        iconCode = data.list[0].weather[0].icon;
        iconUrl= 'https://api.openweathermap.org/img/w/'+ iconCode;
        weatherIcon.src = iconUrl;
    
    })
    .catch (error => console.log("error")) 
}

function getBackgroundImage(){
    let textField = document.getElementById("city");
    backgroundImageUrl= `https://api.unsplash.com/search/photos/random/?client_id=hGciUY5Pj0GifSYTR7VGVdm43bnnWBgWU0HkalOJyno`
     console.log(textField.value)
    let backgroundImage = document.body.style.backgroundImage ;
    backgroundImage = backgroundImageUrl;
    let photographer= document.querySelector ("#photographer");

    fetch (backgroundImageUrl)
    .then((response) => response.json())
    
    .then ((jsonData) => {
        console.log(jsonData)
        backgroundImage.src = jsonData.urls.regular;
        photographer.innerText = jsonData.user.name
    })
    .catch ( (error) =>
        console.log("Error:" + error)
    );

}

