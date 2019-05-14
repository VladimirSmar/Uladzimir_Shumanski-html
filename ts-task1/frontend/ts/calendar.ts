function Calendar(): void {
        this.currentDate =  new Date();  
}

Calendar.prototype.getCalendarDate = function(): Date {
    return this.currentDate;
}

Calendar.prototype.getDaysInMonthCount = function() : number {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
}

Calendar.prototype.getDaysInPreviousMonthCount = function(): number {
    return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
}

Calendar.prototype.getTodayDay = function(): number {
    return new Date().getDate();
}

Calendar.prototype.isToday = function(): boolean {
    let isEqual: boolean = new Date().getFullYear() === this.currentDate.getFullYear() && new Date().getMonth() === this.currentDate.getMonth();
    return (isEqual) ? this.getTodayDay() : isEqual;  
}

Calendar.prototype.setNextMonth = function(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
}

Calendar.prototype.setCurrentMonth = function(): void {
    this.currentDate =  new Date();
}

Calendar.prototype.setPreviousMonth = function(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
}

Calendar.prototype.getFirstDayInfo = function(): number {
    let firstDay: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); 
    let dayOfWeek: number = firstDay.getDay() === 0 ?  6 : firstDay.getDay() - 1;
    return dayOfWeek;
}

Calendar.prototype.getMonthName = function(): string {
    let monthName: string =  this.currentDate.toLocaleString('en-GB', {
        month: "long",
        year: "numeric"
    });
    return monthName;
}