function DatepickerRenderer() {

}

DatepickerRenderer.prototype.createBody = function () {

    var container = document.createElement("div");
    container.setAttribute("class", "-sv-container");
    document.body.appendChild(container);

    var containerContent = document.createElement("div");
    containerContent.setAttribute("class", "-sv-container_content");
    container.appendChild(containerContent);

    var datepickerContainer = document.createElement("div");
    datepickerContainer.setAttribute("class", "-sv-datepicker");
    containerContent.appendChild(datepickerContainer);

    var datepicker = document.querySelector(".-sv-datepicker");

    var datepickerBody = document.createElement("div");
    datepickerBody.setAttribute("class", "-sv-datepicker__body");
    datepicker.appendChild(datepickerBody);

    var header = document.createElement("div");
    header.setAttribute("class", "-sv-datepicker__header");
    datepickerBody.appendChild(header);

    var buttonPrevMonth = document.createElement("div");
    buttonPrevMonth.setAttribute("class", "-sv-datepicker__prev-month -sv-datepicker_month-user-view");
    buttonPrevMonth.innerText = "◀";
    header.appendChild(buttonPrevMonth);

    var monthInfo = document.createElement("div");
    monthInfo.setAttribute("class", "-sv-datepicker__current-month -sv-datepicker_month-user-view");
    header.appendChild(monthInfo);

    var buttonNextMonth = document.createElement("div");
    buttonNextMonth.setAttribute("class", "-sv-datepicker__next-month -sv-datepicker_month-user-view");
    buttonNextMonth.innerText = "▶";
    header.appendChild(buttonNextMonth);

    var daysOfWeekLine = document.createElement("div");
    daysOfWeekLine.setAttribute("class", "-sv-datepicker__days-of-week-line");
    datepickerBody.appendChild(daysOfWeekLine);

    var daysOfWeekArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    for (var i = 0; i < daysOfWeekArray.length; i++) {
        var dayOfWeek = document.createElement("div");
        dayOfWeek.innerHTML = daysOfWeekArray[i];
        dayOfWeek.setAttribute("class", "-sv-datepicker__day-of-week");
        daysOfWeekLine.appendChild(dayOfWeek);
    }    
    
    daysBlock = document.createElement("div");
    daysBlock.setAttribute("class", "-sv-datepicker__days-block");
    datepickerBody.appendChild(daysBlock);

}

DatepickerRenderer.prototype.drawMonth = function (headerText) {
    var monthInfo = document.querySelector(".-sv-datepicker__current-month");
    monthInfo.innerText = headerText;
}

DatepickerRenderer.prototype.drawPreviousMonthDays = function(previousMonthDaysCount, parentElement, previousMonthTotalDaysCount) {
    while(previousMonthDaysCount > 0) {
        var previousMonthDay = document.createElement("div");
        previousMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
        previousMonthDay.innerHTML = previousMonthTotalDaysCount - previousMonthDaysCount + 1;
        parentElement.appendChild(previousMonthDay);


        previousMonthDaysCount--;
    }
}

DatepickerRenderer.prototype.drawNextMonthDays = function(nextMonthDaysCount, parentElement, nextMonthDayDate) {
    while(nextMonthDaysCount > 0) {
        var nextMonthDay = document.createElement("div");
        nextMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
        nextMonthDay.innerHTML = nextMonthDayDate;
        parentElement.appendChild(nextMonthDay);

        nextMonthDayDate++;
        nextMonthDaysCount--;
    }
}

DatepickerRenderer.prototype.drawDays = function (firstDayOnWeek, daysCount, todayDay, previousMonthTotalDaysCount) {

    var daysBlock = document.querySelector(".-sv-datepicker__days-block");
    
    if (daysBlock != null) {
        while (daysBlock.firstChild) {
            daysBlock.removeChild(daysBlock.firstChild);
        }
    }
    
    var dayOfWeek = firstDayOnWeek; 
    var week;
    var nextMonthDayDate = 1;

    for (var i = 1; i <= daysCount; i++) {
        if (i == 1 || dayOfWeek == 0) {
            week = document.createElement("div");
            week.setAttribute("class", "-sv-datepicker__week");
            daysBlock.appendChild(week);
        }

        if(i == 1) {
            this.drawPreviousMonthDays(firstDayOnWeek, week, previousMonthTotalDaysCount);
        }
        
        day = document.createElement("div");
        day.className = "-sv-datepicker__day";
        day.innerHTML = i;

        if (i === todayDay) {
            day.classList.add("-sv-datepicker__day_today");
        }

        week.appendChild(day);   
            

        if(i == daysCount) {
            this.drawNextMonthDays(6-dayOfWeek, week, nextMonthDayDate);
        }

        (dayOfWeek == 6) ? dayOfWeek = 0 : dayOfWeek++;
    }
    
}