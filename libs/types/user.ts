export type User = {
  id: string;
  address?: {
    address: string;
    city: string;
    countryCode: string;
    coordinates: [number, number];
  };
  avatar?: string;
  email: string;
  invite?: string;
  language: "es" | "en" | string;
  name: string;
  password?: string;
  passwordConfirm?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
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