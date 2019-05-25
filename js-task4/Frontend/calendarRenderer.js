function CalendarRenderer() {

}

CalendarRenderer.prototype._createCalendar = function(calendar, view) {
    var handlers = new Handlers();

    view.createBody();
    view.drawMonth(calendar);
    view.drawDays(calendar);
    
    handlers.setHandlers(calendar, view, this);
}

CalendarRenderer.prototype._updateCalendar = function(calendar, view) {
    view.drawMonth(calendar);
    view.drawDays(calendar);
}