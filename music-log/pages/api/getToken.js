import { getAccessToken } from "@/pages/lib/Spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  console.log("gettoken handler");
  try {
    const {
      token: { accessToken },
    } = await getSession({ req });
    const { access_token } = await getAccessToken(accessToken);

    // const { access_token } = await response.json();
    const result = {
      access_token,
    };
    // const token = access_token;

    // console.log("gettoken", result);
    return res.status(200).json(result);
  } catch (error) {
    console.log("error gettoken");
    return res.status(204).end();
  }
};

export default handler;
