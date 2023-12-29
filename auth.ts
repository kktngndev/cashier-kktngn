import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { SupabaseAdapter } from '@auth/supabase-adapter';
import * as jwt from "jose";
import { NextResponse } from "next/server";

export const { auth, handlers: { GET, POST } } = NextAuth({
  providers: [
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      authorization: {
        params: {
          prompt: 'consent',
          response_type: 'code',
        }
      }
    }),
  ],
  adapter: SupabaseAdapter({
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    secret: `${process.env.SUPABASE_SECRET_KEY}`,
  }),
  callbacks: {
    async session({ session, user }) {
      const signSecret = new TextEncoder().encode(process.env.SUPABASE_JWT_KEY);
      if (signSecret) {
        const payload = {
          aud: 'authenticated',
          sub: user.id,
          email: user.email,
          role: 'authenticated'
        }
        session.supabaseAccessToken = await new jwt.SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).sign(signSecret);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if(url.startsWith('/')) return `${baseUrl}${url}`
      else if(new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async authorized({ auth, request }) {
      if (request.method === 'POST') {
        const { authToken } = await request.json() ?? {};
        if(authToken) return true;
        return NextResponse.json('Invalid token', { status: 401 });
      }
      return !!auth?.user;
    }
  }
})