export type DateTime = {
    date: string;
    time: string;
    tz: string;
};

export function isDateTime(object: any) {
    if (object.date.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
        return false;
    }

    if (object.time.match(/^\d{2}:\d{2}(:\d{2})?$/) === null) {
        return false;
    }

    return (
        typeof object === "object" &&
        typeof object.date === "string" &&
        typeof object.time === "string" &&
        typeof object.tz === "string"
    );
}
