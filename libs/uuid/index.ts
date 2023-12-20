
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