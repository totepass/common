export type User = {
    id: string;
    email: string;
    language: "es" | "en" | string;
    name: string;
    surname: string;

    address?: {
        address: string;
        city: string;
        countryCode: string;
        coordinates: [number, number];
    };
    avatar?: string;
    invite?: string;
    password?: string;
    passwordConfirm?: string;
    verified?: boolean;
    calendarId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
};

export type Session = {
    id: number;
    userId: string;
    token: string;
    refreshToken: string;
    expiresAt: Date;
    createdAt: Date;
};
