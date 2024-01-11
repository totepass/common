import tz from '@touch4it/ical-timezones';
import { DateTime } from "../types/time";
import { CalendarEvent } from "./types";
import { v4 as uuidv4 } from 'uuid';

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

        return calendar;
    }

    _dateTimeToiCalDateTimeString(dateTime: DateTime) {
        return `TZID=${dateTime.tz}:${dateTime.date.replace(/-/g, '')}T${dateTime.time.replace(/:/g, '')}`;
    }

    _renderEvents() {
        return this.events.map((event) => this._renderEvent(event)).join("\n");
    }

    _renderEvent(event: CalendarEvent) {
        const dtStamp = this._dateTimeToiCalDateTimeString({
            date: "2024-01-01",
            time: "00:00",
            tz: "Europe/Madrid",
        });

        const eventString = `BEGIN:VEVENT
UID:${event.uid}
SUMMARY:${event.summary}
DTSTAMP:${dtStamp}
DTSTART:${this._dateTimeToiCalDateTimeString(event.start)}
DTEND:${this._dateTimeToiCalDateTimeString(event.end)}
LOCATION:${event.location}
X-APPLE-STRUCTURED-LOCATION;VALUE=URI;X-ADDRESS="${event.location}";X-APPLE-RADIUS=72;X-TITLE=${event.location}
DESCRIPTION:Apple Maps: https://maps.apple.com/?q=${event.location}\\n
 Google Maps: https://google.com/maps?q=${event.location}${event.description ? `\\n${event.description}` : ""}
TRANSP:OPAQUE
SEQUENCE:1
${this._renderAlarms()}
END:VEVENT`;

        return eventString;
    }

    _renderAlarms() {
        const alarm = `BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder
TRIGGER:PT0S
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder
TRIGGER;RELATED=START:-PT3H
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder
TRIGGER;RELATED=START:-PT30M
END:VALARM`;

        return alarm;
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
