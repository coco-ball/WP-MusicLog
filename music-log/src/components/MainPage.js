import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import Modal from "./Modal";
import Header from "./Header";
import Player from "./Player";
import PostLog from "./PostLog.js";
import MusicLog from "./MusicLog.js";
import Notice, { makeNoti } from "./Notice.js";
import MusicBar from "./MusicBar";

import { getPlaybackState } from "@/pages/lib/Spotify";
import { data } from "autoprefixer";

const MainPage = () => {
  //------------------------------------------------------
  //메인 페이지 아래로 모드에 따라 대응되는 컴포넌트 렌더링
  const [stateVar, setStateVar] = useState("LIST");

  function toggleStateVar(mode) {
    setStateVar(mode);
  }

  //------------------------------------------------------
  //모달

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

  //-------------------------------------------------------
  //api로 가져올 값들

  const [list, setList] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userName, setUserName] = useState([]);
  const [userImg, setUserImg] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState("Track");
  const [songArtist, setSongArtist] = useState("Artist");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/659/659056.png"
  );
  //장소는 아직
  const location = "서울대학교 83동";

  const [lastUpdatedTime, updateTime] = useState();
  const [lastPushTime, updatePushTime] = useState();

  //-------------------------------------------------------
  //API로 값 기져오고 변수(state)에 저장

  const initUpdateTime = async () => {
    const time = localStorage.getItem("lastUpdateTime");
    const time2 = localStorage.getItem("lastPushTime");
    updateTime(time);
    updatePushTime(time2);
  }


  useEffect(() => {
    initUpdateTime();
  }, []);

  const getMyPlayState = async () => {
    const res = await fetch("/api/playState");
    if (res.status != 200) {
      //정상적 응답일 아닐 경우 isPlaying을 처음의 false로 냅둠
      console.log("not playing -> recently played");
      setSongTitle(localStorage.getItem("title"));
      setSongArtist(localStorage.getItem("singer"));
      setImageUrl(localStorage.getItem("cover"));
    } else {
      //정상적 응답일 경우 is_playing값을 isPlaying에 할당
      const { is_playing, item } = await res.json();
      console.log("is playing!!!");
      setIsPlaying(is_playing);
      setSongTitle(item.name);
      setSongArtist(item.artists[0].name);
      setImageUrl(item.album.images[0].url);
      localStorage.setItem("title", songTitle);
      localStorage.setItem("singer", songArtist);
      localStorage.setItem("cover", imageUrl);
    }
  };
  //컴포넌트가 렌더링될때 getMyPlayState를 자동으로 실행하기 위한 함수
  useEffect(() => {
    getMyPlayState();
  }, [stateVar]);

  //레퍼런스에서 가져온 사용하지 않는 함수
  /*const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setList(items);
  };*/

  const getUserProfile = async () => {
    const res = await fetch("/api/currentUser");
    if (res.status != 200) {
    } else {
      const { id, images, display_name } = await res.json();
      //console.log("debug_id", id);
      //console.log("debug", images);
      //console.log("debug", display_name);
      setUserId(id);
      setUserName(display_name);
      setUserImg(images[0].url);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [session]);

  //최근 재생 목록 불러오려고 시도한 코드
  /*
  const getRecentlyPlayed = async() => {
    const res = await fetch("/api/recentlyPlayed");
    if (res.status != 200) {
      //정상적 응답일 아닐 경우 isPlaying을 처음의 false로 냅둠
    } else {
      //정상적 응답일 경우 is_playing값을 isPlaying에 할당
      const { total, items } = await res.json();
      if (total != 0) {
        setSongTitle(items[0].track.name);
        setSongArtist(items[0].artists[0].name);
        setImageUrl(items[0].album.images[0].url);
      }
    }
  }*/

  const wantedDiff = 1000 * 60; //테스트용으로 1초로 설정

  const checkModal = async () => {
    console.log("check modal called!!!");
    if (isPlaying) {
      const time1 = new Date(lastUpdatedTime);
      const time2 = new Date();

      const timeDifference = time2 - time1; // 현재 시간과 변환한 시간의 간격
      //const threeHoursInMillis = 3 * 60 * 60 * 1000; // 3시간을 밀리초로 변환

      console.log("timeDiff: ", timeDifference);

      if (timeDifference > wantedDiff) {
        openModal();
      }
    }
  };

  useEffect(() => {
    checkModal();
  }, [isPlaying]);

  //------------------------------------------------------
  //변수들을 postLog.js에 넘기기 위해 배열 생성(너무 많아서!)
  const postLogData = {
    isPlaying: isPlaying,
    songTitle: songTitle,
    songArtist: songArtist,
    imageUrl: imageUrl,
    userId: userId,
    userName: userName,
    userImg: userImg,
    location: location,
  };

  //푸시알림 보내는 makeNoti() 함수 정의
  function makeNoti() {
    // 사용자 응답에 따라 단추를 보이거나 숨기도록 설정
    if (
      Notification.permission === "denied" ||
      Notification.permission === "default"
    ) {
      alert("알림이 차단된 상태입니다. 알림 권한을 허용해주세요.");
    } else {
      getMyPlayState();
      if (isPlaying) {
        let notification = new Notification("Music Log", {
        body: `지금 ${songArtist}의 ${songTitle}를 듣고 계시네요! 지금의 순간을 간단하게 남겨주세요.`,
        //icon: ".png"
      });

      //알림 클릭 시 이벤트
      notification.addEventListener("click", () => {
        setStateVar("WRITE");
      });
      }
      
    }
  }

  const wantedDiff2 = 1000*60*5; //마지막 업데이트로부터 5분 이후라면 푸시
  const wantedDiff3 = 1000*60*3; //마지막 푸시로부터 3분 이후라면 푸시

  const sendPush = async() => {
    //console.log("sendPush activated");
    const time1 = new Date(lastUpdatedTime);
    const time2 = new Date();

    const timeDifference = time2 - time1; // 현재 시간과 변환한 시간의 간격
      //const threeHoursInMillis = 3 * 60 * 60 * 1000; // 3시간을 밀리초로 변환
    if (timeDifference > wantedDiff2) {
      console.log("마지막 업데이트로부터 시간이 지났음");
      const time3 = new Date(lastPushTime);
      console.log("마지막 푸시 시간: ", lastPushTime);
      const timeDifference2 = time2 - time3;
      if (timeDifference2 > wantedDiff3) {
        console.log("마지막 푸시로부터 시간이 지났음");
        localStorage.setItem("lastPushTime", time2.toISOString());
        updatePushTime(time2.toISOString());
        console.log("state 업데이트 체크: ", lastPushTime);
        makeNoti();
      }
    }
  }

  useEffect(() => {
    sendPush();

    const interval = setInterval(() => {
      sendPush();
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      <Header username={userName} userImg={userImg}></Header>
      <div className="w-screen px-64 flex-col justify-center">
        <div className="flex mt-12 mb-8">
          <img
            src={stateVar === "WRITE" ? "/write.svg" : "album.svg"}
            alt=""
            className="mr-4"
          ></img>
          <h1 className="text-5xl font-bold">
            {stateVar === "WRITE"
              ? "음악 로그 작성"
              : stateVar === "LIST"
              ? `${userName}님의 음악로그`
              : `${userName}님의 플레이어`}
          </h1>
          <button
            className={`w-30 px-5 py-2 ml-auto text-3xl rounded bg-gray-300 hover:bg-gray-400`}
            onClick={() =>
              toggleStateVar((prevState) =>
                prevState === "WRITE" ? "LIST" : "WRITE"
              )
            }
          >
            {stateVar === "WRITE" ? "음악 로그 보기" : "로그 작성하기"}
          </button>

          <button
            className="fixed bottom-40 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            모달 열기
          </button>
          <button
            className="fixed bottom-20 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => toggleStateVar("PLAYER")}
          >
            플레이어
          </button>
          {/* 푸시 알림 보내기 */}
          <button
            className="fixed bottom-60 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={makeNoti}
          >
            푸시알림
          </button>
        </div>
        <div className="contents">
          {stateVar === "PLAYER" ? (
            <Player></Player>
          ) : stateVar === "WRITE" ? (
            <div className="write">
              <PostLog
                setStateVar={setStateVar}
                postLogData={postLogData}
                updateTime={updateTime}
              ></PostLog>
            </div>
          ) : (
            <div className="list">
              <MusicLog></MusicLog>
            </div>
          )}
        </div>
      </div>
      <MusicBar postLogData={postLogData} setStateVar={setStateVar}></MusicBar>
      {/* 푸시알림보내기끝 */}
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
    </>
  );
};
export default MainPage;
