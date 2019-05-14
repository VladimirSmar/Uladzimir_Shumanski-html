function WeatherService(): void {

}

WeatherService.prototype.getWeatherData = function(weatherDate, callback): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    let url: string = "api/weather?choosedDate=" + weatherDate;
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            let response: object = JSON.parse(xhr.response);

            if(callback) {
                callback(response);
            }
            
            } else {
            console.error(xhr.responseText);
            callback();
            }
        }
    };
}