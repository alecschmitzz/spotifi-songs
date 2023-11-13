import { Song, SongsDb } from "./types";

export default function makeListSongs({ songsDb }: { songsDb: SongsDb; }) {
    return async function listSongs(): Promise<Song[]> {
        const songs = await songsDb.findAll();
        return songs;
    };
}
