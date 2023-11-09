export default function buildMakeSong({ Id, md5, sanitize }) {
    return function makeSong({
        title,
        artist,
        duration,
        id = Id.makeId(),
        genre,
        released = false,
        album
    } = {}) {
        if (!Id.isValidId(id)) {
            throw new Error('Song must have a valid id.')
        }
        if (!title) {
            throw new Error('Song must have a title.')
        }
        if (!artist) {
            throw new Error('Song must have an artist.')
        }
        if (!duration || duration <= 0) {
            throw new Error('Song must have a valid duration.')
        }
        if (!genre) {
            throw new Error('Song must have a genre.')
        }
        if (!album) {
            throw new Error('Song must belong to an album.')
        }

        let sanitizedTitle = sanitize(title).trim()
        if (sanitizedTitle.length < 1) {
            throw new Error('Song title contains no usable text.')
        }

        let hash

        return Object.freeze({
            getTitle: () => sanitizedTitle,
            getArtist: () => artist,
            getDuration: () => duration,
            getId: () => id,
            getGenre: () => genre,
            getAlbum: () => album,
            getReleased: () => released,
            markReleased: () => {
                released = true
            },
            markUnreleased: () => {
                released = false
            },
            getHash: () => hash || (hash = makeHash())
        })

        function makeHash() {
            return md5(
                sanitizedTitle +
                (artist || '') +
                (duration || '') +
                (genre || '') +
                (album || '') +
                (released || '')
            )
        }
    }
}
