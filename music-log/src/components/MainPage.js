import React, { useState } from "react";

import PostLog from "./PostLog.js";
import MusicLog from "./MusicLog.js";

const MainPage = () => {
  const [stateVar, setStateVar] = useState(0);

  function toggleStateVar() {
    setStateVar((prevState) => (prevState === 0 ? 1 : 0));
  }

  return (
    // <div className = "container">
    //     <div className = "text-center">
    //         <h2>music log demo</h2>
    //         <button className={`w-40
    //               justify-self-center
    //               p-1 mb-4
    //               bg-rose-500 text-white
    //               border border-rose-500 rounded
    //             hover:bg-white hover:text-rose-500`}
    //             onClick={() => toggleStateVar()}>toggle</button>
    //     </div>
    //     <div className="contents">
    //         {stateVar === 0 ? (
    //             <div className="post">
    //                 <PostLog />
    //             </div>
    //         ) : (
    //             <div className="check">
    //                 <MusicLog />
    //             </div>
    //         )}
    //     </div>
    // </div>

    <div className="w-screen px-64 flex-col justify-center">
      <div className="flex mt-20">
        <img
          src={stateVar === 0 ? "/write.svg" : "album.svg"}
          alt=""
          className="mr-4"
        ></img>
        <h1 className="text-5xl font-bold">
          {stateVar === 0 ? "음악 로그 작성" : "00님의 음악로그"}
        </h1>
        <button
          className={`w-30 justify-self-center px-5 py-2 ml-auto text-3xl rounded bg-gray-300 hover:bg-gray-400`}
          onClick={() => toggleStateVar()}
        >
          {stateVar === 0 ? "음악 로그 보기" : "로그 작성하기"}
        </button>
      </div>
      <div className="contents">
        {stateVar === 0 ? (
          <div className="post">
            <PostLog />
          </div>
        ) : (
          <div className="check">
            <MusicLog />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;