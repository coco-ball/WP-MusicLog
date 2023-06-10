import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { useEffect } from "react";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      SpotifyProvider({
        authorization:
          "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing,user-modify-playback-state,app-remote-control,streaming,user-read-birthdate,user-read-email,user-read-private",
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        //console.log("jwt activated");
        if (account) {
          token.id = account.id;
          token.accessToken = account.accessToken;
        }
        return token;
      },
      async session(session, user, token) {
        console.log("nextauth file session activated");
        // session.user = session.user;
        // session.accessToken = token;
        // console.log(token);
        console.log(session);
        return session;
      },
    },
  });

// export default NextAuth({
//   providers: [
//     SpotifyProvider({
//       authorization:
//         "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing",
//       clientId: process.env.SPOTIFY_CLIENT_ID,
//       clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account }) {
//       //console.log("jwt activated");
//       if (account) {
//         token.accessToken = account.refresh_token;
//       }
//       return token;
//     },
//     async session(session, user) {
//       console.log("nextauth file session activated");
//       session.user = user;
//       //console.log(session);
//       return session;
//     },
//   },
// });
