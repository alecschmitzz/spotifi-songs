import makeAddSong from './add-song';
import makeGetSingleSong from './get-single-song';
import makeListSongs from './list-songs';
import makeEditSong from './edit-song';
import makeRemoveSong from './remove-song';
import songsDb from '../data-access';

const addSong = makeAddSong({ songsDb });
const getSingleSong = makeGetSingleSong({ songsDb });
const listSongs = makeListSongs({ songsDb });
const editSong = makeEditSong({ songsDb });
const removeSong = makeRemoveSong({ songsDb });

const songService = Object.freeze({
    addSong,
    getSingleSong,
    listSongs,
    editSong,
    removeSong,
});

export default songService;
export { addSong, getSingleSong, listSongs, editSong, removeSong };
