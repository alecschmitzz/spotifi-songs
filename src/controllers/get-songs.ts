import { HttpRequest, Song } from "../use-cases/types";

interface GetSongsDependencies {
    listSongs: () => Promise<Song[]>;
}

export default function makeGetSongs({ listSongs }: GetSongsDependencies) {
    return async function getSongs(httpRequest: HttpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const songs = await listSongs();
            return {
                headers,
                statusCode: 200,
                body: songs,
            };
        } catch (e: unknown) {
            // TODO: Error logging
            // console.error(e);
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
