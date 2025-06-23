import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.CONNECTION_STRING!);
const clientPromise = client.connect();

export default clientPromise;