function WeatherFormatter() {

}

WeatherFormatter.prototype.getWeatherData = function(weatherDate, callback) {
    var xhr = new XMLHttpRequest();
    var url = "api/weatherApi?choosedDate=" + weatherDate;
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            console.log(response);

            if(callback) {
                callback(response);
            }
            } else {
            console.error(xhr.responseText);
            }
        }
    };
}