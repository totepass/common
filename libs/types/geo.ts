export type Address = {
    id: string;
    name: string;
    coordinates: [number, number];
    address: {
        address: string;
        city: string;
        zip: string;
        region: string;
        country: string;
        countryCode: string;
    };
    timezone: string;
    context?: { [key: string]: any };
};

export function isAddress(object: any) {
    return (
        typeof object === "object" &&
        typeof object.id === "string" &&
        object.id.trim() !== "" &&
        typeof object.name === "string" &&
        object.name.trim() !== "" &&
        object.coordinates &&
        object.coordinates.length === 2 &&
        typeof object.coordinates[0] === "number" &&
        typeof object.coordinates[1] === "number" &&
        typeof object.address === "object" &&
        typeof object.address.address === "string" &&
        object.address.address.trim() !== "" &&
        typeof object.address.city === "string" &&
        object.address.city.trim() !== "" &&
        typeof object.address.zip === "string" &&
        object.address.zip.trim() !== "" &&
        typeof object.address.region === "string" &&
        object.address.region.trim() !== "" &&
        typeof object.address.country === "string" &&
        object.address.country.trim() !== "" &&
        typeof object.address.countryCode === "string" &&
        object.address.countryCode.length === 2 &&
        typeof object.timezone === "string" &&
        object.timezone.split("/").length === 2 &&
        (typeof object.context === "object" || typeof object.context === "undefined")
    );
}
