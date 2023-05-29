import { useState, useEffect } from "react";
import PostLog from "@/src/components/PostLog";

//firebase 관련 모듈을 불러옵니다.
import { db } from "./firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";

// // DB의 postlogs 컬렉션 참조를 만듭니다. 컬렉션 사용시 잘못된 컬렉션 이름 사용을 방지합니다.
const postlogCollection = collection(db, "postlogs");

const MusicLog = () => {
  const [logs, setLogs] = useState([]);

  // Firebase에서 불러오는 함수
  const getLogs = async () => {
    const q = query(postlogCollection);

    // Firestore에서 불러오기
    const results = await getDocs(q);
    const newLogs = [];

    // 가져온 목록을 newLogs 배열에 담습니다.
    results.docs.forEach((doc) => {
      //results에 저장된 데이터를 newTodos 배열에 담습니다.
      newLogs.push({ ...doc.data() });
    });

    setLogs(newLogs);
  };

  useEffect(() => {
    getLogs();

    //simulating 내용은 주석처리 하였습니다.
    // Simulating fetching logs from an API or storage
    // const fetchedLogs = [
    //   {
    //     title: "첫 번째 기록",
    //     location: "서울",
    //     artist: "아티스트 1",
    //     datetime: "2023-05-27 10:00",
    //     text: "첫 번째 기록입니다.",
    //   },
    //   {
    //     title: "두 번째 기록",
    //     location: "부산",
    //     artist: "아티스트 2",
    //     datetime: "2023-05-28 15:30",
    //     text: "두 번째 기록입니다.",
    //   },
    //   // Add more logs if needed
    // ];

    // setLogs(fetchedLogs);
  }, []);

  return (
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
  );
};

export default MusicLog;