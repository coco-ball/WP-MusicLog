export default function ListView({ logs }) {
  return (
    <div>
      {logs.map((log, index) => (
        <div key={index} className="flex mb-8">
          <div className="w-72 mr-4 bg-white rounded p-4">
            <img
              className="w-auto mb-4 rounded"
              src={log.cover}
              alt="앨범 커버"
            ></img>
            <p className="text-center font-bold text-2xl mb-1">{log.title}</p>
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
            <label for="input-text" className="text-2xl font-bold">
              남긴 메모
            </label>
            <p>{log.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
