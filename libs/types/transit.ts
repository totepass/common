import { DateTime, isDateTime } from "./time";
import { Address, isAddress } from "./geo";

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

export function isTransit(object: any) {
    return (
        typeof object === "object" &&
        typeof object.type === "string" &&
        typeof object.name === "string" &&
        isAddress(object.to) &&
        isAddress(object.from) &&
        isDateTime(object.departure) &&
        isDateTime(object.arrival) &&
        typeof object.duration === "number" &&
        typeof object.distance === "number"
    );
}