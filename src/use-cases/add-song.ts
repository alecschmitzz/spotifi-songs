import { makeSong } from '../song';
import { SongsDb, Song } from './types';

export default function makeAddSong({ songsDb }: { songsDb: SongsDb; }) {
    return async function addSong(songInfo: {
        title: string;
        artist: string;
        duration: number;
        genre: string;
        released?: boolean;
        album: string;
    }): Promise<Song> {
        const song = makeSong(songInfo);
        const exists = await songsDb.findByHash({ hash: song.getHash() });

        if (exists) {
            return exists;
        }

        // const songSource = song.getSource();
        return songsDb.insert({
            id: song.getId(),
            title: song.getTitle(),
            artist: song.getArtist(),
            duration: song.getDuration(),
            genre: song.getGenre(),
            released: song.getReleased(),
            album: song.getAlbum(),
            hash: song.getHash(),
        });
    };
}
