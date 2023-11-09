export default function makeListSongs({ songsDb }) {
    return async function listSongs() {
        const songs = await songsDb.findAll();
        return songs;
    };
}
