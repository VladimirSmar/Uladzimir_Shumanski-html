function WeatherRenderer() {

}

WeatherRenderer.prototype.createWeatherBody = function(clientClickX, clientClickY, monthName, choosedDay) {

    var container = document.createElement("div");
    container.setAttribute("class", "-sv-weather-ui");
    container.style.position = "absolute";
    container.style.top = clientClickY + 10 + "px";
    container.style.left = clientClickX + 10 + "px";
    container.style.width = "325px";
    container.style.border = "3px black solid";
    container.style.backgroundImage = "url('src/flower.jpg')";
    container.style.backgroundPosition = "center";
    container.style.backgroundSize = "cover";
    container.style.color = "white";
    document.body.appendChild(container);

    var weatherHeaderContainer = document.createElement("div");
    weatherHeaderContainer.setAttribute("class", "-sv-weather-ui__header");
    container.appendChild(weatherHeaderContainer);

    var weatherHeaderLeft = document.createElement("div");
    weatherHeaderLeft.setAttribute("class", "-sv-weather-ui__header_item");
    weatherHeaderLeft.innerText = "🌝";
    weatherHeaderContainer.appendChild(weatherHeaderLeft);

    var weatherHeaderCenter = document.createElement("div");
    weatherHeaderCenter.setAttribute("class", "-sv-weather-ui__header_date");
    weatherHeaderCenter.innerText = monthName;
    weatherHeaderContainer.appendChild(weatherHeaderCenter);

    var weatherHeaderRight = document.createElement("div");
    weatherHeaderRight.setAttribute("class", "-sv-weather-ui__header_item");
    weatherHeaderRight.innerText = "💨";
    weatherHeaderContainer.appendChild(weatherHeaderRight);

    var weatherDay = document.createElement("div");
    weatherDay.setAttribute("class", "-sv-weather-ui__day");
    weatherDay.innerText = choosedDay;
    container.appendChild(weatherDay);

    var weatherCity = document.createElement("div");
    weatherCity.setAttribute("class", "-sv-weather-ui__city");
    weatherCity.innerText = "☃ Mahilyow ☃";
    container.appendChild(weatherCity);

    var weatherDescriptionContainer = document.createElement("div");
    weatherDescriptionContainer.setAttribute("class", "-sv-weather-ui__description");
    container.appendChild(weatherDescriptionContainer);

    var weatherSummary = document.createElement("div");
    weatherSummary.setAttribute("class", "-sv-weather-ui__summary");
    weatherDescriptionContainer.appendChild(weatherSummary);

    var weatherMaxTemperature = document.createElement("div");
    weatherMaxTemperature.setAttribute("class", "-sv-weather-ui__max-temperature");
    weatherDescriptionContainer.appendChild(weatherMaxTemperature);

    var weatherMinTemperature = document.createElement("div");
    weatherMinTemperature.setAttribute("class", "-sv-weather-ui__min-temperature");
    weatherDescriptionContainer.appendChild(weatherMinTemperature);

    var weatherWindSpeed = document.createElement("div");
    weatherWindSpeed.setAttribute("class", "-sv-weather-ui__wind-speed");
    weatherDescriptionContainer.appendChild(weatherWindSpeed);

}

WeatherRenderer.prototype.insertWeatherData = function(obj) {

    if(obj == undefined) {
        var summary = document.querySelector(".-sv-weather-ui__summary");
        summary.innerText = "Service is unavailable at the moment";
    } else {
        var summary = document.querySelector(".-sv-weather-ui__summary");
        summary.innerText = obj.daily.data[0].summary;

        var maxTemperature = document.querySelector(".-sv-weather-ui__max-temperature");
        maxTemperature.innerText = "Highest temperature (°C): " + obj.daily.data[0].temperatureMax;

        var minTemperature = document.querySelector(".-sv-weather-ui__min-temperature");
        minTemperature.innerText = "Lowest temperature (°C): " + obj.daily.data[0].temperatureMin;

        var windSpeed = document.querySelector(".-sv-weather-ui__wind-speed");
        windSpeed.innerText = "Wind speed (kts): " + obj.daily.data[0].windSpeed;          
    }
}