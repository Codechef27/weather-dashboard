// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// var apiKey = "9427e8fb1e4c72e3e0458c62e5a629d6";

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
        document.getElementById("humidity").innerHTML = "Humidity: " + (response.main.humidity) + " %";
        var lat = response.coord.lat;
        var lon = response.coord.lon;
    

        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+ "&lon=" +lon+ "&units=imperial&appid=9427e8fb1e4c72e3e0458c62e5a629d6")
        .then(response => response.json())
        .then(function(response) {
         document.getElementById("uv-index").innerHTML = "UV-Index: " + (response.current.uvi);
         var uviSeverity = response.current.uvi;

         var uviEl = document.getElementById("uv-index");
         if (uviSeverity < 3){
             uviEl.classList.add("uvilow")
           } else if (uviSeverity > 2 && uviSeverity < 6) {
             uviEl.classList.add("uvimedium")
           } else {
             uviEl.classList.add("uvihigh")
           };
        });
         
        

        fetch("https://api.openweathermap.org/data/2.5/forecast?q="+newCity.value+ "&units=imperial&appid=9427e8fb1e4c72e3e0458c62e5a629d6")
        .then(response => response.json())
        .then (function(response) {
       
            document.getElementById("forcast-temp0").innerHTML = "Temp: "+ Number(response.list[0].main.temp).toFixed(0) + "°"
            document.getElementById("forcast-temp1").innerHTML = "Temp: "+ Number(response.list[1].main.temp).toFixed(0) + "°"
            document.getElementById("forcast-temp2").innerHTML = "Temp: "+ Number(response.list[2].main.temp).toFixed(0) + "°"
            document.getElementById("forcast-temp3").innerHTML = "Temp: "+ Number(response.list[3].main.temp).toFixed(0) + "°"
            document.getElementById("forcast-temp4").innerHTML = "Temp: "+ Number(response.list[4].main.temp).toFixed(0) + "°"

            document.getElementById("forcast-wind0").innerHTML = "Wind: "+ Number(response.list[0].wind.speed).toFixed(0) + " mph"
            document.getElementById("forcast-wind1").innerHTML = "Wind: "+ Number(response.list[1].wind.speed).toFixed(0) + " mph"
            document.getElementById("forcast-wind2").innerHTML = "Wind: "+ Number(response.list[2].wind.speed).toFixed(0) + " mph"
            document.getElementById("forcast-wind3").innerHTML = "Wind: "+ Number(response.list[3].wind.speed).toFixed(0) + " mph"
            document.getElementById("forcast-wind4").innerHTML = "Wind: "+ Number(response.list[4].wind.speed).toFixed(0) + " mph"

            document.getElementById("forcast-humidity0").innerHTML = "Humidity: " + (response.list[0].main.humidity) + " %"
            document.getElementById("forcast-humidity1").innerHTML = "Humidity: " + (response.list[1].main.humidity) + " %"
            document.getElementById("forcast-humidity2").innerHTML = "Humidity: " + (response.list[2].main.humidity) + " %"
            document.getElementById("forcast-humidity3").innerHTML = "Humidity: " + (response.list[3].main.humidity) + " %"
            document.getElementById("forcast-humidity4").innerHTML = "Humidity: " + (response.list[4].main.humidity) + " %"

            document.getElementById("forcast-icon0").src = "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon +"@2x.png";
            document.getElementById("forcast-icon1").src = "https://openweathermap.org/img/wn/" + response.list[1].weather[0].icon +"@2x.png";
            document.getElementById("forcast-icon2").src = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon +"@2x.png";
            document.getElementById("forcast-icon3").src = "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon +"@2x.png";
            document.getElementById("forcast-icon4").src = "https://openweathermap.org/img/wn/" + response.list[4].weather[0].icon +"@2x.png";
            
            
          
        });

         
        var date1 = moment().add(1,'days').format('dddd, MMM Do');   
        document.getElementById("forcast-date").innerHTML = date1;

        var date2 = moment().add(2,'days').format('dddd, MMM Do');   
        document.getElementById("forcast-date1").innerHTML = date2;

        var date3 = moment().add(3,'days').format('dddd, MMM Do');   
        document.getElementById("forcast-date2").innerHTML = date3;

        var date4 = moment().add(4,'days').format('dddd, MMM Do');   
        document.getElementById("forcast-date3").innerHTML = date4;

        var date5 = moment().add(5,'days').format('dddd, MMM Do');   
        document.getElementById("forcast-date4").innerHTML = date5;

    });   

};
window.addEventListener("load", function() {
    
    var entry = JSON.parse(localStorage.getItem("searchHistory"))
        
    searchHistory = (entry) ? entry : [];

    
    for (i = 0; i < searchHistory.length; i++) {
        createSearchHistoryBtn(searchHistory[i]);
    }

    if (entry) {
        apiCalls(searchHistory[searchHistory.length - 1]);
    }
})

// var saveSearchHistory = function(newCity){
//     .localStorage.setItem()
// }
var searchHistory = []
function createSearchHistoryBtn(value) {
    
    var newEl = document.createElement("button");
    
    newEl.classList.add("col-8", "mt-4", "btn", "btn-block", "btn-info");
    
    newEl.textContent = value.toUpperCase();

    historyContainer.appendChild(newEl);

    
    newEl.addEventListener("click", function() {
    
        getCity(newEl.textContent.toLowerCase());
    })
}





