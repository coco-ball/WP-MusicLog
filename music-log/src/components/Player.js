import Image from "next/image";
import { useState } from "react";

export default function Player() {
  const [playing, setPlaying] = useState("PLAY");
  function togglePlaying() {
    setPlaying((prevState) => (prevState === "PLAY" ? "PAUSE" : "PLAY"));
  }

  return (
    <body className="w-auto flex mt-8">
      <div className="flex-col justify-center w-72 mr-4 bg-white rounded p-4">
        <Image
          alt=""
          className="w-auto mb-4 rounded"
          src="/albumCover.jpeg"
        ></Image>
        <div className="flex jusify-between">
          <Image className="float-left" src="/playlist.svg" alt=""></Image>
          <Image src="/rewind.svg" alt=""></Image>
          <Image
            src={playing === "PLAY" ? "/pause.svg" : "play.svg"}
            alt=""
            onClick={() => {
              togglePlaying();
            }}
          ></Image>
          <Image src="/forward.svg" alt=""></Image>
          <Image className="float-right" src="/album.svg" alt=""></Image>
        </div>
      </div>
    </body>
  );
}
