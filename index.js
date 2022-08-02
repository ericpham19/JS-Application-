

const submitButton = document.getElementById("submitBtn");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("icon")
const weatherInfo = document.getElementById("weather-description")
const cityName = document.getElementById("city-result");
const textField = document.getElementById("city");
const url= `https://api.openweathermap.org/data/2.5/forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`
backgroundImageUrl= `https://api.unsplash.com/photos/random/?client_id=hGciUY5Pj0GifSYTR7VGVdm43bnnWBgWU0HkalOJyno`;

textField.addEventListener('keydown', function (event) {
   
    if(event.keyCode == 13 && textField.value !== ""){
        event.preventDefault();
        findWeather(url);
        getBackgroundImage(backgroundImageUrl)
    }
    
})


function findWeather(){
    const textField = document.getElementById("city");
    const msgValue= document.querySelector(".msg")
    const url= `https://api.openweathermap.org/data/2.5/forecast?q=${textField.value}&units=metric&appid=33d7061a211b97265abda12a2d87a56e`

 
    return fetch (url)
    .then(response => response.json())
    .then(data =>{
        msgValue.innerText =""
        displayData(data)
        console.log(data)
    })
    .catch (error => msgValue.innerText = "Please type in a valid city");
    
}
 
function getBackgroundImage(){
    const textField = document.getElementById("city");
    backgroundImageUrl= `https://api.unsplash.com/search/photos/?query=${textField.value}&client_id=hGciUY5Pj0GifSYTR7VGVdm43bnnWBgWU0HkalOJyno;`;
    const photographer= document.querySelector ("#photographer");
    console.log(textField.value)
    const body= document.getElementsByTagName('body')[0];
    

    fetch (backgroundImageUrl)
    .then((response) => response.json())
    
    .then ((jsonData) => {
        console.log(jsonData)
       

        body.style.backgroundImage = `url(${backgroundImageUrl})`;
        
        photographer.innerText = "Photo By " + jsonData.user.name
        
        const photographerUrl = jsonData.user.links.html
        
        photographer.setAttribute('href', photographerUrl)
    })
    .catch (error => alert(error.message)
        
    );

}


function displayData(data){
    temperature.innerText = data.list[0].main.temp + "C°"
        weatherInfo.innerText = data.list[0].weather[0].description
        cityName.innerText = data.city.name;
        iconCode = data.list[0].weather[0].icon;
        iconUrl= 'https://api.openweathermap.org/img/w/'+ iconCode;
        weatherIcon.src = iconUrl;
}

