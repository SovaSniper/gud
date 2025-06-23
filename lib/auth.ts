import { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/database/mongodb";
import { compare } from "bcryptjs";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const user = await client
                    .db()
                    .collection("users")
                    .findOne({ email: credentials!.email });

                if (!user || !(await compare(credentials!.password, user.password))) {
                    throw new Error("Invalid email or password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.firstname,
                };
            },
        }),
    ],
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET,
};