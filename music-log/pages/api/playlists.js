import { getUsersPlaylists } from "@/pages/lib/Spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  console.log("playlist handler");
  const {
    token: { refreshToken },
  } = await getSession({ req });
  const response = await getUsersPlaylists(refreshToken);

  const { items } = await response.json();

  //console.log("playlist", items);
  return res.status(200).json({ items });
};

export default handler;
