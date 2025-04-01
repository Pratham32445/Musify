import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prismaClient from "db/client"

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        async signIn({ profile }) {
            const user = await prismaClient.user.findFirst({
                where: {
                    email: profile!.email!
                }
            })
            if (!user) {
                await prismaClient.user.create({
                    data: {
                        email: profile!.email!,
                        firstName: profile!.name!.split(" ")[0]!
                    }
                })
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                const dbUser = await prismaClient.user.findFirst({
                    where: {
                        email: user.email!
                    }
                })
                token.id = dbUser?.Id;
                token.isVerified = dbUser!.isVerified!;
            }
            return token;
        },
        session({ session, token }) {
            session.user.id = token.id!;
            session.user.isVerified = token!.isVerified!;
            return session;
        }
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ]
}

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name: string
            email: string
            isVerified: boolean
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        isVerified?: boolean
    }
}