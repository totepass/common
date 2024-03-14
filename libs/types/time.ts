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
        object.date.match(/^\d{4}-\d{2}-\d{2}$/) !== null &&
        typeof object.time === "string" &&
        object.time.match(/^\d{2}:\d{2}(:\d{2})?$/) !== null &&
        typeof object.tz === "string" &&
        object.tz.split("/").length === 2
    );
}
