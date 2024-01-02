import en from "./en.json";
import es from "./es.json";

export const countries = Object.fromEntries(
    en.map((country) => {
        return [
            country.alpha2,
            {
                alpha3: country.alpha3,
                name: {
                    en: country.name,
                    es: es.find((c) => c.alpha2 === country.alpha2)?.name || country.name,
                },
            },
        ];
    })
);
