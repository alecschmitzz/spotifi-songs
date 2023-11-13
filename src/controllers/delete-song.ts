import { HttpRequest } from "../use-cases/types";

interface DeleteSongDependencies {
    removeSong: (songInfo: { id: string }) => Promise<{ deletedCount: number }>;
}

export default function makeDeleteSong({ removeSong }: DeleteSongDependencies) {
    return async function deleteSong(httpRequest: HttpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const deleted = await removeSong({ id: httpRequest.params.id });
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted },
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