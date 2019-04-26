var calendar = new Calendar();

var view = new DatepickerRenderer();

view.CreateBody();
view.DrawMonth(calendar.getMonthName());
view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
setHandlers();


function setHandlers() {

    function previousMonthClickHandler() {
        calendar.setPreviousMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function currentMonthClickHandler() {
        calendar.setCurrentMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function nextMonthClickHandler() {
        calendar.setNextMonth();
        view.DrawMonth(calendar.getMonthName());
        view.DrawDays(calendar.getFirstDayInfo(), calendar.getDaysInMonthCount(), calendar.isToday(), calendar.getDaysInPreviousMonthCount());
    }

    function chooseMonthDayHandler(event) {
        var calendarDaysBody = document.querySelector(".sv-datepicker__days-block")
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
/*     buttonChooseMonthDay.addEventListener("",);
    buttonChooseMonthDay.addEventListener("",); */
}