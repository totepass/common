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
        let calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Totepass//App//EN
METHOD:REQUEST
NAME:${this.name}
X-WR-CALNAME:${this.name}
${this._renderTimezones()}
${this._renderEvents()}
END:VCALENDAR`;

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
        eventString += `UID:d4479a3f-b4f7-4b11-81ca-c1c42e4e9a45\n`;
        eventString += `SUMMARY:${event.summary}\n`;
        eventString += `DTSTAMP;${this._dateTimeToiCalDateTimeString(dtStamp)}\n`;
        eventString += `DTSTART;${this._dateTimeToiCalDateTimeString(event.start)}\n`;
        eventString += `DTEND;${this._dateTimeToiCalDateTimeString(event.end)}\n`;
        eventString += `LOCATION:${event.location}\n`;
        eventString += `X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="${event.location}";X-APPLE-RADIUS=72;X-TITLE=${event.location}\n`;
        eventString += `DESCRIPTION:Apple Maps: https://maps.apple.com/?q=${event.location}\n\n`;
        eventString += ` Google Maps: https://google.com/maps?q=${event.location}\n`;
        if (event.description) {
            eventString += ` ${event.description.replace(/\n/g, "\n ")}\n`;
        }
        eventString += `TRANSP:OPAQUE\n`;
        eventString += `SEQUENCE:1\n`;
        eventString += this._renderAlarms();
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
