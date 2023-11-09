export default function makeRemoveSong({ songsDb }) {
    return async function removeSong({ id } = {}) {
        if (!id) {
            throw new Error('You must supply a song id.')
        }

        const songToDelete = await songsDb.findById({ id })

        if (!songToDelete) {
            return deleteNothing()
        }

        return deleteSong(songToDelete);
    }

    function deleteNothing() {
        return {
            deletedCount: 0,
            message: 'Song not found, nothing to delete.'
        };
    }

    async function deleteSong(song) {
        await songsDb.remove(song);
        return {
            deletedCount: 1,
            message: 'Song deleted.'
        };
    }
}
