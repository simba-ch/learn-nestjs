import { User as UserDB } from "@prisma/client";

export class User implements UserDB {
    userId: string;
    username: string;
    password: string;
    isAdmin: boolean
}