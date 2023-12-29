import NextAuth, { DefaultSession } from "next-auth";

declare module 'next-auth'{
  interface Session {
    supabaseAccessToken?: string;
    user: {
      email: string;
    } & DefaultSession['user'];
  }
}