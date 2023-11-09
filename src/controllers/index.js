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
