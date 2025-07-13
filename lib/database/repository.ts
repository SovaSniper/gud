import { MongoClient, ObjectId, ServerApiVersion, WithId } from "mongodb";
import { User } from "../models/user";
import { Event } from "../models/event";

export class DatabaseRepository {
    public client: MongoClient

    constructor(uri: string) {
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    async context() {
        return this.client.db(); // default DB from connection string
    }

    async run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }

    async storeUser(userData: User) {
        const db = await this.context();
        const users = db.collection<User>("users");

        const existing = await users.findOne({ email: userData.email });
        if (existing) throw new Error("Email already registered");

        const result = await users.insertOne({
            ...userData,
            createdAt: new Date(),
        });

        return result.insertedId;
    }

    async getUserById(id: string): Promise<WithId<User> | null> {
        const db = await this.context();
        const users = db.collection<User>("users");

        const objectId = new ObjectId(id);
        const result = await users.findOne({ _id: objectId });
        if (!result) return null;

        return result
    }

    async getUser(handler: string): Promise<WithId<User> | null> {
        const db = await this.context();
        const users = db.collection<User>("users");

        const result = await users.findOne({ handler });
        if (!result) return null;

        return result
    }

    async getUserByEmail(email: string) {
        const db = await this.context();
        const users = db.collection("users");

        const user = await users.findOne({ email });
        if (!user) throw new Error("User not found");

        return user
    }

    async emailExists(email: string, handler: string): Promise<{ emailExist: boolean, handlerExist: boolean }> {
        const db = await this.context();
        const users = db.collection("users");

        const matches = await users.find({
            $or: [{ email }, { handler }]
        }).toArray();

        let emailExist = false;
        let handlerExist = false;

        for (const user of matches) {
            if (user.email === email) emailExist = true;
            if (user.handler === handler) handlerExist = true;
        }

        return { emailExist, handlerExist };
    }

    async storeEvent(email: Event) {
        const db = await this.context();
        const events = db.collection<Event>("events");

        const result = await events.insertOne({
            ...email,
            createdAt: new Date(),
        });

        return result.insertedId;
    }

    async getEventById(id: string) {
        const db = await this.context();
        const events = db.collection<Event>("events");

        const result = await events.findOne({ sharableId: id });

        return result;
    }

    async getPublicEventsByCreator(creatorId: string) {
        const db = await this.context();
        const events = db.collection<Event>("events");

        const results = await events.find({
            creatorId,
            visibility: "PUBLIC",
        }).toArray();

        return results;
    }
} 