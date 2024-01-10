import { DateTime, isDateTime } from "./time";

export type Train = {
    number: {
        operator: string;
        number: string;
    };
    to: Station;
    from: Station;
    departure: DateTime;
    arrival: DateTime;
    status: "scheduled" | "en-route" | "delayed" | "cancelled";
};

export function isTrain(object: any) {
    return (
        typeof object === "object" &&
        typeof object.number === "object" &&
        typeof object.number.operator === "string" &&
        typeof object.number.number === "string" &&
        isStation(object.to) &&
        isStation(object.from) &&
        isDateTime(object.departure) &&
        isDateTime(object.arrival) &&
        typeof object.status === "string"
    );
}

export type Station = {
    name: string;
    address: string;
    city: string;
    country: string;
    elevation: number;
    lat: number;
    lon: number;
    tz: string;
};

export function isStation(object: any) {
    return (
        typeof object === "object" &&
        typeof object.name === "string" &&
        typeof object.address === "string" &&
        typeof object.city === "string" &&
        typeof object.country === "string" &&
        typeof object.elevation === "number" &&
        typeof object.lat === "number" &&
        typeof object.lon === "number" &&
        typeof object.tz === "string"
    );
}
