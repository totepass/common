import { DateTime } from "./time";
import { Address } from "./geo";

export type Transit = {
    type: "Car" | "Bus" | "Train" | "Public transit" | "Other";
    name: string;
    to: Address;
    from: Address;
    departure: DateTime;
    arrival: DateTime;
	duration?: number;
    distance?: number;
};
