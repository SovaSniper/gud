import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      handler?: string;
      email?: string;
      name?: string;
    };
  }

  interface JWT {
    id: string;
    handler: string;
  }

  interface User {
    handler: string;
  }
}
