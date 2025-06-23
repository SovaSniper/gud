import { DatabaseRepository } from "./repository";

export class UserDatabase extends DatabaseRepository {
    constructor() {
        const uri = process.env.CONNECTION_STRING || "";
        super(uri);
    }
} 