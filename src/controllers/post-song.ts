import { Song } from "../use-cases/types";

interface PostSongDependencies {
    addSong: (songInfo: {
        title: string;
        artist: string;
        duration: number;
        genre: string;
        released?: boolean;
        album: string;
    }) => Promise<Song>;
}

export default function makePostSong({ addSong }: PostSongDependencies) {
    return async function postSong(httpRequest: { body: any }) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const { ...songInfo } = httpRequest.body;
            const added = await addSong(songInfo);
            return {
                headers,
                statusCode: 201,
                body: added,
            };
        } catch (e: unknown) {
            // TODO: Error logging
            console.error(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: (e as Error).message,
                },
            };
        }
    };
}
