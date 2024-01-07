import { DateTime } from "./time";

export type Train = {
	number: {
        operator: string;
        number: string;
    };
	to: Station;
	from: Station;
	departure: DateTime;
	arrival: DateTime;
	status: 'scheduled' | 'en-route' | 'delayed' | 'cancelled';
};

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