function Calendar() {
    this.currentDate =  new Date();    
}

Calendar.prototype.getDaysInMonthCount = function() {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
}

Calendar.prototype.getDaysInPreviousMonthCount = function(){
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
}

Calendar.prototype.getTodayDay = function() {
    return new Date().getDate();
}

Calendar.prototype.isToday = function() {
    var isEqual = new Date().getFullYear() === this.currentDate.getFullYear() && new Date().getMonth() === this.currentDate.getMonth();
    return (isEqual) ? this.getTodayDay() : isEqual;  
}

Calendar.prototype.setNextMonth = function() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
}

Calendar.prototype.setCurrentMonth = function() {
    this.currentDate =  new Date();
}

Calendar.prototype.setPreviousMonth = function() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
}

Calendar.prototype.getFirstDayInfo = function() {
    var firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); 
    dayOfWeek = firstDay.getDay() === 0 ?  6 : firstDay.getDay() - 1;
    return dayOfWeek;
}

Calendar.prototype.getMonthName = function() {
    var monthName =  this.currentDate.toLocaleString('en-GB', {
        month: "long",
        year: "numeric"
    });
    return monthName;
}