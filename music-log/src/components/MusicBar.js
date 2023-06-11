import { useEffect } from "react";

export default function MusicBar({ postLogData, setStateVar }) {
  
  return (
    <div className="fixed bottom-12 w-full flex justify-center">
      {postLogData.isPlaying ? (
        <div className="flex justify-between align-middle bg-white min-w-min w-3/4 py-4 px-16 rounded-md">
          <div className="flex align-middle">
            <img
              className="w-12 rounded mr-4"
              src={postLogData.imageUrl}
              alt="앨범 커버"
            ></img>
            <div className="flex-col">
              <p className="font-bold">{postLogData.songTitle}</p>
              <p className="text-sm">{postLogData.songArtist}</p>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setStateVar("WRITE")}
          >
            이 노래로 새로운 로그 작성하러가기
          </button>
        </div>
      ) : (
        <>
          <div className="flex align-middle py-4 pr-16 pl-12 rounded-md bg-white">
            <img
              className="w-12 h-12 rounded-full mr-4"
              src={postLogData.userImg}
              alt="앨범 커버"
            ></img>
            <div className="flex-col">
              <p className="text-center">
                안녕하세요, {postLogData.userName}님!
              </p>
              <p>스포티파이에서 음악을 재생해주세요.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
