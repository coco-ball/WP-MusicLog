import React, { useState } from "react";
import { useSession, signOut} from "next-auth/react";
import Modal from "./Modal";

import PostLog from "./PostLog.js";
import MusicLog from "./MusicLog.js";

const MainPage = () => {
  const [stateVar, setStateVar] = useState("WRITE");

  function toggleStateVar() {
    setStateVar((prevState) => (prevState === "WRITE" ? "LIST" : "WRITE"));
  }

  //세션 사용 위해
  const { data: session } = useSession();
  //모달을 열기 위한 함수
  const openModal = () => {
    setModalOpen(true);
  };
  //모달을 닫기 위한 함수
  const closeModal = () => {
    setModalOpen(false);
  };
  //modalOpen은 모달의 열림 여부- 초기값 false/ setModalOpen 함수는 모달의 열림 여부를 업데이트
  const [modalOpen, setModalOpen] = useState(false);

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
      <div>
        <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    text-rose-500
                      border border-rose-500 rounded
                    hover:bg-white hover:text-rose-500`}
            onClick={() => signOut()}
          >
            Sign out
          </button>
      </div>
      <div className="flex mt-20">
        <img
          src={stateVar === "WRITE" ? "/write.svg" : "album.svg"}
          alt=""
          className="mr-4"
        ></img>
        <h1 className="text-5xl font-bold">
          {stateVar === "WRITE"
            ? "음악 로그 작성"
            : `${session.user.name}님의 음악로그`}
        </h1>
        <button
          className={`w-30 px-5 py-2 ml-auto text-3xl rounded bg-gray-300 hover:bg-gray-400`}
          onClick={() => toggleStateVar()}
        >
          {stateVar === "WRITE" ? "음악 로그 보기" : "로그 작성하기"}
        </button>

        <button
          className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={openModal}
        >
          모달 열기
        </button>
        <Modal
          isOpen={modalOpen}
          closeModal={closeModal}
          //setState 속성에 익명의 화살표 함수를 전달
          setState={() => {
            //setStateVar 함수를 호출하여 stateVar 상태 변수의 값을 "WRITE"로 변경
            setStateVar("WRITE");
            closeModal();
          }}
        ></Modal>
      </div>
      <div className="contents">
        {stateVar === "WRITE" ? (
          <div className="write">
            <PostLog setStateVar={setStateVar}></PostLog>
          </div>
        ) : (
          <div className="list">
            <MusicLog />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
