function WeatherRenderer(): void {

}

WeatherRenderer.prototype.createWeatherBody = function(clientClickX: number, clientClickY: number, monthName: string, choosedDay: string): void {

    let container: HTMLDivElement = document.createElement("div");
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

    let weatherHeaderContainer: HTMLDivElement = document.createElement("div");
    weatherHeaderContainer.setAttribute("class", "-sv-weather-ui__header");
    container.appendChild(weatherHeaderContainer);

    let weatherHeaderLeft: HTMLDivElement = document.createElement("div");
    weatherHeaderLeft.setAttribute("class", "-sv-weather-ui__header_item");
    weatherHeaderLeft.innerText = "🌝";
    weatherHeaderContainer.appendChild(weatherHeaderLeft);

    let weatherHeaderCenter: HTMLDivElement = document.createElement("div");
    weatherHeaderCenter.setAttribute("class", "-sv-weather-ui__header_date");
    weatherHeaderCenter.innerText = monthName;
    weatherHeaderContainer.appendChild(weatherHeaderCenter);

    let weatherHeaderRight: HTMLDivElement = document.createElement("div");
    weatherHeaderRight.setAttribute("class", "-sv-weather-ui__header_item");
    weatherHeaderRight.innerText = "💨";
    weatherHeaderContainer.appendChild(weatherHeaderRight);

    let weatherDay: HTMLDivElement = document.createElement("div");
    weatherDay.setAttribute("class", "-sv-weather-ui__day");
    weatherDay.innerText = choosedDay;
    container.appendChild(weatherDay);

    let weatherCity: HTMLDivElement = document.createElement("div");
    weatherCity.setAttribute("class", "-sv-weather-ui__city");
    weatherCity.innerText = "☃ Mahilyow ☃";
    container.appendChild(weatherCity);

    let weatherDescriptionContainer: HTMLDivElement = document.createElement("div");
    weatherDescriptionContainer.setAttribute("class", "-sv-weather-ui__description");
    container.appendChild(weatherDescriptionContainer);

    let weatherSummary: HTMLDivElement = document.createElement("div");
    weatherSummary.setAttribute("class", "-sv-weather-ui__summary");
    weatherDescriptionContainer.appendChild(weatherSummary);

    let weatherMaxTemperature: HTMLDivElement = document.createElement("div");
    weatherMaxTemperature.setAttribute("class", "-sv-weather-ui__max-temperature");
    weatherDescriptionContainer.appendChild(weatherMaxTemperature);

    let weatherMinTemperature: HTMLDivElement = document.createElement("div");
    weatherMinTemperature.setAttribute("class", "-sv-weather-ui__min-temperature");
    weatherDescriptionContainer.appendChild(weatherMinTemperature);

    let weatherWindSpeed: HTMLDivElement = document.createElement("div");
    weatherWindSpeed.setAttribute("class", "-sv-weather-ui__wind-speed");
    weatherDescriptionContainer.appendChild(weatherWindSpeed);

}

WeatherRenderer.prototype.insertWeatherData = function(obj): void {

    if(obj == undefined) {
        let summary = <HTMLElement> document.querySelector(".-sv-weather-ui__summary");
        summary.innerText = "Service is unavailable at the moment";
    } else {
        let summary = <HTMLElement> document.querySelector(".-sv-weather-ui__summary");
        summary.innerText = obj.daily.data[0].summary;

        let maxTemperature = <HTMLElement> document.querySelector(".-sv-weather-ui__max-temperature");
        maxTemperature.innerText = "Highest temperature (°C): " + obj.daily.data[0].temperatureMax;

        let minTemperature = <HTMLElement> document.querySelector(".-sv-weather-ui__min-temperature");
        minTemperature.innerText = "Lowest temperature (°C): " + obj.daily.data[0].temperatureMin;

        let windSpeed = <HTMLElement> document.querySelector(".-sv-weather-ui__wind-speed");
        windSpeed.innerText = "Wind speed (kts): " + obj.daily.data[0].windSpeed;          
    }
}