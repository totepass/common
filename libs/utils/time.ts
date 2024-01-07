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