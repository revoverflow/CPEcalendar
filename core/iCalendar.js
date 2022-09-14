class Calendar {

    constructor() {
        this._events = [];
    }

    addEvent(event) {
        this._events.push(event);
    }

    getEvents() {
        return this._events;
    }

    toString() {
        let ical = `BEGIN:VCALENDAR\r
VERSION:2.0\r
PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r
CALSCALE:GREGORIAN\r
METHOD:PUBLISH\r`;

        this._events.forEach(event => {
            ical += event.toString();
        });

        ical += 'END:VCALENDAR\r';
        return ical;
    }

}

class Event {

    constructor(id, summary, description, location, start, end, allDay) {
        this._id = id;
        this._summary = summary;
        this._description = description;
        this._location = location;
        this._start = start;
        this._end = end;
        this._allDay = allDay;
    }

    setID(id) {
        this._id = id;
    }

    setSummary(summary) {
        this._summary = summary;
    }

    setDescription(description) {
        this._description = description;
    }

    setLocation(location) {
        this._location = location;
    }

    setStart(start) {
        this._start = start;
    }

    setEnd(end) {
        this._end = end;
    }

    setAllDay(allDay) {
        this._allDay = allDay;
    }

    toString() {
        let start = this._start;
        let end = this._end;

        // Set the timezone to UTC
        start = new Date(start.getTime() + start.getTimezoneOffset() * 60 * 1000);
        end = new Date(end.getTime() + end.getTimezoneOffset() * 60 * 1000);
        
        let startString = start.getFullYear() + ('0' + (start.getMonth() + 1)).slice(-2) + ('0' + start.getDate()).slice(-2) + 'T' + ('0' + start.getHours()).slice(-2) + ('0' + start.getMinutes()).slice(-2) + ('0' + start.getSeconds()).slice(-2) + 'Z';
        let endString = end.getFullYear() + ('0' + (end.getMonth() + 1)).slice(-2) + ('0' + end.getDate()).slice(-2) + 'T' + ('0' + end.getHours()).slice(-2) + ('0' + end.getMinutes()).slice(-2) + ('0' + end.getSeconds()).slice(-2) + 'Z';

        let event = `BEGIN:VEVENT\r
UID:${this._id}\r
SUMMARY:${this._summary}\r
DESCRIPTION:${this._description}\r
LOCATION:${this._location}\r
DTSTART:${startString}\r
DTEND:${endString}\r
DTSTAMP:${new Date().toISOString()}\r
END:VEVENT\r`;

        return event;
    }
}

module.exports = {
    Calendar,
    Event
};