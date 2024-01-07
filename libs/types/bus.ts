import { DateTime } from "./time";
import { Station } from "./train";

export type Bus = {
	number: string;
	to: Station;
	from: Station;
	departure: DateTime;
	arrival: DateTime;
};