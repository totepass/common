import { DateTime } from "../types/time";

export type CalendarEvent = {
    uid?: string;
    summary: string;
    description?: string;
    location?: {
        name: string;
        location: string;
        coordinates: number[];
    };
    start: DateTime;
    end: DateTime;
}