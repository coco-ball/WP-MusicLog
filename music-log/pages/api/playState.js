import { getUsersPlayState } from "@/pages/lib/Spotify";
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
    console.log("playstate handler");
    try {
        const {
            token: {accessToken},
        } = await getSession({req});
        const response = await getUsersPlayState(accessToken);

        const responseData = await response.json();
        const { is_playing, item } = responseData;

        const result = { is_playing, item};

        console.log("play state", result);
        return res.status(200).json(result);
    } catch (error) {
        const result = {is_playing: false, item: null};
        console.log("play state", result);
        return res.status(204).json(result);
    }
};








export default handler;