// create variables for search button, city name input, api key, and url
$(document).ready(function () {
  // $("#searchButton").on("click", function() {
  var searchButton = $("#searchButton");
  var APIKey = "40ad4d8ec5051c0bfbf49065da1234f5";
  // var singleTruth = [];
  // var weatherIcon = $(".weatherIcon");

  // function for when user search for a city and we want the day and time

  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#searched-city").val();
    var rightNow = moment().format("dddd, MMMM-DD-YYYY hh:mm");

    // run function
    citySearch(cityName);
  });

  function citySearch(cityName) {
    console.log(cityName);

    var rightNow = moment().format("dddd, MMMM-DD-YYYY hh:mm");

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      APIKey +
      "&units=imperial";

    // ajax method
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);

      // // merge and add to page
      // localStorage.setItem("singleTruth", JSON.stringify(singleTruth));

      // add content for current weather
      $(".name").html(
        "<h1>" + response.name + " Weather Details </h1>" + rightNow
      );

      $(".temp").text("Temperature: " + Math.round(response.main.temp) + " F");

      $(".description").text("Description: " + response.weather[0].description);
      $(".feels_like").text(
        "Feels Like: " + Math.round(response.main.feels_like) + " F"
      );
      $(".humidity").text("Humidity: " + response.main.humidity + " %");
      $(".speed").text("Wind Speed: " + response.wind.speed + " MPH");

      $(".weather-icon").attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );

      // call 5 day forecast

      getForecast(cityName);

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

  function getForecast(cityName) {
    var queryURL2 =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=" +
      APIKey +
      "&units=imperial";

    $.ajax({
      url: queryURL2,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL2);
      console.log(response);

      // create div in html

      $("#forecast")
        .html('<h4 class="md-3 title">5-Day Forecast:</h4>')
        .append('<div class="row row-cols-1 row-cols-md-5 g-4">');

      for (var i = 0; i < response.list.length; i++) {
        // console.log(response.list);

        if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          console.log(response.list[i].dt_txt);

          // another single truth?

          // create html elements is easier
          var col = $("<div>").addClass("row-cols-1");
          var card = $("<div>").addClass("card forecastCard");
          var body = $("<div>").addClass("card-body");
          var title = $("<p>")
            .addClass("forecastDeets")
            .text("Date: " + response.list[i].dt_txt);

          var icon = $("<img>")
            .addClass("weather-icon")
            .attr(
              "src",
              "https://openweathermap.org/img/wn/" +
                response.list[i].weather[0].icon +
                "@2x.png"
            );
          var p1 = $("<p>")
            .addClass("forecastTemp")
            .text(
              "Temperature: " + Math.round(response.list[i].main.temp) + " F"
            );
          var p2 = $("<p>")
            .addClass("forecastHumid")
            .text("Humidity: " + response.list[i].main.humidity + " %");

         

          col.append(card.append(body.append(title, icon, p1, p2)));
          $("#forecast .row").append(col);
        }
      }
    });

   
  }
});


