import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: "Iv23limpkDlTONRaIGVg",
      clientSecret: "512be014ab40ebd2ada5a14a71c14157e4f3bf4a",
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      console.log(session, token);
      session.user.name = `${session?.user?.name}_${token?.sub}`;
      return session;
    },
  },
  secret: "default_secret_key",
};

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
