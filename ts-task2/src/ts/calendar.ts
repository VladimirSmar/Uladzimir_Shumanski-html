class Calendar {
    currentDate: Date;

    constructor() {
        this.currentDate =  new Date();  
    }

    getCalendarDate = function(): Date {
        return this.currentDate;
    }
    
    getDaysInMonthCount = function() : number {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    }
    
    getDaysInPreviousMonthCount = function(): number {
        return new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    }
    
    getTodayDay = function(): number {
        return new Date().getDate();
    }
    
    isToday = function(): number | boolean {
        let isEqual: boolean = new Date().getFullYear() === this.currentDate.getFullYear() && new Date().getMonth() === this.currentDate.getMonth();
        return (isEqual) ? this.getTodayDay() : isEqual;  
    }
    
    setNextMonth = function(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    }
    
    setCurrentMonth = function(): void {
        this.currentDate =  new Date();
    }
    
    setPreviousMonth = function(): void {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    }
    
    getFirstDayInfo = function(): number {
        let firstDay: Date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1); 
        let dayOfWeek: number = firstDay.getDay() === 0 ?  6 : firstDay.getDay() - 1;
        return dayOfWeek;
    }
    
    getMonthName = function(): string {
        let monthName: string =  this.currentDate.toLocaleString('en-GB', {
            month: "long",
            year: "numeric"
        });
        return monthName;
    }
}