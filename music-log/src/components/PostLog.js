import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

//firebase 관련 모듈을 불러옵니다.
import { db } from "./firebase";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  //where,
} from "firebase/firestore";
import { data } from "autoprefixer";

const postlogCollection = collection(db, "postlogs");

export default function PostLog({ setStateVar, postLogData }) {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");

  const getpostlogs = async () => {
    // Firestore 쿼리를 만듭니다.
    // const q = query(postlogCollection);

    if (!session?.session?.user?.name) return;
    const q = query(
      postlogCollection,
      where("userName", "==", session.session.user.name),
      orderBy("datetime", "asc")
    );

    // Firestore 에서 할 일 목록을 조회합니다.
    const results = await getDocs(q);
    const newpostlogs = [];

    // 가져온 할 일 목록을 newTodos 배열에 담습니다.
    results.docs.forEach((doc) => {
      // console.log(doc.data());
      // id 값을 Firestore 에 저장한 값으로 지정하고, 나머지 데이터를 newTodos 배열에 담습니다.
      newpostlogs.push({ id: doc.id, ...doc.data() });
    });

    setLogs(newpostlogs); //todos 배열 업데이트
  };

  useEffect(() => {
    getpostlogs();
  }, [session]);

  const saveLog = async () => {
    if ((input.trim() === "") | !postLogData.isPlaying) return;

    //const date = new Date().toISOString().substring(0, 10);
    //const time = new Date().toISOString().substring(12, 19);
    //const hours = (parseInt(time.substring(0, 2)) + 7).toString().padStart(2, "0");
    //const modifiedTime = hours + ":"+time.substring(2);

    const now = new Date();	
    const date = String(now).substring(0, 16);;
    const hour = String(now.getHours()).padStart(2,"0");
    const minutes = String(now.getMinutes()).padStart(2,"0");
    const second = String(now.getSeconds()).padStart(2,"0");//number이기 때문에 padStart 붙일 수 없음. String 변환해주어야한다.
 
    const docRef = await addDoc(postlogCollection, {
      userId: postLogData.userId,
      userName: postLogData.userName,
      id: Date.now(),
      location: postLogData.location,
      //datetime: date + " " + modifiedTime,
      datetime: `${date} ${hour}:${minutes}:${second}`,
      cover: postLogData.imageUrl,
      title: postLogData.songTitle,
      artist: postLogData.songArtist,
      text: input,
    });
    alert("오늘의 음악 로그가 저장되었습니다.");

    setLogs([
      ...logs,
      {
        id: docRef.id,
        userId: postLogData.userId,
        userName: postLogData.userName,
        location: postLogData.location,
        //datetime: date + " " + time,
        datetime: `${date} ${hour}:${minutes}:${second}`,
        cover: postLogData.imageUrl,
        title: postLogData.songTitle,
        artist: postLogData.songArtist,
        text: input,
      },
    ]);
    setInput("");
    setStateVar("LIST");
  };

  // console.log(logs);
  // useEffect(() => {
  //   console.log(logs);
  // }, [logs]);

  // firebase 관련 명령
  //spotify API연동-->userid, 노래 title, artist, album cover.. 총 7개 항목 불러오기 -->

  return (
    <div>
      <body className="w-auto flex">
        <div className="w-72 mr-4 bg-white rounded p-4">
          <img className="w-auto mb-4 rounded" src={postLogData.imageUrl}></img>
          <p className="text-center text-3xl mb-1">{postLogData.songTitle}</p>
          <p className="text-center text-2xl">{postLogData.songArtist}</p>
        </div>
        <div className="w-full bg-white rounded p-4">
          <p className="text-2xl font-bold mb-1">지금 어디에 계시나요?</p>
          <p className="mb-4">{postLogData.location}</p>
          {/* <p className="text-2xl font-bold mb-1">시간</p>
          <p className="mb-4">{datetime}</p> */}

          <label htmlFor="input-text" className="text-2xl font-bold">
            지금 뭐하고 계시나요? 간단한 메모를 남겨주세요.
          </label>
          <textarea
            id="input-text"
            type="text"
            className="w-full h-48 p-1 mt-2 rounded bg-gray-200 focus:outline-none focus:bg-gray-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <button
            className={`float-right p-2 ml-auto rounded bg-gray-300 hover:bg-gray-400`}
            onClick={() => saveLog()}
          >
            작성 완료
          </button>
        </div>
      </body>
    </div>
  );
}

//데이터 저장하는 함수 지정한 후 맨 마지막에 alert('오늘의 음악 로그가 저장되었습니다.'); 코드 추가해서 사용자가 자신의 코드가 저장됨을 알게 하면 좋을 것 같아요
// 저장하기 버튼 클릭 시 데이터 저장하는 함수
/*
function saveData() {
  const userId = exData.getElementById(' ').textContent;
  const location = document.getElementById('  ').value;
  const datetime = document.getElementById('').value;
  const title = document.getElementById(' ').textContent;
  const artist = document.getElementById(' ').textContent;
  /*const albumCover = exData.getElementById(' ').src;*/
//const text = document.getElementById('text-input').value;

// 여기서 데이터를 데이터베이스에 저장하는 로직을 추가-firebase 연동?
// 데이터베이스에 저장되는 데이터는 userid, location, datetime, title, artist, text.. *앨범커버도 저장해야?

//alert('오늘의 음악 로그가 저장되었습니다.');
//}

// 저장하기 버튼에 이벤트 리스너 추가
//const saveButton = document.getElementById('save-button');
//saveButton.addEventListener('click', saveData);

//firebase: 모듈 불러오기->DB만들기

//  ->새로 생성된 데이터 firebase DB에 집어넣어 저장(+alert)
//  ->(MusicLog.js-사실상 정보 리스트/에서 firebase의 DB 하나하나 불러오기 .map)
// 리턴에 <button classname={~~} onClick={() => saveButton()} > 요렇게 넣어주기 // savelog

// {data?.user?.name}'s 음악 로그
/*
  <ul>
{todos.map((todo) => (
  <TodoItem
    key={todo.id}
    todo={todo}
    onToggle={() => toggleTodo(todo.id)}
    onDelete={() => deleteTodo(todo.id)}
  />
  */
