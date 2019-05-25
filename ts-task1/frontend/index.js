class Calendar {
    constructor() {
        this.getCalendarDate = function () {
            return this.currentDate;
        };
        this.getDaysInMonthCount = function () {
            return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
        };
        this.getDaysInPreviousMonthCount = function () {
            return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
        };
        this.getTodayDay = function () {
            return new Date().getDate();
        };
        this.isToday = function () {
            let isEqual = new Date().getFullYear() === this.currentDate.getFullYear() && new Date().getMonth() === this.currentDate.getMonth();
            return (isEqual) ? this.getTodayDay() : isEqual;
        };
        this.setNextMonth = function () {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        };
        this.setCurrentMonth = function () {
            this.currentDate = new Date();
        };
        this.setPreviousMonth = function () {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        };
        this.getFirstDayInfo = function () {
            let firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
            let dayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
            return dayOfWeek;
        };
        this.getMonthName = function () {
            let monthName = this.currentDate.toLocaleString('en-GB', {
                month: "long",
                year: "numeric"
            });
            return monthName;
        };
        this.currentDate = new Date();
    }
}
class CalendarRenderer {
    constructor() {
        this._createCalendar = function (calendar, view) {
            let handlers = new Handlers();
            view.createBody();
            view.drawMonth(calendar);
            view.drawDays(calendar);
            handlers.setHandlers(calendar, view, this);
        };
        this._updateCalendar = function (calendar, view) {
            view.drawMonth(calendar);
            view.drawDays(calendar);
        };
    }
}
class DatepickerRenderer {
    constructor() {
        this.createBody = function () {
            let container = document.createElement("div");
            container.setAttribute("class", "-sv-container");
            document.body.appendChild(container);
            let containerContent = document.createElement("div");
            containerContent.setAttribute("class", "-sv-container_content");
            container.appendChild(containerContent);
            let datepickerContainer = document.createElement("div");
            datepickerContainer.setAttribute("class", "-sv-datepicker");
            containerContent.appendChild(datepickerContainer);
            let datepicker = document.querySelector(".-sv-datepicker");
            let datepickerBody = document.createElement("div");
            datepickerBody.setAttribute("class", "-sv-datepicker__body");
            datepicker.appendChild(datepickerBody);
            let header = document.createElement("div");
            header.setAttribute("class", "-sv-datepicker__header");
            datepickerBody.appendChild(header);
            let buttonPrevMonth = document.createElement("div");
            buttonPrevMonth.setAttribute("class", "-sv-datepicker__prev-month -sv-datepicker_month-user-view");
            buttonPrevMonth.innerText = "◀";
            header.appendChild(buttonPrevMonth);
            let monthInfo = document.createElement("div");
            monthInfo.setAttribute("class", "-sv-datepicker__current-month -sv-datepicker_month-user-view");
            header.appendChild(monthInfo);
            let buttonNextMonth = document.createElement("div");
            buttonNextMonth.setAttribute("class", "-sv-datepicker__next-month -sv-datepicker_month-user-view");
            buttonNextMonth.innerText = "▶";
            header.appendChild(buttonNextMonth);
            let daysOfWeekLine = document.createElement("div");
            daysOfWeekLine.setAttribute("class", "-sv-datepicker__days-of-week-line");
            datepickerBody.appendChild(daysOfWeekLine);
            let daysOfWeekArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
            for (let i = 0; i < daysOfWeekArray.length; i++) {
                let dayOfWeek = document.createElement("div");
                dayOfWeek.innerHTML = daysOfWeekArray[i];
                dayOfWeek.setAttribute("class", "-sv-datepicker__day-of-week");
                daysOfWeekLine.appendChild(dayOfWeek);
            }
            let daysBlock = document.createElement("div");
            daysBlock.setAttribute("class", "-sv-datepicker__days-block");
            datepickerBody.appendChild(daysBlock);
        };
        this.drawMonth = function (calendar) {
            let headerText = calendar.getMonthName();
            let monthInfo = document.querySelector(".-sv-datepicker__current-month");
            monthInfo.innerText = headerText;
        };
        this.drawPreviousMonthDays = function (previousMonthDaysCount, parentElement, previousMonthTotalDaysCount) {
            while (previousMonthDaysCount > 0) {
                let previousMonthDay = document.createElement("div");
                previousMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
                previousMonthDay.innerHTML = previousMonthTotalDaysCount - previousMonthDaysCount + 1 + "";
                parentElement.appendChild(previousMonthDay);
                previousMonthDaysCount--;
            }
        };
        this.drawNextMonthDays = function (nextMonthDaysCount, parentElement, nextMonthDayDate) {
            while (nextMonthDaysCount > 0) {
                let nextMonthDay = document.createElement("div");
                nextMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
                nextMonthDay.innerHTML = nextMonthDayDate + "";
                parentElement.appendChild(nextMonthDay);
                nextMonthDayDate++;
                nextMonthDaysCount--;
            }
        };
        this.drawDays = function (calendar) {
            let firstDayOnWeek = calendar.getFirstDayInfo();
            let daysCount = calendar.getDaysInMonthCount();
            let todayDay = calendar.isToday();
            let previousMonthTotalDaysCount = calendar.getDaysInPreviousMonthCount();
            let daysBlock = document.querySelector(".-sv-datepicker__days-block");
            if (daysBlock != null) {
                while (daysBlock.firstChild) {
                    daysBlock.removeChild(daysBlock.firstChild);
                }
            }
            let dayOfWeek = firstDayOnWeek;
            let week;
            let nextMonthDayDate = 1;
            for (let i = 1; i <= daysCount; i++) {
                if (i == 1 || dayOfWeek == 0) {
                    week = document.createElement("div");
                    week.setAttribute("class", "-sv-datepicker__week");
                    daysBlock.appendChild(week);
                }
                if (i == 1) {
                    this.drawPreviousMonthDays(firstDayOnWeek, week, previousMonthTotalDaysCount);
                }
                let day = document.createElement("div");
                day.className = "-sv-datepicker__day";
                day.innerHTML = i + "";
                if (i === todayDay) {
                    day.classList.add("-sv-datepicker__day_today");
                }
                week.appendChild(day);
                if (i == daysCount) {
                    this.drawNextMonthDays(6 - dayOfWeek, week, nextMonthDayDate);
                }
                (dayOfWeek == 6) ? dayOfWeek = 0 : dayOfWeek++;
            }
        };
    }
}
class Handlers {
    constructor() {
        this.setHandlers = function (calendar, view, calendarRenderer) {
            function previousMonthClickHandler() {
                let previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];
                calendar.setPreviousMonth();
                calendarRenderer._updateCalendar(calendar, view);
                if (previousWeatherLayout) {
                    previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                }
            }
            function currentMonthClickHandler() {
                let previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];
                calendar.setCurrentMonth();
                calendarRenderer._updateCalendar(calendar, view);
                if (previousWeatherLayout) {
                    previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                }
            }
            function nextMonthClickHandler() {
                let previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];
                calendar.setNextMonth();
                calendarRenderer._updateCalendar(calendar, view);
                if (previousWeatherLayout) {
                    previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                }
            }
            function createWeatherLayout(event) {
                let weather = new WeatherService();
                let weatherView = new WeatherRenderer();
                let choosedElement = event.target;
                let previousWeatherLayout = document.body.getElementsByClassName("-sv-weather-ui")[0];
                if (choosedElement.classList.contains("-sv-datepicker__day")) {
                    if (choosedElement.classList.contains("-sv-datepicker__day_choosed") && previousWeatherLayout) {
                        previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                    }
                    else {
                        let choosedElementDay = choosedElement.innerText;
                        if (+choosedElementDay < 10) {
                            choosedElementDay = "0" + choosedElementDay;
                        }
                        let calendarDate = calendar.getCalendarDate().toISOString().slice(0, -5);
                        let choosedDate = calendarDate.substr(0, 8) + choosedElementDay + calendarDate.substr(10);
                        if (previousWeatherLayout) {
                            previousWeatherLayout.parentNode.removeChild(previousWeatherLayout);
                            weatherView.createWeatherBody(event.clientX, event.clientY, calendar.getMonthName(), choosedElementDay);
                            weather.getWeatherData(choosedDate, weatherView.insertWeatherData);
                        }
                        else {
                            weatherView.createWeatherBody(event.clientX, event.clientY, calendar.getMonthName(), choosedElementDay);
                            weather.getWeatherData(choosedDate, weatherView.insertWeatherData);
                        }
                    }
                }
            }
            function chooseMonthDayHandler(event) {
                let calendarDaysBody = document.querySelector(".-sv-datepicker__days-block");
                let choosedElement = event.target;
                let previousChoosedElement = calendarDaysBody.getElementsByClassName("-sv-datepicker__day_choosed")[0];
                if (choosedElement.classList.contains("-sv-datepicker__day")) {
                    if (choosedElement.classList.contains("-sv-datepicker__day_choosed")) {
                        choosedElement.classList.remove("-sv-datepicker__day_choosed");
                    }
                    else if (previousChoosedElement !== undefined) {
                        previousChoosedElement.classList.remove("-sv-datepicker__day_choosed");
                        choosedElement.classList.add("-sv-datepicker__day_choosed");
                    }
                    else {
                        choosedElement.classList.add("-sv-datepicker__day_choosed");
                    }
                }
            }
            let buttonPrevMonth = document.querySelector(".-sv-datepicker__prev-month");
            buttonPrevMonth.addEventListener("click", previousMonthClickHandler);
            let buttonCurrentMonth = document.querySelector(".-sv-datepicker__current-month");
            buttonCurrentMonth.addEventListener("click", currentMonthClickHandler);
            let buttonNextMonth = document.querySelector(".-sv-datepicker__next-month");
            buttonNextMonth.addEventListener("click", nextMonthClickHandler);
            let buttonChooseMonthDay = document.querySelector(".-sv-datepicker__days-block");
            buttonChooseMonthDay.addEventListener("click", createWeatherLayout);
            buttonChooseMonthDay.addEventListener("click", chooseMonthDayHandler);
        };
    }
}
class WeatherService {
    constructor() {
        this.getWeatherData = function (weatherDate, callback) {
            let xhr = new XMLHttpRequest();
            let url = "api/weather?choosedDate=" + weatherDate;
            xhr.open("GET", url, true);
            xhr.send();
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let response = JSON.parse(xhr.response);
                        if (callback) {
                            callback(response);
                        }
                    }
                    else {
                        console.error(xhr.responseText);
                        callback();
                    }
                }
            };
        };
    }
}
class WeatherRenderer {
    constructor() {
        this.createWeatherBody = function (clientClickX, clientClickY, monthName, choosedDay) {
            let container = document.createElement("div");
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
            let weatherHeaderContainer = document.createElement("div");
            weatherHeaderContainer.setAttribute("class", "-sv-weather-ui__header");
            container.appendChild(weatherHeaderContainer);
            let weatherHeaderLeft = document.createElement("div");
            weatherHeaderLeft.setAttribute("class", "-sv-weather-ui__header_item");
            weatherHeaderLeft.innerText = "🌝";
            weatherHeaderContainer.appendChild(weatherHeaderLeft);
            let weatherHeaderCenter = document.createElement("div");
            weatherHeaderCenter.setAttribute("class", "-sv-weather-ui__header_date");
            weatherHeaderCenter.innerText = monthName;
            weatherHeaderContainer.appendChild(weatherHeaderCenter);
            let weatherHeaderRight = document.createElement("div");
            weatherHeaderRight.setAttribute("class", "-sv-weather-ui__header_item");
            weatherHeaderRight.innerText = "💨";
            weatherHeaderContainer.appendChild(weatherHeaderRight);
            let weatherDay = document.createElement("div");
            weatherDay.setAttribute("class", "-sv-weather-ui__day");
            weatherDay.innerText = choosedDay;
            container.appendChild(weatherDay);
            let weatherCity = document.createElement("div");
            weatherCity.setAttribute("class", "-sv-weather-ui__city");
            weatherCity.innerText = "☃ Mahilyow ☃";
            container.appendChild(weatherCity);
            let weatherDescriptionContainer = document.createElement("div");
            weatherDescriptionContainer.setAttribute("class", "-sv-weather-ui__description");
            container.appendChild(weatherDescriptionContainer);
            let weatherSummary = document.createElement("div");
            weatherSummary.setAttribute("class", "-sv-weather-ui__summary");
            weatherDescriptionContainer.appendChild(weatherSummary);
            let weatherMaxTemperature = document.createElement("div");
            weatherMaxTemperature.setAttribute("class", "-sv-weather-ui__max-temperature");
            weatherDescriptionContainer.appendChild(weatherMaxTemperature);
            let weatherMinTemperature = document.createElement("div");
            weatherMinTemperature.setAttribute("class", "-sv-weather-ui__min-temperature");
            weatherDescriptionContainer.appendChild(weatherMinTemperature);
            let weatherWindSpeed = document.createElement("div");
            weatherWindSpeed.setAttribute("class", "-sv-weather-ui__wind-speed");
            weatherDescriptionContainer.appendChild(weatherWindSpeed);
        };
        this.insertWeatherData = function (obj) {
            if (obj == undefined) {
                let summary = document.querySelector(".-sv-weather-ui__summary");
                summary.innerText = "Service is unavailable at the moment";
            }
            else {
                let summary = document.querySelector(".-sv-weather-ui__summary");
                summary.innerText = obj.daily.data[0].summary;
                let maxTemperature = document.querySelector(".-sv-weather-ui__max-temperature");
                maxTemperature.innerText = "Highest temperature (°C): " + obj.daily.data[0].temperatureMax;
                let minTemperature = document.querySelector(".-sv-weather-ui__min-temperature");
                minTemperature.innerText = "Lowest temperature (°C): " + obj.daily.data[0].temperatureMin;
                let windSpeed = document.querySelector(".-sv-weather-ui__wind-speed");
                windSpeed.innerText = "Wind speed (kts): " + obj.daily.data[0].windSpeed;
            }
        };
    }
}
let calendar = new Calendar();
let view = new DatepickerRenderer();
let calendarRenderer = new CalendarRenderer();
calendarRenderer._createCalendar(calendar, view);
//# sourceMappingURL=index.js.map