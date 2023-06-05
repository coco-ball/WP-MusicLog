import { useEffect, useState } from "react";
import Player from "./Player";
import { play, pause } from "@/pages/api/playback";
import { useToken } from "./contexts/TokenContext";
import { useSession } from "next-auth/react";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

//data지움

export default function WebPlayback() {
  //   const [token, setToken] = useState([]);
  const [player, setPlayer] = useState(null);
  const [is_ready, setReady] = useState([false]);
  const [is_paused, setPaused] = useState([true]);
  const [device_id, setId] = useState("");
  const [current_track, setTrack] = useState([]);
  const [current_position, setPosition] = useState([]);
  const [current_duration, setDuration] = useState([]);
  const token = useToken();

  //   const { data } = useSession();
  //   const { accessToken } = data;
  //   const token = { accessToken };
  //   console.log("token" + token);

  //   const getToken = async () => {
  //     const res = await fetch("/api/getToken");
  //     if (res.status != 200) {
  //     } else {
  //       const { access_token } = await res.json();
  //       console.log("debug_token", access_token);
  //       setToken(access_token);
  //     }
  //   };

  //   useEffect(() => {
  //     getToken();
  //   }, [token]);

  const onPlay = (uri) => {
    if (uri === undefined) {
      play({
        spotify_uri: uri,
        device_id,
        position: current_position,
        playerInstance: player,
      });
    }
    play({
      spotify_uri: uri,
      device_id,
      position: current_position,
      playerInstance: player,
    });
  };

  const onPause = () => {
    pause({ device_id, playerInstance: player });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    a;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token?.replace(/\"/g, ""));
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setId(device_id);
        setReady(true);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setPosition(state.position);
        setDuration(state.duration);
      });

      player.connect();
    };
    return () => {
      setReady(false);
    };
  }, [token]);

  //   console.log("player" + player);
  //   console.log("is_ready" + is_ready);
  //   console.log("is_paused" + is_paused);
  //   console.log("device_id" + device_id);
  //   console.log("current_track" + current_track);
  //   console.log("current_position" + current_position);
  //   console.log("token" + token);

  return (
    <div>
      {is_ready && (
        //   <Playlist onPlay={onPlay}></Playlist>
        <Player>
          onPlay={onPlay}
          onPause={onPause}
          is_paused={is_paused}
          current_track={current_track}
        </Player>
      )}
    </div>
  );
}
