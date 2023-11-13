import { Song, SongsDb } from "./types";

export default function makeGetSingleSong({ songsDb }: { songsDb: SongsDb; }) {
    return async function getSingleSong({ id }: { id: string }): Promise<Song | null> {
        const song = await songsDb.findById({ id });
        return song;
    };
}
