import { Address, isAddress } from "./geo";
import { DateTime, isDateTime } from "./time";

export type Stay = {
    type: "Hotel" | "Hostel" | "House" | "Room" | "Other";
    name: string;
    address: Address;
    checkin: DateTime;
    checkout: DateTime;
};

export function isStay(object: any) {
    return (
        typeof object === "object" &&
        typeof object.type === "string" &&
        typeof object.name === "string" &&
        isAddress(object.address) &&
        isDateTime(object.checkin) &&
        isDateTime(object.checkout)
    );
}
