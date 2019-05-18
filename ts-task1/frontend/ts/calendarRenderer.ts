class CalendarRenderer{

    constructor() {}

    _createCalendar = function(calendar: Calendar, view: DatepickerRenderer): void {
        let handlers: Handlers = new Handlers();
    
        view.createBody();
        view.drawMonth(calendar);
        view.drawDays(calendar);
        
        handlers.setHandlers(calendar, view, this);
    }
    
    _updateCalendar = function(calendar: Calendar, view: DatepickerRenderer): void {
        view.drawMonth(calendar);
        view.drawDays(calendar);
    }
}