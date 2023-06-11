export default function ListView({ logs }) {
  return (
    <div>
      {logs.map((log, index) => (
        <div key={index} className="p-4">
          <div className="flex bg-white border-2 border-black">
            <div className="w-72 mr-4 bg-white p-4">
              <img
                className="w-auto mb-1 p-2"
                src={log.cover}
                alt="앨범 커버"
              ></img>
              <p className="text-center font-bold text-xl mb-1">{log.title}</p>
              <p className="text-center text-small">{log.artist}</p>
            </div>
            <div key={log.id} className="w-full bg-white p-4 relative">
              <button
                onClick={() => deleteLog(log.id)}
                className={
                  "absolute top-0 right-0 mt-2 mr-2 text-black font-serif hover:bg-white hover:text-cyan-700 text-xs"
                }
              >
                X
              </button>
              <p className="text-xl font-bold mb-1">위치</p>
              <p className="mb-4">{log.location}</p>
              <p className="text-xl font-bold mb-1">시간</p>
              <p className="mb-4">{log.datetime}</p>
              <label htmlFor="input-text" className="text-xl font-bold">
                남긴 메모
              </label>
              <p className="w-full">{log.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
