export interface BusinessCard {
    id?: number;           // Optional, since it's generated by the server
    name: string;
    gender: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    address: string;
    photoBase64?: string;   // Optional, as photo upload may be skipped
}