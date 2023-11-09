export default function makeGetSingleSong({ songsDb }) {
    return async function getSingleSong({ id } = {}) {
        const song = await songsDb.findById({ id })
        return song;
    };
}
