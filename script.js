// create variables for search button, city name input, api key, and url

var searchButton = $("#searchButton");
var APIKey = "40ad4d8ec5051c0bfbf49065da1234f5";
var singleTruth = [];
// var weatherIcon = $(".weatherIcon");






// function for when user search for a city and we want the day and time

$("#searchButton").on("click", function (event){
    event.preventDefault();
    var cityName = $("#searched-city").val();
    var rightNow = moment().format("dddd, MMMM-DD-YYYY hh:mm");


// run function
    citySearch(cityName)
});

function citySearch(cityName) {

    console.log(cityName);

    var rightNow = moment().format("dddd, MMMM-DD-YYYY hh:mm");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

// ajax method
$.ajax({
    url:queryURL,
    method: "GET",
}).then(function(response) {
    console.log(queryURL);
    console.log(response);


    singleTruth.push({
        name: searchButton.value
    })


// merge and add to page
localStorage.setItem("singleTruth", JSON.stringify(singleTruth));


// add content for current weather
    $(".name").html("<h1>" + response.name + " Weather Details </h1>" + rightNow);
    
    $(".temp").text("Temperature: " + Math.round(response.main.temp) + " F");
   
    $(".description").text("Description: " + response.weather[0].description);
    $(".feels_like").text("Feels Like: " + Math.round(response.main.feels_like) + " F");
    $(".humidity").text("Humidity: " + response.main.humidity + " %");
    $(".speed").text("Wind Speed: " + response.wind.speed + " MPH");
    $(".sunrise").text("Sunrise: " + response.sys.sunrise);
    $(".sunset").text("Sunset: " + response.sys.sunset);
    $(".weather-icon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");


    // if (response.weather[0].description === "clear sky" || "sunny") {
    //         weatherIcon.src = "images/sunny.png";
    // }
    // else if (response.weather[0].description === "few clouds") {
    //     weatherIcon.src = "images/few_clouds.png";
    // }
    // else if (response.weather[0].description === "scattered clouds") {
    //     weatherIcon.src = "images/scattered_clouds.png";
    // }
    // else if (response.weather[0].description === "broken clouds") {
    //     weatherIcon.src = "images/broken_clouds.png";
    // }
    // else if (response.weather[0].description === "shower rain") {
    //     weatherIcon.src = "images/shower_rain.png";
    // }
    // else if (response.weather[0].description === "rain") {
    //     weatherIcon.src = "images/rain.png";
    // }
    // else if (response.weather[0].description === "thunderstorm") {
    //     weatherIcon.src = "images/thunderstorm.png";
    // }
    // else if (response.weather[0].description === "snow") {
    //     weatherIcon.src = "images/snow.png";
    // }
    // else if (response.weather[0].description === "mist") {
    //     weatherIcon.src = "images/mist.png";
    // }
   

});


}













// send the content to html

// log it in the console