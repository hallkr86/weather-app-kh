// create variables for search button, city name input, api key, and url

var searchButton = $("#searchButton");
var APIKey = "40ad4d8ec5051c0bfbf49065da1234f5";
var singleTruth = [];




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
    $(".name").html("<h1>" + response.name + "Weather Details </h1>" + rightNow);
    $(".temperature").text("Temperature: " + response.main.temp);
    $(".description").text("Description: " + response.weather[0].description);
    $(".feel_like").text("Feels Like: " + response.main.feel_like);
    $(".humidity").text("Humidity: " + response.main.humidity);
    $(".speed").text("Wind Speed: " + response.wind.speed);
    $(".sunrise").text("Sunrise: " + response.sys.sunrise);
    $(".sunset").text("Sunset: " + response.sys.sunset);



});


}













// send the content to html

// log it in the console