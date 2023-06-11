import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
// import { useEffect } from "react";

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing,streaming,user-read-email,user-read-private,web-playback",
      // "https://accounts.spotify.com/authorize?response_type=token&scope=user-read-email,user-read-playback-state,user-read-currently-playing,streaming,user-read-email,user-read-private,web-playback",
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      //console.log("jwt activated");
      if (account) {
        token.accessToken = account.refresh_token;
        // token.token = account.access_token;
      }
      return token;
    },
    async session(session, user) {
      console.log("nextauth file session activated");
      session.user = user;
      // session.accessToken = token.accessToken;
      // session.token = token.token;
      console.log(session);
      return session;
    },
  },
});

// export default (req, res) =>
//   NextAuth(req, res, {
//     providers: [
//       SpotifyProvider({
//         authorization:
//           "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing",
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       }),
//     ],
//     callbacks: {
//       async jwt({ token, account }) {
//         //console.log("jwt activated");
//         if (account) {
//           return {
//             ...token,
//             accessToken: account.access_token,
//             refreshToken: account.refresh_token,
//             id: account.id,
//           };
//         }
//         return token;
//       },
//       async session(session, token) {
//         console.log("nextauth file session activated");
//         session.user.accessToken = token.accessToken;
//         session.user.refreshToken = token.refreshToken;
//         // console.log(token);
//         console.log(session);
//         return session;
//       },
//     },
//   });

// export default (req, res) =>
//   NextAuth(req, res, {
//     providers: [
//       SpotifyProvider({
//         authorization:
//           "https://accounts.spotify.com/authorize?scope=user-read-email,user-read-playback-state,user-read-currently-playing,user-modify-playback-state,app-remote-control,streaming,user-read-birthdate,user-read-email,user-read-private",
//         clientId: process.env.SPOTIFY_CLIENT_ID,
//         clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
//       }),
//     ],
//     callbacks: {
//       async jwt({ token, account }) {
//         //console.log("jwt activated");
//         if (account) {
//           token.accessToken = account.access_token;
//           token.refreshToken = account.refresh_token;
//           token.id = account.id;
//         }
//         return token;
//       },
//       async session(session, user, token) {
//         console.log("nextauth file session activated");
//         session.user = session.user;
//         session.accessToken = token.acc;
//         // console.log(token);
//         console.log(session);
//         return session;
//       },
//     },
//   });

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
