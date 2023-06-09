import { getRecentlyPlayed } from "@/pages/lib/Spotify";
import {getSession} from 'next-auth/react';

const handler = async (req, res) => {
    console.log("recently played handler");
    try {
        const {
            token: {accessToken},
        } = await getSession({req});
        const response = await getRecentlyPlayed(accessToken);

        const responseData = await response.json();
        const { is_playing, item } = responseData;

        const result = { is_playing, item};

        console.log("play state", result);
        return res.status(200).json(result);
    } catch (error) {
        console.log("error recently played");
        return res.status(204).end();
    }
};

export default handler;