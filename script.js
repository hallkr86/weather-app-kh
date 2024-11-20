// create variables for search button, city name input, api key, and url
$(document).ready(function () {
  
  var searchButton = $("#searchButton");
  var APIKey = "40ad4d8ec5051c0bfbf49065da1234f5";


  // function for when user search for a city and we want the day and time

  $("#searchButton").on("click", function (event) {
    event.preventDefault();
    var cityName = $("#searched-city").val();
    var rightNow = moment().format("dddd, MMMM-DD-YYYY hh:mm");

    // run function
    citySearch(cityName);
  });

  $(".history").on("click", "li", function() {
    citySearch($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

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


      

        makeRow(cityName);
     

      $("#today").empty();
      
   


      // add content for current weather
      var title = $("<h1>").addClass("card-title").html(response.name + " </h1>" + rightNow
      );
      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var temp = $("<p>").addClass("card-text").text("Temperature: " + Math.round(response.main.temp) + " F");

      
      var feelsLike = $("<p>").addClass("card-text").text(
        "Feels Like: " + Math.round(response.main.feels_like) + " F"
      );

      var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity + " %");
      var windSpeed = $("<p>").addClass("card-text").text("Wind Speed: " + response.wind.speed + " MPH");

      var image = $("<img>").attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png"
      );


      title.append(image);
      cardBody.append(title, temp, feelsLike, humid, windSpeed);
      card.append(cardBody);
      $("#today").append(card);
      // call 5 day forecast

      getForecast(cityName);

      // UVIndex is no longer free. I have to pay
      // getUVIndex(response.coord.lat, response.coord.lon);

     
 
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

          

          // create html elements is easier
          var col = $("<div>").addClass("col-md-2");
          var card = $("<div>").addClass("card forecastCard");
          var body = $("<div>").addClass("card-body p-2");
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

  // cost money to include a uv index api now
    // function getUVIndex(lat, lon) {
    //   var queryURL3 =
    //     "https://api.openweathermap.org/data/3.0/onecall?lat=" +lat+ "&lon=" +lon +
      
    //     "&appid=" +
    //     APIKey;
  
    //   $.ajax({
    //     url: queryURL3,
    //     method: "GET",
    //   }).then(function (response) {
    //     console.log(queryURL3);
    //     console.log(response);

    //     var uv = $("<p>").text("UV Index: ");
    //     var btn = $("<span>").addClass("btn btn-sm").text(response.coord);


        // if (data.value < 3) {
        //   btn.addClass("btn-success");
        // }
        // else if (data.value < 7) {
        //   btn.addClass("btn-warning");
        // }
        // else {
        //   btn.addClass("btn-danger");
        // }
        
        // $("#today .card-body").append(uv.append(btn));
    //   })
    // };

  var history = JSON.parse(window.localStorage.getItem("history")) || [];

  if (history.length > 0) {
    citySearch(history[history.length-1]);
  }

  for (var i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
   
  }
});


