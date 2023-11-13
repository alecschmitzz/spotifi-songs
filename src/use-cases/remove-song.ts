import { Song, SongsDb } from "./types";

export interface RemoveSongResult {
    deletedCount: number;
    message: string;
}

export default function makeRemoveSong({ songsDb }: { songsDb: SongsDb; }) {
    return async function removeSong({ id }: { id: string }): Promise<RemoveSongResult> {
        if (!id) {
            throw new Error('You must supply a song id.');
        }

        const songToDelete = await songsDb.findById({ id });

        if (!songToDelete) {
            return deleteNothing();
        }

        return deleteSong(songToDelete);
    };

    function deleteNothing(): RemoveSongResult {
        return {
            deletedCount: 0,
            message: 'Song not found, nothing to delete.',
        };
    }

    async function deleteSong(song: Song): Promise<RemoveSongResult> {
        await songsDb.remove(song);
        return {
            deletedCount: 1,
            message: 'Song deleted.',
        };
    }
}
