import { DateTime } from "./time";

export type Flight = {
	number: {
        operator: Airline['iata'];
        number: string;
    };
	to: string | Airport;
	from: string | Airport;
	departure: DateTime;
	arrival: DateTime;
};

export type Airline = {
	name: string;
	iata: string;
	country: string;
	icao: string;
	callsign?: string;
	alias?: string;
};

export type Airport = {
	icao: string;
	iata: string;
	name: string;
	city: string;
	state: string;
	country: string;
	elevation: number;
	lat: number;
	lon: number;
	tz: string;
};