

// var apiKey = "9427e8fb1e4c72e3e0458c62e5a629d6";

// var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=orlando&appid=9427e8fb1e4c72e3e0458c62e5a629d6";

var date = moment().format('dddd, MMM Do.');
var currentDay = document.getElementById("current-day")

function getCity(){
    const newCity = document.getElementById("city-input");
    const cityName = document.getElementById("city-name");  
    cityName.innerHTML = "--" + newCity.value +"--" 


   
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+newCity.value+"&units=imperial&appid=9427e8fb1e4c72e3e0458c62e5a629d6") 
    .then(response => response.json())
    .then(function(response){
        currentDay.innerHTML = date
        document.getElementById("current-icon").src = "https://openweathermap.org/img/wn/" + response.weather[0].icon +"@2x.png";
        document.getElementById("current-temp").innerHTML = "Temperature: "+ Number(response.main.temp).toFixed(0) + "°";
        document.getElementById("current-wind").innerHTML = "Wind: " + Number(response.wind.speed).toFixed(0) + " mph.";
        document.getElementById("humidity").innerHTML = "Humidity: " + (response.main.humidity) + " %"
    });
    
    

};





