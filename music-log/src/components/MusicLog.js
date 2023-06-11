import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// import PostLog from "@/src/components/PostLog";

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
const postlogCollection = collection(db, "logs");

const MusicLog = ({ onDelete }) => {
  const [viewMode, setViewMode] = useState("GRID");

  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);

  // Firebase에서 불러오는 함수
  const getLogs = async () => {
    if (!session?.token?.user?.name) return;
    const q = query(
      postlogCollection,
      where("userName", "==", session.token.user.name),
      orderBy("datetime", "desc")
    );

    // Firestore에서 불러오기
    const results = await getDocs(q);
    const newLogs = [];

    // 가져온 목록을 newLogs 배열에 담습니다.
    results.docs.forEach((doc) => {
      //results에 저장된 데이터를 newTodos 배열에 담습니다.
      newLogs.push({ id: doc.id, ...doc.data() });
    });

    setLogs(newLogs);
  };

  useEffect(() => {
    getLogs();
  }, [session]);

  /*const deletelog = (id) => {
    // Firestore 에서 해당 id를 가진 할 일을 삭제합니다.
    const postlogDoc = doc(postlogCollection, id);
    deleteDoc(postlogDoc);

    // 해당 id를 가진 할 일을 제외한 나머지 목록을 새로운 상태로 저장합니다.
    // setTodos(todos.filter((todo) => todo.id !== id));
    setlogs(
      logs.filter((log) => {
        return log.id !== id;
      })
    );
  };*/

  const deleteLog = (id) => {
    // Firestore에서 해당 id를 가진 로그 항목을 삭제합니다.
    const logDoc = doc(postlogCollection, id);
    deleteDoc(logDoc);

    // 로그 항목을 `logs` 배열에서도 삭제합니다.
    setLogs(logs.filter((log) => log.id !== id));
  };

  return (
    <div className="w-auto mt-8">
      <button className="mb-4">
        <div className="w-6">
          <img
            src="/grid.svg"
            style={{ opacity: viewMode === "GRID" ? 1 : 0.3 }}
            className="hover:opacity-100"
            onClick={() => {
              setViewMode("GRID");
            }}
          />
        </div>
      </button>
      <button className="mb-4">
        <div className="w-6">
          <img
            src="/list.svg"
            style={{ opacity: viewMode === "GRID" ? 0.3 : 1 }}
            className="hover:opacity-100"
            onClick={() => {
              setViewMode("LIST");
            }}
          />
        </div>
      </button>
      {viewMode === "GRID" ? (
        <div className="flex flex-wrap gap-4">
          {logs.map((log, index) => (
            <div key={index}>
              <img
                className="peer w-32 mb-4 rounded"
                src={log.cover}
                alt="앨범 커버"
              ></img>
              <div className="invisible peer-hover:visible mr-4 bg-white rounded p-4 absolute flex">
                <div className="mr-4">
                  <img
                    className="w-40 mb-4 rounded"
                    src={log.cover}
                    alt="앨범 커버"
                  ></img>
                  <p className="text-center font-bold text-xl mb-1">
                    {log.title}
                  </p>
                  <p className="text-center ">{log.artist}</p>
                </div>
                <div>
                  <p className="text-xl font-bold mb-1">위치</p>
                  <p className="mb-4">{log.location}</p>
                  <p className="text-xl font-bold mb-1">시간</p>
                  <p className="mb-4">{log.datetime}</p>
                  <p className="text-xl font-bold">남긴 메모</p>
                  <p>{log.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {logs.map((log, index) => (
            <div key={index} className="flex mb-8">
              <div className="w-72 mr-4 bg-white rounded p-4">
                <img
                  className="w-auto mb-4 rounded"
                  src={log.cover}
                  alt="앨범 커버"
                ></img>
                <p className="text-center font-bold text-2xl mb-1">
                  {log.title}
                </p>
                <p className="text-center ">{log.artist}</p>
              </div>
              <div key={log.id} className="w-full bg-white rounded p-4">
                <button
                  onClick={() => deleteLog(log.id)}
                  className={
                    "w-20 text-Black font-serif hover:bg-white hover:text-cyan-700 text-xs"
                  }
                >
                  X
                </button>
                <p className="text-2xl font-bold mb-1">위치</p>
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
      )}
    </div>
  );
};

export default MusicLog;
