
$(document).ready(function(){

    // // function storeList() {
    //     // Stringify and set "StoreList" key in localStorage to inputListNames array
    //     localStorage.setItem("inputListNames", JSON.stringify(inputListNames));
    // }

    // $("#btn_createList").click(function(){
    //     $.get("http://api.openweathermap.org/data/2.5/forecast?appid=fc321d547053f741cd8a4bb0b95c304a&q=Miami&count=10", function(data, status){
    //       alert("Data: " + data + "\nStatus: " + status);
    //     });
    //   });
    //Search for City and display weather plus 5 day forecast. Append list with new list item and clear search text field.
    $('#btn_createList').on('click',function(){
        event.preventDefault(); 
        var listItem =  $('#input_listName').val();
        console.log(listItem);

        //Add city to list 
        $('.ul_current').append($('<li>', {text: $('#input_listName').val(),
        }));
        ////Store City to local storage
        //function storeList();
        getCurrentWeather();
    });


    var APIKey = 'fc321d547053f741cd8a4bb0b95c304a';
    //Ajax call to OpenWeather API
    function getCurrentWeather(){  
      var citySearch =  $('#input_listName').val();
      var queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q='+citySearch+'&units=imperial&appid='+APIKey;
      $.ajax({
          url: queryURL1, 
        // url: "http://api.openweathermap.org/data/2.5/forecast?appid=fc321d547053f741cd8a4bb0b95c304a&q="+"Baltimore"+"&count=1",
          method: "GET"
      }).then(function(response){
          console.log(response);
          getInfo(response);
          getUv(response);
        });
    }

    function getUV(response){
      var lat = response.city.coord.lat;
      console.log(lat);
      console.log(long);
      var long = response.city.coord.long;
    }
      
      
    //   )var uvURL = 'https://api.openweathermap.org/data/2.5/uvi?lat='37.75'&lon='-122.37'&appid='+APIKey;
    // api.openweathermap.org/data/2.5/uvi/forecast?lat=37.75&lon=-122.37
    //   $.ajax({
    //   url: uvUrl,
    //   method: 'GET'
    // })
    // .then(function(uvData) {

    //   var uvIndex = uvData.value;
    //   var uv = $('<p>');
    //   uv.html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');
    //   console.log(uvIndex);    


    //Display information
    function getInfo(response){

      var cityName = response.city.name;
      // var currentDate = response.list[0].dt_txt;
      var rawDate = new Date((response.city.sunrise) * 1000);
      var d = rawDate.getDate();
      var m = rawDate.getMonth() + 1;
      var y = rawDate.getFullYear();
      var currentDate = (m + '/' + d + '/' + y);
      cityName = $("#localCityName").text(cityName);
      currentDate = $("#localCityDate").text(currentDate);
      //Current Temperature
      var temp = response.list[0].main.temp;
      var humidity = response.list[0].main.humidity;
      var windspd = response.list[0].wind.speed;

      temp = $('#temp').text('Temperature: '+ temp +'°F');
      humidity = $('#humidity').text('Humidity: '+ humidity +'%');
      windspd = $('#windspd').text('Wind Speed: '+ windspd + 'MPH');
    }

});



