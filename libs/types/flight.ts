import { DateTime, isDateTime } from "./time";

export type Flight = {
    number: {
        operator: Airline["iata"];
        number: string;
    };
    to: Airport;
    from: Airport;
    departure: DateTime;
    arrival: DateTime;
    status: "scheduled" | "en-route" | "delayed" | "cancelled";
};

export function isFlight(object: any) {
    return (
        typeof object === "object" &&
        typeof object.number === "object" &&
        typeof object.number.operator === "string" &&
        typeof object.number.number === "string" &&
        isAirport(object.to) &&
        isAirport(object.from) &&
        isDateTime(object.departure) &&
        isDateTime(object.arrival) &&
        typeof object.status === "string"
    );
}

export type Airline = {
    name: string;
    iata: string;
    country: string;
    icao: string;
    callsign?: string;
    alias?: string;
};

export function isAirline(object: any) {
    return (
        typeof object === "object" &&
        typeof object.name === "string" &&
        typeof object.iata === "string" &&
        typeof object.country === "string" &&
        typeof object.icao === "string" &&
        typeof object.callsign === "string" &&
        typeof object.alias === "string"
    );
}

export type Airport = {
    icao: string;
    iata: string;
    name: string;
    city: string;
    country: string;
    elevation: number;
    lat: number;
    lon: number;
    tz: string;
};

export function isAirport(object: any) {
    return (
        typeof object === "object" &&
        typeof object.icao === "string" &&
        typeof object.iata === "string" &&
        typeof object.name === "string" &&
        typeof object.city === "string" &&
        typeof object.country === "string" &&
        typeof object.elevation === "number" &&
        typeof object.lat === "number" &&
        typeof object.lon === "number" &&
        typeof object.tz === "string"
    );
}
