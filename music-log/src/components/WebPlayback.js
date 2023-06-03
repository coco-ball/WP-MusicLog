import React, { useState, useEffect } from "react";
import { play, pause } from "../../pages/api/spotifysdk.js";
import Player from "./Player";

// const WebPlayback = ({ data }) => {
//   const [player, setPlayer] = useState(null);
//   const [device_id, setId] = useState("");
//   const [ready, setReady] = useState([]);
//   const [track, setTrack] = useState([]);
//   const [paused, setPaused] = useState([]);
//   const [position, setPosition] = useState([]);
//   const [duration, setDuration] = useState([]);

//   const onPlay = (uri, is_new, position, player) => {
//     if (uri === undefined) {
//       play({
//         // spotify_uri: data[0].uri,
//         spotify_uri: uri,
//         device_id,
//         position: position,
//         playerInstance: player,
//       });
//       pause({ device_id, playerInstance: player });
//     }
//     play({
//       spotify_uri: uri,
//       device_id,
//       position: is_new ? 0 : position,
//       playerInstance: player,
//     });
//     pause({ device_id, playerInstance: player });

//     useEffect(() => {
//       const script = document.createElement("script");
//       script.src = "https://sdk.scdn.co/spotify-player.js";
//       script.async = true;

//       document.body.appendChild(script);

//       window.onSpotifyWebPlaybackSDKReady = () => {
//         const player = new window.Spotify.Player({
//           name: "Web Playback SDK",
//           getOAuthToken: (cb) => {
//             // Run code to get a fresh access token
//             cb(token?.replace(/\"/g, ""));
//           },
//           volume: 0.5,
//         });

//         setPlayer(player);

//         player.addListener("ready", ({ device_id }) => {
//           setId(device_id);
//           setReady(true);
//           api.put("https://api.spotify.com/v1/me/player", {
//             device_ids: [device_id],
//             play: false,
//           });
//           console.log("Ready with Device ID", device_id);
//         });

//         player.addListener("not_ready", ({ device_id }) => {
//           console.log("Device ID has gone offline", device_id);
//         });
//         player.addListener("player_state_changed", (state) => {
//           if (!state) {
//             return;
//           }
//           setTrack(state.track_window.current_track);
//           setPaused(state.paused);
//           setPosition(state.position);
//           setDuration(state.duration);
//         });

//         player.connect();
//       };
//     }, [token]);
//   };
//   console.log(player, device_id, ready, track, paused, position, duration);

//   return (
//     <Player
//       onPlay={onPlay}
//       track={track}
//       position={position}
//       player={player}
//     ></Player>
//   );
// };
// export default WebPlayback;

export default function WebPlayback() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(getToken());
        },
        volume: 0.5,
      });
    };

    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = "[My Spotify Web API access token]";
      const player = new Spotify.Player({
        name: "Web Playback SDK Quick Start Player",
        getOAuthToken: (cb) => {
          cb(token);
        },
      });
    };
  }, []);
}
