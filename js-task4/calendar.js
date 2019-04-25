function Calendar()
{
    this.currentDate =  new Date();    
}

Calendar.prototype.getDaysInMonthCount = function()
{
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1,0).getDate();
}

Calendar.prototype.getTodayDay = function()
{
    return new Date().getDate();
}

Calendar.prototype.isToday = function()
{
    var isEqual = new Date().getFullYear() === this.currentDate.getFullYear() && new Date().getMonth() === this.currentDate.getMonth();
    if (isEqual)
    {
        return this.getTodayDay();
    }
    else
    {
        return isEqual;
    }
    
}

Calendar.prototype.setNextMonth = function()
{
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
}

Calendar.prototype.setCurrentMonth = function()
{
    this.currentDate =  new Date();
}

Calendar.prototype.setPreviousMonth = function()
{
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
}

Calendar.prototype.getFirstDayInfo = function()
{
    var firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); 
    //console.log(firstDay); //wtf in vs code debugger?
    dayOfWeek = firstDay.getDay() ===0 ?  6 : firstDay.getDay()-1;
    return dayOfWeek;
}

Calendar.prototype.getMonthName = function()
{
    var monthName =  this.currentDate.toLocaleString('en-GB', {
        month: "long",
        year: "numeric"
    });
    return monthName;
}

var calendarForConsoleTest = new Calendar();
console.log(calendarForConsoleTest.getDaysInMonthCount());
console.log(calendarForConsoleTest.getTodayDay());
console.log(calendarForConsoleTest.getFirstDayInfo());
console.log(calendarForConsoleTest.currentDate.getDay());

calendarForConsoleTest.setNextMonth();
calendarForConsoleTest.setPreviousMonth();

console.log(calendarForConsoleTest.currentDate);