// const play = ({
//   spotify_uri,
//   playerInstance: {
//     _options: { getOAuthToken },
//   },
// }) => {try {const response = await getOAuthToken},
// } = await getSession({ req });};

// play({
//   playerInstance: new Spotify.Player({ name: "..." }),
//   spotify_uri: "spotify:track:7xGfFoTpQ2E7fRF5lN10tr",
// });
import { getAccessToken } from "../lib/Spotify";

export const play = ({
  spotify_uri,
  device_id,
  position,
  playerInstance: {
    options: { getAccessToken },
  },
}) => {
  getAccessToken((access_token) => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [spotify_uri], position_ms: position }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};

export const pause = ({
  device_id,
  playerInstance: {
    options: { getAccessToken },
  },
}) => {
  getAccessToken((access_token) => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
  });
};
