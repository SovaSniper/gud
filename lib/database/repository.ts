import { MongoClient, ServerApiVersion } from "mongodb";

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

        console.log(this.client)
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

    async storeUser(userData: any) {
        const db = await this.context();
        const users = db.collection("users");

        const existing = await users.findOne({ email: userData.email });
        if (existing) throw new Error("Email already registered");

        const result = await users.insertOne({
            ...userData,
            createdAt: new Date(),
        });

        return result.insertedId;
    }

    async getUser(email: string) {
        const db = await this.context();
        const users = db.collection("users");

        const user = await users.findOne({ email });
        if (!user) throw new Error("User not found");

        return user
    }

    async emailExists(email: string): Promise<boolean> {
        const db = await this.context();
        const users = db.collection("users");

        const user = await users.findOne({ email });
        return !!user;
    }
} 