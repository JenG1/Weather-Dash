
$(document).ready(function () {


  $('#btn_createList').on('click', function () {
    event.preventDefault();
    //Add city to list 
    $('.ul_current').append($('<li>', {
      text: $('#input_listName').val(),
    }));
    getCurrentWeather();

  });

  var APIKey = 'fc321d547053f741cd8a4bb0b95c304a';
  //Ajax call to OpenWeather API
  function getCurrentWeather() {
    var citySearch = $('#input_listName').val();
    var queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearch + '&units=imperial&appid=' + APIKey;

    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function (response) {
      getInfo(response);
    });
  }

  //Display information
  function getInfo(response) {

    var cityName = response.city.name;
    // var currentDate = response.list[0].dt_txt;
    var rawDate = new Date((response.city.sunrise) * 1000);
    var d = rawDate.getDate();
    var m = rawDate.getMonth() + 1;
    var y = rawDate.getFullYear();
    var currentDate = (m + '/' + d + '/' + y);
    cityName = $("#localCityName").text(cityName);
    currentDate = $("#localCityDate").text("("+currentDate+")");
    //Current Temperature
    var temp = response.list[0].main.temp;
    var humidity = response.list[0].main.humidity;
    var windspd = response.list[0].wind.speed;

    temp = $('#temp').text('Temperature: ' + temp + '°F');
    humidity = $('#humidity').text('Humidity: ' + humidity + '%');
    windspd = $('#windspd').text('Wind Speed: ' + windspd + 'MPH');
    //Weather Icon
    var weatherIcon = $('#weatherIcon');
    iconSrc = 'http://openweathermap.org/img/wn/' + response.list[0].weather[0].icon + '@2x.png';
    weatherIcon.attr('src', iconSrc);

    // Coordinates for UV API call
    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
    var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;
    // UV
    $.ajax({
      url: uvUrl,
      method: 'GET'
      })
      .then(function(uvData) {
      var uvIndex = uvData.value;
      var uv = $('#uv');
      uv.html(" "+uvIndex);
      if (uvIndex >= 0 && uvIndex <= 3) {
          $(uv).addClass('lowUV');
      } else if (uvIndex > 3 && uvIndex <= 6) {
          $(uv).addClass('medUV');
      } else if (uvIndex > 6) {
          $(uv).addClass('highUV')
      }
    })
  }
  
});



