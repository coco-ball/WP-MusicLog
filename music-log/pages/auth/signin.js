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
    <div className="h-screen">
      <div className="grid ml-20">
        <div className="mt-10 mb-10 text-7xl font-bold" id="title">Music Log</div>
        <div className="ml-10 grid grid-cols-2 gap-8">
          <div id="text" className = "mt-10">
            <div className="text-3xl font-bold">
              지금 듣고 있는 노래로
              <br />하루의 기록을 남겨보세요
            </div>
            <div className="text-l mt-5 mb-10">Music Log는 ~~~</div>
            <button
              className={`w-40
                p-3 mb-4 mt-10
                bg-[#617FF5] text-white
                border border-[#617FF5]
                hover:bg-white hover:text-[#617FF5]
                text-xl font-bold`}
              onClick={() => signIn()}
            >
              SIGN IN
            </button>
          </div>
          <div id="image" className="w-3000">
            <img src="/The Band.png" alt="The Band" />
          </div>
        </div>
      </div>
    </div>
  );
}