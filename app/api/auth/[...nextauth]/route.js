// pages/api/auth/[...nextauth].js (or app/api/auth/[...nextauth]/route.js)
import NextAuth from "nextauth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  session: {
    // This enforces database-less, cookie-based sessions
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the Spotify access token to the token right after sign in
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send the access token to the client so you can make Spotify API calls
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
