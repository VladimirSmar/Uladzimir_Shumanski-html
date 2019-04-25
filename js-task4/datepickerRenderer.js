function DatepickerRenderer() {

}

DatepickerRenderer.prototype.CreateBody = function () {

    var container = document.createElement("div");
    container.setAttribute("class", "sv-container");
    document.body.appendChild(container);

    var containerContent = document.createElement("div");
    containerContent.setAttribute("class", "sv-container_content");
    container.appendChild(containerContent);

    var datepickerContainer = document.createElement("div");
    datepickerContainer.setAttribute("class", "sv-datepicker");
    containerContent.appendChild(datepickerContainer);

    var datepicker = document.querySelector(".sv-datepicker");

    var datepickerBody = document.createElement("div");
    datepickerBody.setAttribute("class", "sv-datepicker__body");
    datepicker.appendChild(datepickerBody);

    var header = document.createElement("div");
    header.setAttribute("class", "sv-datepicker__header");
    datepickerBody.appendChild(header);

    var buttonPrevMonth = document.createElement("div");
    buttonPrevMonth.setAttribute("class", "sv-datepicker__prev-month sv-datepicker_month-user-view");
    buttonPrevMonth.innerText = "◀";
    header.appendChild(buttonPrevMonth);

    var monthInfo = document.createElement("div");
    monthInfo.setAttribute("class", "sv-datepicker__month sv-datepicker_month-user-view");
    header.appendChild(monthInfo);

    var buttonNextMonth = document.createElement("div");
    buttonNextMonth.setAttribute("class", "sv-datepicker__next-month sv-datepicker_month-user-view");
    buttonNextMonth.innerText = "▶";
    header.appendChild(buttonNextMonth);

    var daysOfWeekLine = document.createElement("div");
    daysOfWeekLine.setAttribute("class", "sv-datepicker__days-of-week-line");
    datepickerBody.appendChild(daysOfWeekLine);

    var daysOfWeekArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    for (var i = 0; i < daysOfWeekArray.length; i++) {
        var dayOfWeek = document.createElement("div");
        dayOfWeek.innerHTML = daysOfWeekArray[i];
        dayOfWeek.setAttribute("class", "sv-datepicker__day-of-week");
        daysOfWeekLine.appendChild(dayOfWeek);
    }    
    
    daysBlock = document.createElement("div");
    daysBlock.setAttribute("class", "sv-datepicker__days-block");
    datepickerBody.appendChild(daysBlock);
}

DatepickerRenderer.prototype.DrawMonth = function (headerText) {
    var monthInfo = document.querySelector(".sv-datepicker__month");
    monthInfo.innerText = headerText;
}

DatepickerRenderer.prototype.DrawOtherMonthDays = function(otherMonthDaysCount, parentElement)
{
    while(otherMonthDaysCount > 0)
    {
        var otherMonthDay = document.createElement("div");
        otherMonthDay.setAttribute("class", "sv-datepicker__day sv-datepicker__other-month-day");
        parentElement.appendChild(otherMonthDay);

        otherMonthDaysCount--;
    }
}

DatepickerRenderer.prototype.DrawDays = function (firstDayOnWeek, daysCount, todayDay) 
{
    var daysBlock = document.querySelector(".sv-datepicker__days-block");
    
    if (daysBlock != null)
    {
        while (daysBlock.firstChild) {
            daysBlock.removeChild(daysBlock.firstChild);
        }
    }
    
    var dayOfWeek = firstDayOnWeek; 

    var week;

    for (var i = 1; i <= daysCount; i++)
    {
        if (i == 1 || dayOfWeek == 0)
        {
            week = document.createElement("div");
            week.setAttribute("class", "sv-datepicker__week");
            daysBlock.appendChild(week);
        }

        if(i == 1)
        {
            this.DrawOtherMonthDays(firstDayOnWeek, week);
        }
        
        day = document.createElement("div");
        day.className = "sv-datepicker__day";
        day.innerHTML = i;

        if (i === todayDay)
        {
            day.className += " sv-datepicker__day_today";
        }

        week.appendChild(day);   
            

        if(i == daysCount)
        {
            this.DrawOtherMonthDays(6-dayOfWeek, week);
        }

        (dayOfWeek == 6) ? dayOfWeek = 0 : dayOfWeek++;
    }
}
