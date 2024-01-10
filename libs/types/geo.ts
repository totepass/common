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
    context: { [key: string]: any };
};

export function isAddress(object: any) {
    return (
        typeof object === "object" &&
        typeof object.id === "string" &&
        typeof object.name === "string" &&
        object.coordinates &&
        object.coordinates.length === 2 &&
        typeof object.coordinates[0] === "number" &&
        typeof object.coordinates[1] === "number" &&
        typeof object.address === "object" &&
        typeof object.address.address === "string" &&
        typeof object.address.city === "string" &&
        typeof object.address.zip === "string" &&
        typeof object.address.region === "string" &&
        typeof object.address.country === "string" &&
        typeof object.address.countryCode === "string" &&
        typeof object.timezone === "string" &&
        typeof object.context === "object"
    );
}
