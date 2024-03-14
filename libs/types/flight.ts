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
        object.number.operator.match(/^[A-Z]{2}$/) &&
        typeof object.number.number === "string" &&
        object.number.number.match(/^\d+$/) &&
        isAirport(object.to) &&
        isAirport(object.from) &&
        isDateTime(object.departure) &&
        isDateTime(object.arrival)
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
        object.name.trim() !== "" &&
        typeof object.iata === "string" &&
        object.iata.trim() !== "" &&
        typeof object.country === "string" &&
        object.country.length === 2 &&
        typeof object.icao === "string" &&
        object.icao.trim() !== "" &&
        ((typeof object.callsign === "string" && object.callsign.trim() !== "") || object.callsign === undefined) &&
        ((typeof object.alias === "string" && object.alias.trim() !== "") || object.alias === undefined)
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
        object.icao.trim() !== "" &&
        typeof object.iata === "string" &&
        object.iata.trim() !== "" &&
        typeof object.name === "string" &&
        object.name.trim() !== "" &&
        typeof object.city === "string" &&
        object.city.trim() !== "" &&
        typeof object.country === "string" &&
        object.country.length === 2 &&
        typeof object.elevation === "number" &&
        typeof object.lat === "number" &&
        typeof object.lon === "number" &&
        typeof object.tz === "string" &&
        object.tz.split("/").length === 2
    );
}
