import { Transit } from "./transit";
import { Flight } from "./flight";
import { Train } from "./train";
import type { User } from "./user";

export type Trip = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    owner: User;
    currency: string;
    permission?: any;
    permissions: TripPermission[];
    files: TripFile[];
    expenses: TripExpense[];
    itineraries: TripItineraryBlock[];
};

export type TripPermission = {
    user: User;
    role: any;
};

export type TripFile = {
    id: string;
    name: string;
    path: string;
    size: number;
    mime: string;
    assignedId?: User["id"];
    itineraryBlockId?: TripItineraryBlock["id"];
    metadata?: any;
};

export type TripItineraryBlock = {
    id: string;
    type: any;
    data: Flight | Train | Transit;
};

export type TripExpense = {
    id: string;
    name: string;
    notes: string;
    amount: number;
    category: string;
    date: Date;
    payments: TripPayment[];
};

export type TripPayment = {
    id: string;
    payerId: User["id"];
    payeeId: User["id"];
    amount: number;
    date: Date;
};
