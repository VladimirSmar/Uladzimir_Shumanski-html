var calendar = new Calendar();

var view = new DatepickerRenderer();

var weather = new WeatherFormatter();

var weatherView = new WeatherRenderer();

view.createBody();
view.drawMonth(calendar.getMonthName());
view.drawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
setHandlers();


function setHandlers() {

    function previousMonthClickHandler() {
        calendar.setPreviousMonth();
        view.drawMonth(calendar.getMonthName());
        view.drawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function currentMonthClickHandler() {
        calendar.setCurrentMonth();
        view.drawMonth(calendar.getMonthName());
        view.drawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function nextMonthClickHandler() {
        calendar.setNextMonth();
        view.drawMonth(calendar.getMonthName());
        view.drawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function createWeatherLayout() {
        var choosedElement = event.target;
        var previousWeatherLayout = document.body.getElementsByClassName("sv-weather-layout")[0];

        if(choosedElement.classList.contains("sv-datepicker__day")) {
            var choosedElementDay = choosedElement.innerText;
            if (+choosedElementDay < 10) {
                choosedElementDay = "0" + choosedElementDay;
            }
            var calendarDate = calendar.getCalendarDate().toISOString().slice(0, -5);
            var choosedDate = calendarDate.substr(0, 8) + choosedElementDay + calendarDate.substr(10);
            console.log(choosedDate);
            if(previousWeatherLayout) {
                previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
            } else {
                weatherView.createWeatherBody(event.clientX, event.clientY);
            //weather.getWeatherData(choosedDate, weatherView.insertWeatherData);
            }
        }
    }

    function chooseMonthDayHandler() {
        var calendarDaysBody = document.querySelector(".sv-datepicker__days-block");
        var choosedElement = event.target;
        var previousChoosedElement = calendarDaysBody.getElementsByClassName("sv-datepicker__day_choosed")[0];

        if(choosedElement.classList.contains("sv-datepicker__day")) {
            if(choosedElement.classList.contains("sv-datepicker__day_choosed")) {
                choosedElement.classList.remove("sv-datepicker__day_choosed");
            } else if (previousChoosedElement !== undefined) {
                previousChoosedElement.classList.remove("sv-datepicker__day_choosed");
                choosedElement.classList.add("sv-datepicker__day_choosed");
            } else {
                choosedElement.classList.add("sv-datepicker__day_choosed");
            }
        }
    }

    var buttonPrevMonth = document.querySelector(".sv-datepicker__prev-month");
    buttonPrevMonth.addEventListener("click", previousMonthClickHandler);

    var buttonCurrentMonth = document.querySelector(".sv-datepicker__current-month");
    buttonCurrentMonth.addEventListener("click", currentMonthClickHandler);

    var buttonNextMonth = document.querySelector(".sv-datepicker__next-month");
    buttonNextMonth.addEventListener("click", nextMonthClickHandler);

    var buttonChooseMonthDay = document.querySelector(".sv-datepicker__days-block");
    buttonChooseMonthDay.addEventListener("click", chooseMonthDayHandler);
    buttonChooseMonthDay.addEventListener("click", createWeatherLayout);

}