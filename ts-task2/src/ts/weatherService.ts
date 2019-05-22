interface IWeatherData {
    latitude: number,
    longtitude: number,
    timezone: string,
    daily: { data: Array< {
        summary: string,
        temperatureMax: number,
        temperatureMin: number,
        windSpeed: number 
    } > },
    offset: number
}

class WeatherService{

    constructor() {}

    getWeatherData = function(weatherDate: string, callback: Function): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        let url: string = "api/weather?choosedDate=" + weatherDate;
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                let response: IWeatherData = JSON.parse(xhr.response) as IWeatherData;
    
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
}