import { makeSong } from '../song';
import { SongsDb } from './types';

export default function makeEditSong({ songsDb }: { songsDb: SongsDb; }) {
    return async function editSong({ id, ...changes }: { id: string;[key: string]: any }) {
        if (!id) {
            throw new Error('You must supply an id.');
        }

        if (
            !changes.title &&
            !changes.artist &&
            !changes.duration &&
            !changes.genre &&
            !changes.album &&
            changes.released === undefined
        ) {
            throw new Error('You must supply at least one change to edit.');
        }

        const existing = await songsDb.findById({ id });

        if (!existing) {
            throw new RangeError('Song not found.');
        }

        const song = makeSong({ ...existing, ...changes });

        if (song.getHash() === existing.hash) {
            return existing;
        }

        const updated = await songsDb.update({
            id: song.getId(),
            title: song.getTitle(),
            artist: song.getArtist(),
            duration: song.getDuration(),
            genre: song.getGenre(),
            album: song.getAlbum(),
            released: song.getReleased(),
            hash: song.getHash(),
        });

        return { ...existing, ...updated };
    };
}
