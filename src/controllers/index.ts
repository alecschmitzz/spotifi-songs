import {
    addSong,
    getSingleSong,
    listSongs,
    editSong,
    removeSong
} from '../use-cases';
import makePostSong from './post-song';
import makeGetSongs from './get-songs';
import makeGetSong from './get-song';
import makePatchSong from './patch-song';
import makeDeleteSong from './delete-song';
import notFound from './not-found';

import { HttpRequest, Song } from '../use-cases/types';

interface ControllerDependencies {
    addSong: (songInfo: Song) => Promise<Song>;
    getSingleSong: (songInfo: { id: string }) => Promise<Song>;
    listSongs: () => Promise<Song[]>;
    editSong: (songInfo: Song) => Promise<Song>;
    removeSong: (songInfo: { id: string }) => Promise<{ deletedCount: number }>;
}

const postSong = makePostSong({ addSong });
const getSong = makeGetSong({ getSingleSong });
const getSongs = makeGetSongs({ listSongs });
const patchSong = makePatchSong({ editSong });
const deleteSong = makeDeleteSong({ removeSong });

const songController = Object.freeze({
    postSong,
    getSong,
    getSongs,
    patchSong,
    deleteSong,
    notFound,
});

export default songController;
export { postSong, getSong, getSongs, patchSong, deleteSong, notFound };
