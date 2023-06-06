import { useEffect, useState } from "react";
import { play, pause } from "../../pages/api/playback";
import Player from "./Player";
import { useSession } from "next-auth/react";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const WebPlayback = () => {
  const [token, setToken] = useState();
  const [player, setPlayer] = useState(null);
  const [is_paused, setPaused] = useState(true);
  const [is_ready, setReady] = useState(false);
  const [current_track, setTrack] = useState(track);
  const [current_position, setPosition] = useState(0);
  const [device_id, setId] = useState("");

  const { data: session } = useSession();

  const getToken = async () => {
    const res = await fetch("/api/getToken");
    if (res.status != 200) {
    } else {
      const { access_token } = await res.json();
      setToken(access_token);
    }
  };

  useEffect(() => {
    getToken();
  }, [session.session.user.name]);

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

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          // Run code to get a fresh access token
          console.log("token " + token);

          cb(token);
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
      });

      player.connect();
    };

    return () => {
      setReady(false);
    };
  }, [token]);

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
};

export default WebPlayback;
