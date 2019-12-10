
$(document).ready(function () {


  $('#btn_createList').on('click', function () {
    event.preventDefault();
    //Add city to list 
    $('.ul_current').append($('<li>', {
      text: $('#input_listName').val(),
    }));
    getCurrentWeather();

  });

  var APIKEY = 'fc321d547053f741cd8a4bb0b95c304a';
  //Ajax call to OpenWeather API
  function getCurrentWeather() {
    var citySearch = $('#input_listName').val();
    var queryURL1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&units=imperial&appid=' + APIKEY;
    $.ajax({
      url: queryURL1,
      method: "GET"
    }).then(function (response) {
      getInfo(response);
    });
  }

  //Display information
  function getInfo(response) {
    var cityName = response.name;
    var rawDate = new Date((response.sys.sunrise) * 1000);
    var d = rawDate.getDate();
    var m = rawDate.getMonth() + 1;
    var y = rawDate.getFullYear();
    var currentDate = (m + '/' + d + '/' + y);
    cityName = $("#localCityName").text(cityName);
    currentDate = $("#localCityDate").text("(" + currentDate + ")");
    //Current Temperature
    var temp = Math.round(response.main.temp);
    //Current Humidity
    var humidity = response.main.humidity;
    //Current Wind Speed
    var windspd = response.wind.speed;

    temp = $('#temp').text('Temperature: ' + temp + '°F');
    humidity = $('#humidity').text('Humidity: ' + humidity + '%');
    windspd = $('#windspd').text('Wind Speed: ' + windspd + ' MPH');
    //Weather Icon
    var weatherIcon = $('#weatherIcon');
    iconSrc = 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png';
    weatherIcon.attr('src', iconSrc);
    weatherIcon.attr('width', '60px');
    weatherIcon.attr('height', '60px');

    // Coordinates for UV API call
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKEY + '&lat=' + lat + '&lon=' + lon;
    // UV
    $.ajax({
      url: uvUrl,
      method: 'GET'
    })
      .then(function (uvData) {
        var uvIndex = uvData.value;
        var uv = $('#uv');
        uv.html(" " + uvIndex);
        if (uvIndex >= 0 && uvIndex <= 3) {
          $(uv).addClass('lowUV');
        } else if (uvIndex > 3 && uvIndex <= 6) {
          $(uv).addClass('medUV');
        } else if (uvIndex > 6) {
          $(uv).addClass('highUV')
        }
      })
    //5 -Day Weather Forecast
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY;
    // UV
    $.ajax({
      url: forecastUrl,
      method: 'GET'
    })
      .then(function (forecastData) {
        console.log(forecastData);
        //Forecast Date 1
        var rawDate1 = new Date((forecastData.list[0].dt) * 1000);
        var d1 = rawDate1.getDate();
        var m1 = rawDate1.getMonth() + 1;
        var y1 = rawDate1.getFullYear();
        var date1 = (m1 + '/' + d1 + '/' + y1);
        date1 = $("#day-1").text(date1);
        //Forecast Date 2
        var rawDate2 = new Date((forecastData.list[8].dt) * 1000);
        var d2 = rawDate2.getDate();
        var m2 = rawDate2.getMonth() + 1;
        var y2 = rawDate2.getFullYear();
        var date2 = (m2 + '/' + d2 + '/' + y2);
        date2 = $("#day-2").text(date2);
        //Forecast Date 3
        var rawDate3 = new Date((forecastData.list[16].dt) * 1000);
        var d3 = rawDate3.getDate();
        var m3 = rawDate3.getMonth() + 1;
        var y3 = rawDate3.getFullYear();
        var date3 = (m3 + '/' + d3 + '/' + y3);
        date3 = $("#day-3").text(date3);
        //Forecast Date 4
        var rawDate4 = new Date((forecastData.list[24].dt) * 1000);
        var d4 = rawDate4.getDate();
        var m4 = rawDate4.getMonth() + 1;
        var y4 = rawDate4.getFullYear();
        var date4 = (m4 + '/' + d4 + '/' + y4);
        date4 = $("#day-4").text(date4);
        //Forecast Date 5
        var rawDate5 = new Date((forecastData.list[32].dt) * 1000);
        var d5 = rawDate5.getDate();
        var m5 = rawDate5.getMonth() + 1;
        var y5 = rawDate5.getFullYear();
        var date5 = (m5 + '/' + d5 + '/' + y5);
        date5 = $('#day-5').text(date5);
        //Weather Icon Day One
        var weatherIcon1 = $('#day-1-icon');
        iconSrc = 'http://openweathermap.org/img/wn/' + forecastData.list[0].weather[0].icon + '@2x.png';
        weatherIcon1.attr('src', iconSrc);
        weatherIcon1.attr('width', '30px');
        weatherIcon1.attr('height', '30px');
        var tempKelvin1 = forecastData.list[0].main.temp;
        var temp1 = Math.round((tempKelvin1 - 273.15) * 9 / 5 + 32);
        console.log(temp1);
        temp1 = $('#temp1').text('Temp: ' + temp1 + '°F');
        var humidity1 = forecastData.list[0].main.humidity;
        humidity1 = $('#humidity1').text('Humidity: ' + humidity1 + '%');
        //Weather Icon Day Two
        var weatherIcon2 = $('#day-2-icon');
        iconSrc = 'http://openweathermap.org/img/wn/' + forecastData.list[8].weather[0].icon + '@2x.png';
        weatherIcon2.attr('src', iconSrc);
        weatherIcon2.attr('width', '30px');
        weatherIcon2.attr('height', '30px');
        var tempKelvin2 = forecastData.list[8].main.temp;
        var temp2 = Math.round((tempKelvin2 - 273.15) * 9 / 5 + 32);
        console.log(temp2);
        temp2 = $('#temp2').text('Temp: ' + temp2 + '°F');
        var humidity2 = forecastData.list[8].main.humidity;
        humidity2 = $('#humidity2').text('Humidity: ' + humidity2 + '%');
        //Weather Icon Day Three
        var weatherIcon3 = $('#day-3-icon');
        iconSrc = 'http://openweathermap.org/img/wn/' + forecastData.list[16].weather[0].icon + '@2x.png';
        weatherIcon3.attr('src', iconSrc);
        weatherIcon3.attr('width', '30px');
        weatherIcon3.attr('height', '30px');
        var tempKelvin3 = forecastData.list[16].main.temp;
        var temp3 = Math.round((tempKelvin3 - 273.15) * 9 / 5 + 32);
        console.log(temp3);
        temp3 = $('#temp3').text('Temp: ' + temp3 + '°F');
        var humidity3 = forecastData.list[16].main.humidity;
        humidity3 = $('#humidity3').text('Humidity: ' + humidity3 + '%');
        //Weather Icon Day Four
        var weatherIcon4 = $('#day-4-icon');
        iconSrc = 'http://openweathermap.org/img/wn/' + forecastData.list[24].weather[0].icon + '@2x.png';
        weatherIcon4.attr('src', iconSrc);
        weatherIcon4.attr('width', '30px');
        weatherIcon4.attr('height', '30px');
        var tempKelvin4 = forecastData.list[24].main.temp;
        var temp4 = Math.round((tempKelvin4 - 273.15) * 9 / 5 + 32);
        console.log(temp4);
        temp4 = $('#temp4').text('Temp: ' + temp4 + '°F');
        var humidity4 = forecastData.list[24].main.humidity;
        humidity4 = $('#humidity4').text('Humidity: ' + humidity4 + '%');
        //Weather Icon Day Five
        var weatherIcon5 = $('#day-5-icon');
        iconSrc = 'http://openweathermap.org/img/wn/' + forecastData.list[32].weather[0].icon + '@2x.png';
        weatherIcon5.attr('src', iconSrc);
        weatherIcon5.attr('width', '30px');
        weatherIcon5.attr('height', '30px');
        var tempKelvin5 = forecastData.list[32].main.temp;
        var temp5 = Math.round((tempKelvin5 - 273.15) * 9 / 5 + 32);
        console.log(temp5);
        temp5 = $('#temp5').text('Temp: ' + temp5 + '°F');
        var humidity5 = forecastData.list[32].main.humidity;
        humidity5 = $('#humidity5').text('Humidity: ' + humidity5 + '%');
      });
  }

});



