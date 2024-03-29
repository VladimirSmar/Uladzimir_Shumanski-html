function Handlers() {

}

Handlers.prototype.setHandlers = function(calendar, view, calendarRenderer) {

    function previousMonthClickHandler() {
        var previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];

        calendar.setPreviousMonth();
        calendarRenderer._updateCalendar(calendar, view);

        if (previousWeatherLayout) {
            previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
        }
    }

    function currentMonthClickHandler() {
        var previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];

        calendar.setCurrentMonth();
        calendarRenderer._updateCalendar(calendar, view);

        if (previousWeatherLayout) {
            previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
        }
    }

    function nextMonthClickHandler() {
        var previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];

        calendar.setNextMonth();
        calendarRenderer._updateCalendar(calendar, view);

        if (previousWeatherLayout) {
            previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
        }
    }

    function createWeatherLayout(event) {

        var weather = new WeatherService();
        var weatherView = new WeatherRenderer();

        var choosedElement = event.target;
        var previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];

        if (choosedElement.classList.contains("-sv-datepicker__day")) {
            if (choosedElement.classList.contains("-sv-datepicker__day_choosed") && previousWeatherLayout) {
                previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
            } else {
                var choosedElementDay = choosedElement.innerText;
                if (+choosedElementDay < 10) {
                    choosedElementDay = "0" + choosedElementDay;
                }
                var calendarDate = calendar.getCalendarDate().toISOString().slice(0, -5);
                var choosedDate = calendarDate.substr(0, 8) + choosedElementDay + calendarDate.substr(10);

                if (previousWeatherLayout) {
                    previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                    weatherView.createWeatherBody(event.clientX, event.clientY, calendar.getMonthName(), choosedElementDay);
                    weather.getWeatherData(choosedDate, weatherView.insertWeatherData);
                } else {
                    weatherView.createWeatherBody(event.clientX, event.clientY, calendar.getMonthName(), choosedElementDay);
                    weather.getWeatherData(choosedDate, weatherView.insertWeatherData);
                }
            }
        }

    }

    function chooseMonthDayHandler(event) {
        var calendarDaysBody = document.querySelector(".-sv-datepicker__days-block");
        var choosedElement = event.target;
        var previousChoosedElement = calendarDaysBody.getElementsByClassName("-sv-datepicker__day_choosed")[0];

        if (choosedElement.classList.contains("-sv-datepicker__day")) {
            if (choosedElement.classList.contains("-sv-datepicker__day_choosed")) {
                choosedElement.classList.remove("-sv-datepicker__day_choosed");
            } else if (previousChoosedElement !== undefined) {
                previousChoosedElement.classList.remove("-sv-datepicker__day_choosed");
                choosedElement.classList.add("-sv-datepicker__day_choosed");
            } else {
                choosedElement.classList.add("-sv-datepicker__day_choosed");
            }
        }
    }

    var buttonPrevMonth = document.querySelector(".-sv-datepicker__prev-month");
    buttonPrevMonth.addEventListener("click", previousMonthClickHandler);

    var buttonCurrentMonth = document.querySelector(".-sv-datepicker__current-month");
    buttonCurrentMonth.addEventListener("click", currentMonthClickHandler);

    var buttonNextMonth = document.querySelector(".-sv-datepicker__next-month");
    buttonNextMonth.addEventListener("click", nextMonthClickHandler);

    var buttonChooseMonthDay = document.querySelector(".-sv-datepicker__days-block");
    buttonChooseMonthDay.addEventListener("click", createWeatherLayout);
    buttonChooseMonthDay.addEventListener("click", chooseMonthDayHandler);
    
}