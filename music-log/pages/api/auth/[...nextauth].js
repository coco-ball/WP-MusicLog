import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      // TODO: 후에 이 부분을 추가로 수정하면 될 듯!
      authorization: 
      'https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing',
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      console.log('Async session callback', session);
      return session;
    },
  },
});