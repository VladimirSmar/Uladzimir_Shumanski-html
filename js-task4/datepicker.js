var calendar = new Calendar();

var view = new DatepickerRenderer();

view.CreateBody();
view.DrawMonth(calendar.getMonthName());
view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
setHandlers();


function setHandlers() {
    var buttonPrevMonth = document.querySelector(".sv-datepicker__prev-month");

    buttonPrevMonth.onclick = function() {
        calendar.setPreviousMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    var buttonCurrentMonth = document.querySelector(".sv-datepicker__current-month");

    buttonCurrentMonth.onclick = function() {
        calendar.setCurrentMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    var buttonNextMonth = document.querySelector(".sv-datepicker__next-month");

    buttonNextMonth.onclick = function() {
        calendar.setNextMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    var buttonChooseDay = document.querySelector(".sv-datepicker__days-block");

    buttonChooseDay.onclick = function() {
        var calendarDaysBody = document.querySelector(".sv-datepicker__days-block")
        this.choosedElement = event.target;
        var previousChoosedElement = calendarDaysBody.getElementsByClassName("sv-datepicker__day_choosed")[0];
        if(this.choosedElement.classList.contains("sv-datepicker__day")) {
            if(this.choosedElement.classList.contains("sv-datepicker__day_choosed")) {
                this.choosedElement.classList.remove("sv-datepicker__day_choosed");
            } else if (previousChoosedElement !== undefined) {
                previousChoosedElement.classList.remove("sv-datepicker__day_choosed");
                this.choosedElement.className += " sv-datepicker__day_choosed";
            } else {
                this.choosedElement.className += " sv-datepicker__day_choosed";
            }
        }
    }
}