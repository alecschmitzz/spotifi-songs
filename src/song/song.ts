export interface Song {
    getTitle: () => string;
    getArtist: () => string;
    getDuration: () => number;
    getId: () => string;
    getGenre: () => string;
    getAlbum: () => string;
    getReleased: () => boolean;
    markReleased: () => void;
    markUnreleased: () => void;
    getHash: () => string;
}

interface MakeSongOptions {
    Id: {
        makeId: () => string;
        isValidId: (id: string) => boolean;
    };
    md5: (text: string) => string;
    sanitize: (text: string) => string;
}

export function buildMakeSong({
    Id,
    md5,
    sanitize,
}: MakeSongOptions) {
    return function makeSong({
        title,
        artist,
        duration,
        id = Id.makeId(),
        genre,
        released = false,
        album,
    }: {
        title: string;
        artist: string;
        duration: number;
        id?: string;
        genre: string;
        released?: boolean;
        album: string;
    }): Song {
        if (!Id.isValidId(id)) {
            throw new Error('Song must have a valid id.');
        }
        if (!title) {
            throw new Error('Song must have a title.');
        }
        if (!artist) {
            throw new Error('Song must have an artist.');
        }
        if (!duration || duration <= 0) {
            throw new Error('Song must have a valid duration.');
        }
        if (!genre) {
            throw new Error('Song must have a genre.');
        }
        if (!album) {
            throw new Error('Song must belong to an album.');
        }

        let sanitizedTitle = sanitize(title).trim();
        if (sanitizedTitle.length < 1) {
            throw new Error('Song title contains no usable text.');
        }

        let hash: string;

        return Object.freeze({
            getTitle: () => sanitizedTitle,
            getArtist: () => artist,
            getDuration: () => duration,
            getId: () => id,
            getGenre: () => genre,
            getAlbum: () => album,
            getReleased: () => released,
            markReleased: () => {
                released = true;
            },
            markUnreleased: () => {
                released = false;
            },
            getHash: () => hash || (hash = makeHash()),
        });

        function makeHash() {
            return md5(
                sanitizedTitle +
                (artist || '') +
                (duration || '') +
                (genre || '') +
                (album || '') +
                (released || '')
            );
        }
    };
}