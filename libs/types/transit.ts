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
    // Check that the object has the proper attributes and types
    // If type is Car or Bus, arrival is not required
    // duration and distance are optional
    return (
        typeof object === "object" &&
        typeof object.type === "string" &&
        ["Car", "Bus", "Train", "Public transit", "Other"].includes(object.type) &&
        typeof object.name === "string" &&
        object.name.trim() !== "" &&
        isAddress(object.to) &&
        isAddress(object.from) &&
        isDateTime(object.departure) &&
        (object.type === "Car" || object.type === "Bus" || isDateTime(object.arrival)) &&
        (typeof object.duration === "number" || typeof object.duration === "undefined") &&
        (typeof object.distance === "number" || typeof object.distance === "undefined")
    );
}
