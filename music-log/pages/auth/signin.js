import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // 세션 로딩 중에 표시할 내용을 설정합니다.
  }

  if (session) {
    router.push("/"); // 로그인된 세션이 있을 경우, 페이지 이동을 처리합니다.
    return null; // null을 반환하여 초기 렌더링 단계에서 아무것도 렌더링하지 않습니다.
  }

  return (
    <div className="flex justify-center h-screen">
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
    </div>
  );
}