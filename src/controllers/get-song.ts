import { HttpRequest, Song } from "../use-cases/types";

interface GetSongDependencies {
    getSingleSong: ({ id }: { id: string }) => Promise<Song | null>;
}

export default function makeGetSong({ getSingleSong }: GetSongDependencies) {
    return async function getSong(httpRequest: HttpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const song = await getSingleSong({ id: httpRequest.params.id });
            return {
                headers,
                statusCode: song ? 200 : 404,
                body: song,
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
