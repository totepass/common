import tz from "@touch4it/ical-timezones";
import { DateTime } from "../types/time";
import { CalendarEvent } from "./types";
import { v4 as uuidv4 } from "uuid";

export class Calendar {
    name: string;
    events: CalendarEvent[];

    constructor(name: string) {
        this.name = name;
        this.events = [];
    }

    addEvent(event: CalendarEvent) {
        event.uid = uuidv4();
        this.events.push(event);
    }

    removeEvent(uid: string) {
        this.events = this.events.filter((event) => event.uid !== uid);
    }

    removeEvents(summary: string) {
        this.events = this.events.filter((event) => event.summary !== summary);
    }

    getEvents() {
        return this.events;
    }

    renderCalendar() {
        let calendar = `BEGIN:VCALENDAR\n`;
        calendar += `VERSION:2.0\n`;
        calendar += `PRODID:-//Totepass//App//EN\n`;
        calendar += `NAME:${this.name}\n`;
        calendar += this._renderTimezones();
        calendar += this._renderEvents();
        calendar += `END:VCALENDAR\n`;

        // Remove empty lines
        calendar = calendar.replace(/^\s*[\r\n]/gm, "");

        return calendar;
    }

    _dateTimeToiCalDateTimeString(dateTime: DateTime) {
        return `TZID=${dateTime.tz}:${dateTime.date.replace(/-/g, "")}T${dateTime.time.replace(/:/g, "")}00`;
    }

    _renderEvents() {
        return this.events.map((event) => this._renderEvent(event)).join("\n");
    }

    _renderEvent(event: CalendarEvent) {
        const dtStamp: DateTime = {
            date: "2024-01-01",
            time: "00:00",
            tz: "Europe/Madrid",
        };

        let eventString = "BEGIN:VEVENT\n";
        eventString += `UID:${event.uid}\n`;
        eventString += `SUMMARY:${event.summary}\n`;
        eventString += `DTSTAMP;${this._dateTimeToiCalDateTimeString(dtStamp)}\n`;
        eventString += `DTSTART;${this._dateTimeToiCalDateTimeString(event.start)}\n`;
        eventString += `DTEND;${this._dateTimeToiCalDateTimeString(event.end)}\n`;
        eventString += `TRANSP:OPAQUE\n`;
        eventString += `SEQUENCE:1\n`;
        eventString += this._renderAlarms();
        if (event.location) {
            eventString += `LOCATION:${event.location.location}\n`;
            eventString += `DESCRIPTION:Apple Maps: https://maps.apple.com/?q=${encodeURIComponent(
                event.location.location
            )}\\n\n`;
            eventString += ` Google Maps: https://google.com/maps?q=${encodeURIComponent(
                event.location.location
            )}\\n\\n\n`;
            if (event.description) {
                eventString += ` ${event.description.replace(/\n/g, "\n ")}\n`;
            }
            eventString += `GEO:${event.location.coordinates[0]};${event.location.coordinates[1]}\n`;
            eventString += `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="${event.location.location}";\n`;
            eventString += ` X-APPLE-RADIUS=72;X-TITLE="${event.location.name}":geo:${event.location.coordinates[0]},${event.location.coordinates[1]}\n`;
        } else {
            if (event.description) {
                eventString += `DESCRIPTION:${event.description.replace(/\n/g, "\n ")}\n`;
            }
        }
        eventString += `END:VEVENT\n`;

        return eventString;
    }

    _renderAlarms() {
        let alarmString = `BEGIN:VALARM\n`;
        alarmString += `ACTION:DISPLAY\n`;
        alarmString += `DESCRIPTION:Reminder\n`;
        alarmString += `TRIGGER:PT0S\n`;
        alarmString += `END:VALARM\n`;
        alarmString += `BEGIN:VALARM\n`;
        alarmString += `ACTION:DISPLAY\n`;
        alarmString += `DESCRIPTION:Reminder\n`;
        alarmString += `TRIGGER;RELATED=START:-PT3H\n`;
        alarmString += `END:VALARM\n`;
        alarmString += `BEGIN:VALARM\n`;
        alarmString += `ACTION:DISPLAY\n`;
        alarmString += `DESCRIPTION:Reminder\n`;
        alarmString += `TRIGGER;RELATED=START:-PT30M\n`;
        alarmString += `END:VALARM\n`;

        return alarmString;
    }

    _renderTimezones() {
        let timezonesArrayStart = this.events.map((event) => event.start.tz);
        let timezonesArrayEnd = this.events.map((event) => event.end.tz);
        let timezonesArray = timezonesArrayStart.concat(timezonesArrayEnd);
        timezonesArray = timezonesArray.filter((timezone, index) => timezonesArray.indexOf(timezone) === index);

        let timezones: string[] = [];
        for (const timezone of timezonesArray) {
            const icalTz = tz.getVtimezoneComponent(timezone);
            if (icalTz) {
                timezones.push(icalTz);
            }
        }

        return timezones.join("\n");
    }
}
