export function toLocaleCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat("en-EN", { style: "currency", currency: currency }).format(amount);
}
