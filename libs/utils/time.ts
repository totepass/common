import type { DateTime as DT } from "../types/time";
import { DateTime } from "luxon";

export function calculateDuration(start: DT, end: DT): number {
    // Clone objects to avoid mutating the original objects
    start = JSON.parse(JSON.stringify(start));
    end = JSON.parse(JSON.stringify(end));

    // Sanitize time. Make sure time is always in the format HH:MM:SS
    if (start.time.split(":").length === 2) { start.time += ":00" };
    if (end.time.split(":").length === 2) { end.time += ":00" };

    const startDate = DateTime.fromISO(`${start.date}T${start.time}`, { zone: start.tz });
    const endDate = DateTime.fromISO(`${end.date}T${end.time}`, { zone: end.tz });

    return endDate.diff(startDate).as("minutes");
}

/**
 * Convert a duration in minutes to a string
 * @param duration `number` Duration in minutes
 * @param options `object` Options for the output string
 * @param options.years `boolean` Include years in the output string
 * @param options.months `boolean` Include months in the output string
 * @param options.weeks `boolean` Include weeks in the output string
 * @param options.days `boolean` Include days in the output string
 * @param options.hours `boolean` Include hours in the output string
 * @param options.minutes `boolean` Include minutes in the output string
 * @param options.seconds `boolean` Include seconds in the output string
 * @returns `string` Duration as a string
 */
export function durationAsString(duration: number, options: {years: boolean; months: boolean; weeks: boolean; days: boolean; hours: boolean; minutes: boolean; seconds: boolean} = {
    years: false,
    months: false,
    weeks: false,
    days: false,
    hours: true,
    minutes: true,
    seconds: false
}): string {
    let output = "";
    let years = Math.floor(duration / 525600);

    if (options.years) {
        output += years + "y ";
        duration -= years * 525600;
    }

    let months = Math.floor(duration / 43800);
    if (options.months) {
        output += months + "mo ";
        duration -= months * 43800;
    }

    let weeks = Math.floor(duration / 10080);
    if (options.weeks) {
        output += weeks + "w ";
        duration -= weeks * 10080;
    }

    let days = Math.floor(duration / 1440);
    if (options.days) {
        output += days + "d ";
        duration -= days * 1440;
    }

    let hours = Math.floor(duration / 60);
    if (options.hours) {
        output += hours + "h ";
        duration -= hours * 60;
    }

    let minutes = Math.floor(duration);
    if (options.minutes) {
        output += minutes + "m ";
        duration -= minutes;
    }

    let seconds = Math.floor(duration * 60);
    if (options.seconds) {
        output += seconds + "s ";
    }

    return output.trim();
}

/**
 * Compare two DateTime objects
 * @param date1 
 * @param date2 
 * @returns -1 if date1 is before date2, 0 if they are equal, 1 if date1 is after date2
 */
export function compareTime(date1: DT, date2: DT): -1 | 0 | 1 {
    const date1Obj = DateTime.fromISO(`${date1.date}T${date1.time}`, { zone: date1.tz });
    const date2Obj = DateTime.fromISO(`${date2.date}T${date2.time}`, { zone: date2.tz });

    if (date1Obj < date2Obj) {
        return -1;
    } else if (date1Obj > date2Obj) {
        return 1;
    } else {
        return 0;
    }
}