const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYBACKSTATE_ENDPOINT = "https://api.spotify.com/v1/me/player";
const CURRENTUSER_ENDPOINT = "https://api.spotify.com/v1/me";

const request = require("request"); // "Request" library

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const token = body.access_token;
    console.log("real token : " + token);
  }
});

// export async function getAccessToken2(client_id, code) {
//   const verifier = localStorage.getItem("verifier");

//   const params = new URLSearchParams();
//   params.append("client_id", client_id);
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", "http://localhost:3000/callback");
//   params.append("code_verifier", verifier);

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params,
//   });

//   const { access_token } = await result.json();
//   return access_token;
// }

// getAccessToken2(client_id);

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
  console.log("getUsersPlayState in lib activated");
  const { access_token } = await getAccessToken(refresh_token);
  const response = await fetch(CURRENTUSER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch playback state");
  }
  return response;
};
