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

export function durationAsString(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours}h ${minutes}m`;
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