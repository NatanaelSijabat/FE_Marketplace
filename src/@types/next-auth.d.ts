import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    username: string;
    gender: string;
    firstName: string;
    lastName: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    username: string;
    gender: string;
    firstName: string;
    lastName: string;
  }
}
