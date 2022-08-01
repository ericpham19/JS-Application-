

let submitButton = document.getElementById("submitBtn");
let temperature = document.getElementById("temp");
let weatherIcon = document.getElementById("icon")
let weatherInfo = document.getElementById("weather-description")
let cityName = document.getElementById("city-result");




function findWeather(){
    let textField = document.getElementById("city");
    let url= `https://api.openweathermap.org/data/2.5/forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`

    console.log(url)
    fetch (url).then(response => response.json())
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