import { useEffect, useState } from "react";

const PostLog = () => {
  const [input, setInput] = useState("");

  const date = new Date().toISOString().substring(0, 10);
  const time = new Date().toISOString().substring(12, 19);

  const exData = {
    userId: "cocoball",
    location: "서울대학교 83동",
    datetime: date + " " + time,
    title: "Kill Bill",
    artist: "SZA",
    text: "text-input",
  };

  return (
    <div className="w-screen px-64 flex-col justify-center">
      <div className="flex mt-20">
        <img src="/write.svg" alt="" className="mr-4"></img>
        <h1 className="text-5xl font-bold">음악 로그 작성</h1>
        <button className="w-30 justify-self-center px-5 py-2 ml-auto text-3xl rounded bg-gray-300 hover:bg-gray-400">
          저장하기
        </button>
      </div>
      <body className="w-auto flex mt-8">
        <div className="w-72 mr-4 bg-white rounded p-4">
          <img className="w-auto mb-4 rounded" src="/albumCover.jpeg"></img>
          <p className="text-center text-3xl mb-1">{exData.title}</p>
          <p className="text-center text-2xl">{exData.artist}</p>
        </div>
        <div className="w-full bg-white rounded p-4">
          <p className="text-2xl font-bold mb-1">지금 어디에 계시나요?</p>
          <p className="mb-4">{exData.location}</p>
          <p className="text-2xl font-bold mb-1">시간</p>
          <p className="mb-4">{exData.datetime}</p>
          <label htmlFor="input-text" className="text-2xl font-bold">
            지금 뭐하고 계시나요? 간단한 메모를 남겨주세요.
          </label>
          <textarea
            id="input-text"
            type="text"
            className="w-full h-48 p-1 mt-2 rounded bg-gray-200 focus:outline-none focus:bg-gray-300"
            value={input}
            onChange={(e) => () => setInput(e.target.value)}
            //onChange={(e) => useEffect(() => setInput(e.target.value))}
          ></textarea>
        </div>
      </body>
    </div>
  );

};

export default PostLog;

//데이터 저장하는 함수 지정한 후 맨 마지막에 alert('오늘의 음악 로그가 저장되었습니다.'); 코드 추가해서 사용자가 자신의 코드가 저장됨을 알게 하면 좋을 것 같아요