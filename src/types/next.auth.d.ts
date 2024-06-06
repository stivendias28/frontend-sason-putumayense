import "next-auth";

declare module "next-auth" {
    interface Session {
        user: User;
        expires: string;
        accessToken: string;
    }
}

interface User {
    id: number;
    name: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    identificationType: String;
    identificationNumber: String;
    email: String;
    rol: String;
    phone: String;
    gender: String;
    photo: String;
}