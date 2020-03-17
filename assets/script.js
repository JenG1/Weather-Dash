$(document).ready(function() {
    let city = $('#cityDiv');
    let searchF = $('#searchForm');
    let searchB = $('#searchBar');
    let historyEl = $('#history');
    let firstCard = $('#card1');S
    let secondCard = $('#card2');
    let thirdCard = $('#card3');
    let fourthCard = $('#card4');
    let fifthCard = $('#card5');
    let citiesList = [];
    let cityQ = '';
    let btn = $('#btnn');
    let APIKey = 'fc321d547053f741cd8a4bb0b95c304a'; 

    function clearDivs() {
        firstCard.empty();
        secondCard.empty();
        thirdCard.empty();
        fourthCard.empty();
        fifthCard.empty();
    }

    function clearHistory() {
        historyEl.empty();
        city.empty();
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
        let queryURL1 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityQ + '&units=imperial&appid=' + APIKey;
        // Weather API
        $.ajax({
                url: queryURL1,
                method: 'GET'
            })
            .then(function(data) {

                city.empty();

                let city = $('<div>');
                let rawDate = new Date((data.city.sunrise) * 1000);
                let d = rawDate.getDate();
                let m = rawDate.getMonth() + 1;
                let y = rawDate.getFullYear();
                let date = (m + '/' + d + '/' + y);

                city.html('<h1 id="cityName"> ' + data.city.name + ' ' + date + '</h1>');
                city.append(city);

                let lat = data.city.coord.lat;
                let lon = data.city.coord.lon;
                let uvUrl = 'https://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

                let temp = $('<div>');
                temp.html('<p>Current Temperature: ' + data.list[0].main.temp + '&#8457</p>');
                temp.addClass('cityPg');
                city.append(temp);

                let humidity = $('<p>').text('Humidity: ' + data.list[0].main.humidity + '%');
                humidity.addClass('cityPg');
                city.append(humidity);

                let wind = $('<p>').text('Wind Speed: ' + data.list[0].wind.speed + ' MPH');
                wind.addClass('cityPg');
                city.append(wind);
                let counter = 1;

                for (let i = 3; i < data.list.length; i += 8) {

                    let weatherCard = $("div[data-count='" + counter + "']");
                    let rawDate = new Date((data.list[i].dt) * 1000);
                    let d = rawDate.getDate();
                    let m = rawDate.getMonth() + 1;
                    let y = rawDate.getFullYear();
                    let date = (m + '/' + d + '/' + y);
                    let dateEl = $('<h5>');
                    dateEl.text(date);
                    weatherCard.append(dateEl);
                    let weatherBlockTemp = $('<div>');
                    weatherBlockTemp.html('<p>' + data.list[i].main.temp + '&#8457</p>');
                    weatherCard.append(weatherBlockTemp);
                    let weatherIcon = $('<img>');
                    iconSrc = 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
                    weatherIcon.attr('src', iconSrc);
                    weatherIcon.attr('width', '60px');
                    weatherIcon.attr('height', '60px')
                    weatherCard.append(weatherIcon);
                    let humidity2 = $('<p>').text('Humidity: ' + data.list[i].main.humidity + ' %');
                    weatherCard.append(humidity2);
                    counter += 1;
                }
                // UV
                $.ajax({
                        url: uvUrl,
                        method: 'GET'
                    })
                    .then(function(uvData) {

                        let uvIndex = uvData.value;
                        let uv = $('<p>');
                        uv.html('UV Index: <span id="uvSpan">' + uvIndex + '</span>');

                        if (uvIndex >= 0 && uvIndex <= 3) {
                            $(uv).addClass('lowUV');
                        } else if (uvIndex > 3 && uvIndex <= 6) {
                            $(uv).addClass('medUV');
                        } else if (uvIndex > 6) {
                            $(uv).addClass('highUV')
                        }
                        city.append(uv);
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


