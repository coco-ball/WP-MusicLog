import React from "react";
import { useHistory } from "react-router-dom";

const MusicLog = ({ logs }) => {
  const history = useHistory();

  const handleWrite = () => {
    history.push("/post-log"); // 작성 페이지로 이동하는 경로를 지정해야 합니다.
  };

  return (
    <div className="w-screen px-64 flex-col justify-center">
      <div className="flex mt-20">
        <img src="/write.svg" alt="" className="mr-4"></img>
        <h1 className="text-5xl font-bold">00님의 음악로그</h1>
        <button
          className="w-30 justify-self-center px-5 py-2 ml-auto text-3xl rounded bg-gray-300 hover:bg-gray-400"
          onClick={handleWrite}
        >
          작성하기
        </button>
      </div>
      <div className="w-auto mt-8">
        {logs.map((log, index) => (
          <div key={index} className="flex mb-8">
            <div className="w-72 mr-4 bg-white rounded p-4">
              <img
                className="w-auto mb-4 rounded"
                src="/albumCover.jpeg"
                alt="앨범 커버"
              ></img>
              <p className="text-center text-3xl mb-1">{log.title}</p>
              <p className="text-center text-2xl">{log.artist}</p>
            </div>
            <div className="w-full bg-white rounded p-4">
              <p className="text-2xl font-bold mb-1">지금 어디에 계시나요?</p>
              <p className="mb-4">{log.location}</p>
              <p className="text-2xl font-bold mb-1">시간</p>
              <p className="mb-4">{log.datetime}</p>
              <label htmlFor="input-text" className="text-2xl font-bold">
                남긴 메모
              </label>
              <p>{log.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicLog;