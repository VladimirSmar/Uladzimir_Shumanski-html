function WeatherService() {

}

WeatherService.prototype.getWeatherData = function(weatherDate, callback) {
    var xhr = new XMLHttpRequest();
    var url = "api/weather?choosedDate=" + weatherDate;
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);

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