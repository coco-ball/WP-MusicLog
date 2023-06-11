// import {
//   redirectToAuthCodeFlow,
//   getAccessToken,
// } from "../../pages/api/apiConnect";
import { useEffect, useState } from "react";
import { play, pause } from "../../pages/api/playback";
import Player from "./Player";
import { useSession } from "next-auth/react";

// const clientId = process.env.SPOTIFY_CLIENT_ID;
// const params = new URLSearchParams(window.location.search);
// const code = params.get("code");

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
      console.log(access_token);
      setToken(access_token);
    }
  };

  useEffect(() => {
    getToken();
  }, [session]);

  // if (!code) {
  //   redirectToAuthCodeFlow(clientId);
  // } else {
  //   const getToken = async () => {
  //     const accessToken = await getAccessToken(clientId, code);
  //     console.log(accessToken);
  //     setToken(accessToken);
  //   };
  // }

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
      const myToken =
        "BQB-1qyOIzz03P7XLmZPV9seyiRNfn_fnkiB_N4YN4rHgAprZi6rex8lAgNwstjM8Pibra6bNo3CEZX9j40GxrlRfA_4oXT1GP4MAj1BIB2N_pnpXsc3u_D3i81QDtEZ66bhyptxdwEAFc6aRPMyv3Gxy8gWaapaPXBYhKTvhjQ7mjwEbW2I-y1Mza3DNtGCtVcbrzxp-9-nU7kL33PmyGSzHgqUv0l9";
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          // console.log("refreshtoken " + session.token.accessToken);
          // console.log("accesstoken " + session.token.token);
          // setToken(session.token.token);
          console.log("propstoken " + token);
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
          console.log(state);
          return;
        }
        console.log(state);
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setPosition(state.position);
      });

      player.addListener("initialization_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("authentication_error", ({ message }) => {
        console.error(message);
      });

      player.addListener("account_error", ({ message }) => {
        console.error(message);
      });

      player.connect();
    };

    return () => {
      setReady(false);
    };
  }, [session]);

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
