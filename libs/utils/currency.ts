export function toLocaleCurrency(amount: number, currency: string, locale: string = "es-ES") {
    return new Intl.NumberFormat(locale, { style: "currency", currency: currency }).format(amount / 100);
}
