function CalendarRenderer(): void {

}

CalendarRenderer.prototype._createCalendar = function(calendar, view): void {
    let handlers: any = new Handlers();

    view.createBody();
    view.drawMonth(calendar);
    view.drawDays(calendar);
    
    handlers.setHandlers(calendar, view, this);
}

CalendarRenderer.prototype._updateCalendar = function(calendar, view): void {
    view.drawMonth(calendar);
    view.drawDays(calendar);
}