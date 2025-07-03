import { Api } from "@/network/axiosInstance";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 86400
    },
    providers: [
        CredentialsProvider({
            name: "Username and Password",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "admin",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password are required.");
                }
            
                try {
                    const res = await Api.post(`auth/login`, {
                        username: credentials.username,
                        password: credentials.password,
                    });
            
                    if (res.status !== 200) {
                        throw new Error("Authentication failed.");
                    }
            
                    const user = res.data;
            
                    if (user) {
                        return user;
                    } else {
                        throw new Error("Invalid user data.");
                    }
                } catch (error: any) {
                    console.log(error,'err')
                    throw new Error(error?.response?.data?.message || "Authentication failed.");
                }
            }
        }),
    ],


    callbacks: {
        async signIn() {
            return Promise.resolve(true);
        },
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                token = session;
            }

            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;

            return session;
        },
    },

    pages: {
        signIn: "/login",
        error: "/login"
    }
};