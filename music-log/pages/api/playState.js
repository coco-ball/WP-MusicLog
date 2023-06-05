import { getUsersPlayState } from "@/pages/lib/Spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  console.log("playstate handler");
  try {
    const {
      token: { accessToken },
    } = await getSession({ req });

    const response = await getUsersPlayState(accessToken);

    const responseData = await response.json();
    const { device, progress_ms, is_playing, item, actions } = responseData;

    const result = {
      device,
      progress_ms,
      is_playing,
      item,
      actions,
    };

    console.log("play state", result);
    return res.status(200).json(result);
  } catch (error) {
    console.log("error play state");
    return res.status(204).end();
  }
};

export default handler;
