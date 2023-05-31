import React from "react";
import { useSession } from "next-auth/react";

const Modal = ({ isOpen, closeModal, setState }) => {
  //현재 로그인된 사용자의 세션 정보 가져오기
  const { data: session } = useSession();

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white rounded p-8">
        <p className="text-xl font-bold mb-2">
          {session
            ? `${session.session.user.name}님, 지금 00의 000을 듣고 있네요!`
            : "00님, 지금 00의 000을 듣고 있네요!"}
        </p>
        <p className="text-l mb-4">지금의 순간을 간단하게 남겨주세요</p>
        <p></p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={setState}
          >
            작성하기
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
