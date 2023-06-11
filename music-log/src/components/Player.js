import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Player({
  onPlay,
  onPause,
  is_paused,
  current_track,
  songUri,
}) {
  const { data } = useSession();

  return (
    <body className="w-auto flex mt-8">
      <div className="flex-col justify-center w-72 mr-4 bg-white rounded p-4">
        <img
          className="w-auto mb-4 rounded"
          src={current_track?.album.images[0]?.url}
        ></img>
        <h3>{current_track?.name}</h3>
        <p>{current_track?.artists[0].name}</p>
        <div className="flex jusify-between">
          <img className="float-left" src="/playlist.svg" alt=""></img>
          <img src="/rewind.svg" alt=""></img>
          {is_paused ? (
            <button>
              <div>
                <img
                  src="play.svg"
                  onClick={() => {
                    // onPlay(current_track?.uri);
                    console.log(songUri);
                    onPlay(songUri);
                  }}
                />
              </div>
            </button>
          ) : (
            <button>
              <div>
                <img
                  src="/pause.svg"
                  onClick={() => {
                    // console.log(11111111, typeof onPause);
                    onPause();
                  }}
                />
              </div>
            </button>
          )}
          <img src="/forward.svg" alt=""></img>
          <img className="float-right" src="/album.svg" alt=""></img>
        </div>
      </div>
    </body>
  );
}
