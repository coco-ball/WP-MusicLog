import PostLog from "@/src/components/PostLog";
import MusicLog from "@/src/components/MusicLog";
import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";


export default function Home() {
  // const router = useRouter();
  // const { data } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.replace("/auth/signin");
  //   },
  // });

  return (
    <div>
      <MusicLog/>
    </div>
  );
}
