import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const data = {
                    username: credentials.email,
                    password: credentials.password
                }
                
                const response = await fetch(`http://localhost:8080/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                const res = await response.json();

                if (!res.data) {
                    throw new Error(res.message);
                }

                return {
                    user: res.data.user,
                    jwt: res.data.token
                };
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user.jwt;
                token.user = user.user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken;
            session.user = token.user;
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
