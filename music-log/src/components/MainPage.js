import React, { useState } from 'react';

import PostLog from "./PostLog.js";
import MusicLog from "./MusicLog.js";


const MainPage = () => {
    const [stateVar, setStateVar] = useState(0);

    function toggleStateVar() {
        setStateVar(prevState => (prevState === 0 ? 1 : 0));
    }

    return (
        <div className = "container">
            <div className = "text-center">
                <h2>music log demo</h2>
                <button className={`w-40
                      justify-self-center
                      p-1 mb-4
                      bg-rose-500 text-white
                      border border-rose-500 rounded
                    hover:bg-white hover:text-rose-500`}
                    onClick={() => toggleStateVar()}>toggle</button>
            </div>
            <div className="contets">
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
    )
}

export default MainPage;