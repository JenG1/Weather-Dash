$(document).ready(function() {
    var cityEl = $('#cityDiv');
    var searchF = $('#searchForm');
    var searchB = $('#searchBar');
    var historyEl = $('#history');
    var firstCard = $('#card1');
    var secondCard = $('#card2');
    var thirdCard = $('#card3');
    var fourthCard = $('#card4');
    var fifthCard = $('#card5');
    var citiesList = [];

    var cityQ = '';
    var btn = $('#btnn');
    var APIKey = 'fc321d547053f741cd8a4bb0b95c304a'; 


    function clearDivs() {
        firstCard.empty();
        secondCard.empty();
        thirdCard.empty();
        fourthCard.empty();
        fifthCard.empty();
    }

    function clearHistory() {
        historyEl.empty();
        cityEl.empty();
        firstCard.empty();
        secondCard.empty();
        thirdCard.empty();
        fourthCard.empty();
        fifthCard.empty();

        console.log(localStorage);
        localStorage.clear();
        console.log(localStorage);

    }

    function currentWeather() {
        var queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQ + '&units=imperial&appid=' + APIKey;
        // Weather API
        $.ajax({
                url: queryURL1,
                method: 'GET'
            })
            .then(function(data) {

                cityEl.empty();

                var city = $('<div>');
                var rawDate = new Date((data.city.sunrise) * 1000);
                var d = rawDate.getDate();
                var m = rawDate.getMonth() + 1;
                var y = rawDate.getFullYear();
                var date = (m + '/' + d + '/' + y);

                city.html('<h1 id="cityName"> ' + data.city.name + ' ' + date + '</h1>');
                cityEl.append(city);

                var lat = data.city.coord.lat;
                var lon = data.city.coord.lon;
                var uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

                var temp = $('<div>');
                temp.html('<p>Current Temperature: ' + data.list[0].main.temp + '&#8457</p>');
                temp.addClass('cityPg');
                cityEl.append(temp);

                var humidity = $('<p>').text('Humidity: ' + data.list[0].main.humidity + '%');
                humidity.addClass('cityPg');
                cityEl.append(humidity);

                var wind = $('<p>').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');
                wind.addClass('cityPg');
                cityEl.append(wind);
                var counter = 1;

                for (var i = 3; i < data.list.length; i += 8) {

                    var weatherCard = $("div[data-count='" + counter + "']");
                    var rawDate = new Date((data.list[i].dt) * 1000);
                    var d = rawDate.getDate();
                    var m = rawDate.getMonth() + 1;
                    var y = rawDate.getFullYear();
                    var date = (m + '/' + d + '/' + y);
                    var dateEl = $('<h5>');
                    dateEl.text(date);
                    weatherCard.append(dateEl);
                    var weatherBlockTemp = $('<div>');
                    weatherBlockTemp.html('<p>' + data.list[i].main.temp + '&#8457</p>');
                    weatherCard.append(weatherBlockTemp);
                    var weatherIcon = $('<img>');
                    iconSrc = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
                    weatherIcon.attr('src', iconSrc);
                    weatherIcon.attr('width', '60px');
                    weatherIcon.attr('height', '60px')
                    weatherCard.append(weatherIcon);
                    var humidity2 = $('<p>').text('Humidity: ' + data.list[i].main.humidity + ' %');
                    weatherCard.append(humidity2);
                    counter += 1;
                }
                // UV
                $.ajax({
                        url: uvUrl,
                        method: 'GET'
                    })
                    .then(function(uvData) {

                        var uvIndex = uvData.value;
                        var uv = $('<p>');
                        uv.html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');


                        if (uvIndex >= 0 && uvIndex <= 3) {
                            $(uv).addClass('lowUV');
                        } else if (uvIndex > 3 && uvIndex <= 6) {
                            $(uv).addClass('medUV');
                        } else if (uvIndex > 6) {
                            $(uv).addClass('highUV')
                        }
                        cityEl.append(uv);
                    })

            })


    }

    function search() {
        event.preventDefault();
        cityQ = searchB.val();

        if (cityQ !== '') {
            clearDivs();
            currentWeather();
            renderWeather();

        }
    }

    function renderWeather() {
        historyLink = $('<div>');
        historyText = '<p onclick="currentWeather"> ' + cityQ + '</p>';
        // Save city name to storage
        citiesList.push(historyText);
        console.log(historyText);

        localStorage.setItem('cities', JSON.stringify(historyText));
        historyLink.append(historyText);
        historyLink.attr('data-city', cityQ);
        historyLink.addClass('historyBtn');
        historyEl.append(historyLink);
    }

    searchF.on('submit', search);

    btn.on('click', function() {
        clearHistory();


    });
});


