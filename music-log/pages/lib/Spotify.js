const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYBACKSTATE_ENDPOINT = "https://api.spotify.com/v1/me/player";
const CURRENTUSER_ENDPOINT = "https://api.spotify.com/v1/me";
// const PLAY_ENDPOINT = "https://api.spotify.com/v1/me/player/play";

export const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  console.log("getUsersPlaylists in lib activated");
  const { access_token } = await getAccessToken(refresh_token);
  const response = await fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playback state");
  }
  return response;
};

export const getUsersPlayState = async (refresh_token) => {
  console.log("getUsersPlayState in lib activated");
  const { access_token } = await getAccessToken(refresh_token);
  const response = await fetch(PLAYBACKSTATE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playback state");
  }
  return response;
};

export const getCurrentUser = async (refresh_token) => {
  console.log("getUsersCurrentUser in lib activated");
  const { access_token } = await getAccessToken(refresh_token);
  const response = await fetch(CURRENTUSER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Current User");
  }
  return response;
};

// export const getOAuthToken = async (refresh_token) => {
//   const { access_token } = await getAccessToken(refresh_token);
//   const response = await fetch(
//     `https://api.spotify.com/v1/me/player/play?device_id=${client_id}`,
//     {
//       method: "PUT",
//       body: JSON.stringify({ uris: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr" }),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );
//   console.log("response" + response);

//   if (!response.ok) {
//     throw new Error("Failed to fetch Current User");
//   }
//   return response;
// };

console.log(getAccessToken());
