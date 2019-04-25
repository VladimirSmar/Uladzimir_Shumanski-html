var calendar = new Calendar();

var view = new DatepickerRenderer();

view.CreateBody();
view.DrawMonth(calendar.getMonthName());
view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday());
setHandlers();


function setHandlers() {
    var buttonPrevMonth = document.querySelector(".sv-datepicker__prev-month");

    buttonPrevMonth.onclick = function () {
        calendar.setPreviousMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday());
    }

    var buttonNextMonth = document.querySelector(".sv-datepicker__next-month");

    buttonNextMonth.onclick = function () {
        calendar.setNextMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday());
    }

    var buttonCurrentMonth = document.querySelector(".sv-datepicker__month");

    buttonCurrentMonth.onclick = function () {
        calendar.setCurrentMonth();  
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday());
    }
}