import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex justify-center h-screen">
      {session ? (
        <div className="grid m-auto text-center">
          <div className="m-4">{session.session.user.name}으로 로그인하셨습니다.</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                      bg-rose-500 text-white
                      border border-rose-500 rounded
                    hover:bg-white hover:text-rose-500`}
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
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
      ) : (
        <div className="grid m-auto text-center">
          <div className="m-4">Not signed in</div>
          <button
            className={`w-40
                      justify-self-center
                      p-1 mb-4
                    bg-rose-500 text-white
                      border border-rose-500 rounded
                    hover:bg-white hover:text-rose-500`}
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}