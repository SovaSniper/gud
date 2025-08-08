// import * as dotenv from "dotenv"
// import { defineConfig } from "drizzle-kit";

// dotenv.config({
//     path: `.env.local`,
//     quiet: true,
// })

// /**
//  * Requires install packages: drizzle-orm drizzle-kit
//  */
// export default defineConfig({
//     out: "./lib/database/drizzle",
//     dialect: "postgresql",
//     schema: "./lib/database/schema.ts",

//     dbCredentials: {
//         url: process.env.DATABASE_URL_KIT!,
//     },

//     schemaFilter: "public",
//     tablesFilter: "*",

//     introspect: {
//         casing: "preserve",
//     },
// });
