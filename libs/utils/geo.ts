/**
 * Validates a pair of coordinates
 * @param c `[latitude, longitude]` pair of coordinates
 * @returns `true` if the coordinates are valid
 * @throws `Error` if the coordinates are invalid
 */
export function validateCoordinates(c: number[]) {
    if (c.length !== 2) {
        throw new Error("Invalid coordinates");
    }
    if (c[0] < -90 || c[0] > 90) {
        throw new Error("Invalid latitude");
    }
    if (c[1] < -180 || c[1] > 180) {
        throw new Error("Invalid longitude");
    }

    return true;
}

/**
 * Calculates the distance between two coordinates
 * @param c1 `[latitude, longitude]` pair of coordinates
 * @param c2 `[latitude, longitude]` pair of coordinates
 * @returns the distance in metres
 * @throws `Error` if the coordinates are invalid
 */
export function calculateDistance(c1: number[], c2: number[]) {
    validateCoordinates(c1);
    validateCoordinates(c2);

    const [lat1, lon1] = c1;
    const [lat2, lon2] = c2;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
}
