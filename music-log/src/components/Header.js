import { signOut } from "next-auth/react";

export default function Header({ username, userImg }) {
  return (
    // <div className="bg-white m-">
    //   <button
    //     className={`fixed top-4 right-40
    //             bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
    //     onClick={() => signOut()}
    //   >
    //     Logout
    //   </button>
    // </div>
    <header className="fixed top-0 w-full flex justify-end items-center gap-10 px-8 py-4 bg-white">
      <div className="flex items-center">
        <img className="w-8 h-8 rounded-full mr-4" src={userImg}></img>
        <span className="font-bold">{username}</span>
      </div>
      <button
        className={`h-8 hover:text-blue-600 text-sm text-black font-bold py-1 px-2 rounded`}
        onClick={() => signOut()}
      >
        Logout
      </button>
    </header>
  );
}
