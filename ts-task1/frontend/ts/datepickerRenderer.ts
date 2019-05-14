function DatepickerRenderer(): void {

}

DatepickerRenderer.prototype.createBody = function (): void {

    let container: HTMLDivElement = document.createElement("div");
    container.setAttribute("class", "-sv-container");
    document.body.appendChild(container);

    let containerContent: HTMLDivElement = document.createElement("div");
    containerContent.setAttribute("class", "-sv-container_content");
    container.appendChild(containerContent);

    let datepickerContainer: HTMLDivElement = document.createElement("div");
    datepickerContainer.setAttribute("class", "-sv-datepicker");
    containerContent.appendChild(datepickerContainer);

    let datepicker: Element = document.querySelector(".-sv-datepicker");

    let datepickerBody: HTMLDivElement = document.createElement("div");
    datepickerBody.setAttribute("class", "-sv-datepicker__body");
    datepicker.appendChild(datepickerBody);

    let header: HTMLDivElement = document.createElement("div");
    header.setAttribute("class", "-sv-datepicker__header");
    datepickerBody.appendChild(header);

    let buttonPrevMonth: HTMLDivElement = document.createElement("div");
    buttonPrevMonth.setAttribute("class", "-sv-datepicker__prev-month -sv-datepicker_month-user-view");
    buttonPrevMonth.innerText = "◀";
    header.appendChild(buttonPrevMonth);

    let monthInfo: HTMLDivElement = document.createElement("div");
    monthInfo.setAttribute("class", "-sv-datepicker__current-month -sv-datepicker_month-user-view");
    header.appendChild(monthInfo);

    let buttonNextMonth: HTMLDivElement = document.createElement("div");
    buttonNextMonth.setAttribute("class", "-sv-datepicker__next-month -sv-datepicker_month-user-view");
    buttonNextMonth.innerText = "▶";
    header.appendChild(buttonNextMonth);

    let daysOfWeekLine: HTMLDivElement = document.createElement("div");
    daysOfWeekLine.setAttribute("class", "-sv-datepicker__days-of-week-line");
    datepickerBody.appendChild(daysOfWeekLine);

    let daysOfWeekArray: string[] = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    for (let i: number = 0; i < daysOfWeekArray.length; i++) {
        let dayOfWeek: HTMLDivElement = document.createElement("div");
        dayOfWeek.innerHTML = daysOfWeekArray[i];
        dayOfWeek.setAttribute("class", "-sv-datepicker__day-of-week");
        daysOfWeekLine.appendChild(dayOfWeek);
    }    
    
    let daysBlock: HTMLDivElement = document.createElement("div");
    daysBlock.setAttribute("class", "-sv-datepicker__days-block");
    datepickerBody.appendChild(daysBlock);

}

DatepickerRenderer.prototype.drawMonth = function (calendar): void {
    let headerText: string = calendar.getMonthName();
    let monthInfo = <HTMLElement> document.querySelector(".-sv-datepicker__current-month");
    monthInfo.innerText = headerText;
}

DatepickerRenderer.prototype.drawPreviousMonthDays = function(previousMonthDaysCount: number, parentElement: HTMLDivElement, previousMonthTotalDaysCount: number): void {
    while(previousMonthDaysCount > 0) {

        let previousMonthDay: HTMLDivElement = document.createElement("div");
        previousMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
        previousMonthDay.innerHTML = previousMonthTotalDaysCount - previousMonthDaysCount + 1 + "";
        parentElement.appendChild(previousMonthDay);


        previousMonthDaysCount--;
    }
}

DatepickerRenderer.prototype.drawNextMonthDays = function(nextMonthDaysCount: number, parentElement: HTMLDivElement, nextMonthDayDate: number): void {
    while(nextMonthDaysCount > 0) {
        let nextMonthDay: HTMLDivElement = document.createElement("div");
        nextMonthDay.setAttribute("class", "-sv-datepicker__day -sv-datepicker__other-month-day");
        nextMonthDay.innerHTML = nextMonthDayDate + "";
        parentElement.appendChild(nextMonthDay);

        nextMonthDayDate++;
        nextMonthDaysCount--;
    }
}

DatepickerRenderer.prototype.drawDays = function (calendar): void {

    let firstDayOnWeek: number = calendar.getFirstDayInfo();
    let daysCount: number = calendar.getDaysInMonthCount();
    let todayDay: number = calendar.isToday();
    let previousMonthTotalDaysCount: number = calendar.getDaysInPreviousMonthCount();

    let daysBlock: Element = document.querySelector(".-sv-datepicker__days-block");
    
    if (daysBlock != null) {
        while (daysBlock.firstChild) {
            daysBlock.removeChild(daysBlock.firstChild);
        }
    }
    
    let dayOfWeek: number = firstDayOnWeek; 
    let week: HTMLDivElement;
    let nextMonthDayDate: number = 1;

    for (let i: number = 1; i <= daysCount; i++) {
        if (i == 1 || dayOfWeek == 0) {
            week = document.createElement("div");
            week.setAttribute("class", "-sv-datepicker__week");
            daysBlock.appendChild(week);
        }

        if(i == 1) {
            this.drawPreviousMonthDays(firstDayOnWeek, week, previousMonthTotalDaysCount);
        }
        
        let day: HTMLDivElement = document.createElement("div");
        day.className = "-sv-datepicker__day";
        day.innerHTML = i + "";

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