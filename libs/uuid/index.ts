import { randomInteger } from "../utils/numbers";

/**
 * Generates a UUID. The UUID follows the format of year-month-day-randomHex.
 * @returns `string` The generated UUID.
 */
export function UUID() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Random hex goes from 00000000 to FFFFFFFF
    const random = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');

    return `${year}-${month}-${day}-${random}`;
}

/**
 * Generates a UUID for a trip. The UUID follows the format of [A-Z][0-9A-Z][0-9]{3,6}
 * @returns `string` The generated UUID.
 */
export function tripUUID() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersNumbers = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const badWords = [
        "AF",
        "BJ",
        "BW",
        "CK",
        "CM",
        "CU",
        "FG",
        "FK",
        "GY",
        "HP",
        "KK",
        "NG",
        "PN",
        "PT",
        "SH",
    ] 

    let tripCarrier = "";
    do {
        tripCarrier = letters[randomInteger(0, letters.length - 1)];
        tripCarrier += lettersNumbers[randomInteger(0, lettersNumbers.length - 1)];
    } while (badWords.includes(tripCarrier));

    let tripNumber = randomInteger(0, 999999).toString().padStart(6, '0');

    return `${tripCarrier}${tripNumber}`;
}