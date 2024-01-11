import { tzlib_get_ical_block } from "timezones-ical-library";
import { DateTime } from "../types/time";
import { CalendarEvent } from "./types";
import uuid from "uuid";

export class Calendar {
    name: string;
    events: CalendarEvent[];

    constructor(name: string) {
        this.name = name;
        this.events = [];
    }

    addEvent(event: CalendarEvent) {
        event.uid = uuid.v4();
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
        calendar += "END:VCALENDAR`;
    }

    _dateTimeToiCalDateTimeString(dateTime: DateTime) {
        return `TZID=${dateTime.tz}:${dateTime.date}T${dateTime.time}00`;
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
        DESCRIPTION:Apple Maps: https://maps.apple.com/?q=${event.location}\n\n
         Google Maps: https://google.com/maps?q=${event.location}
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
        let timezonesArray = this.events.map((event) => event.start.tz);
        timezonesArray = [...new Set(timezonesArray)];

        let timezones: string[] = [];
        for (const timezone of timezonesArray) {
            timezones.push(tzlib_get_ical_block(timezone)[1])
        }

        return timezones.join("\n");
    }
}
