import { DateTime } from "../types/time";

export type CalendarEvent = {
    uid?: string;
    summary: string;
    description?: string;
    location: string;
    start: DateTime;
    end: DateTime;
}