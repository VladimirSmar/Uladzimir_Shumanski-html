class Handlers{

    constructor() {}

    setHandlers = function(calendar: Calendar, view: DatepickerRenderer, calendarRenderer: CalendarRenderer): void {

        function previousMonthClickHandler(): void {
            let previousWeatherLayout: Element = document.body.getElementsByClassName("-sv-weather-ui")[0];
    
            calendar.setPreviousMonth();
            calendarRenderer._updateCalendar(calendar, view);
    
            if (previousWeatherLayout) {
                previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
            }
        }
    
        function currentMonthClickHandler(): void {
            let previousWeatherLayout: Element = document.body.getElementsByClassName("-sv-weather-ui")[0];
    
            calendar.setCurrentMonth();
            calendarRenderer._updateCalendar(calendar, view);
    
            if (previousWeatherLayout) {
                previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
            }
        }
    
        function nextMonthClickHandler(): void {
            let previousWeatherLayout: Element = document.body.getElementsByClassName("-sv-weather-ui")[0];
    
            calendar.setNextMonth();
            calendarRenderer._updateCalendar(calendar, view);
    
            if (previousWeatherLayout) {
                previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
            }
        }
    
        function createWeatherLayout(event: MouseEvent): void {
    
            let weather: WeatherService = new WeatherService();
            let weatherView: WeatherRenderer = new WeatherRenderer();
    
            let choosedElement: HTMLDivElement = <HTMLDivElement> event.target;
            let previousWeatherLayout: Element = document.body.getElementsByClassName("-sv-weather-ui")[0];
    
            if (choosedElement.classList.contains("-sv-datepicker__day")) {
                if (choosedElement.classList.contains("-sv-datepicker__day_choosed") && previousWeatherLayout) {
                    previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                } else {
                    let choosedElementDay: string = choosedElement.innerText;
                    if (+choosedElementDay < 10) {
                        choosedElementDay = "0" + choosedElementDay;
                    }
                    let calendarDate: string = calendar.getCalendarDate().toISOString().slice(0, -5);
                    let choosedDate: string = calendarDate.substr(0, 8) + choosedElementDay + calendarDate.substr(10);
    
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
    
        function chooseMonthDayHandler(event: MouseEvent): void {
            let calendarDaysBody: Element = document.querySelector(".-sv-datepicker__days-block");
            let choosedElement: HTMLDivElement = <HTMLDivElement> event.target;
            let previousChoosedElement: Element = calendarDaysBody.getElementsByClassName("-sv-datepicker__day_choosed")[0];
    
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
    
        let buttonPrevMonth: Element = document.querySelector(".-sv-datepicker__prev-month");
        buttonPrevMonth.addEventListener("click", previousMonthClickHandler);
    
        let buttonCurrentMonth: Element = document.querySelector(".-sv-datepicker__current-month");
        buttonCurrentMonth.addEventListener("click", currentMonthClickHandler);
    
        let buttonNextMonth: Element = document.querySelector(".-sv-datepicker__next-month");
        buttonNextMonth.addEventListener("click", nextMonthClickHandler);
    
        let buttonChooseMonthDay: Element = document.querySelector(".-sv-datepicker__days-block");
        buttonChooseMonthDay.addEventListener("click", createWeatherLayout);
        buttonChooseMonthDay.addEventListener("click", chooseMonthDayHandler);
        
    }
}