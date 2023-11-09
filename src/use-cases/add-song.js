import makeSong from '../song'

export default function makeAddSong({ songsDb }) {
    return async function addSong(songInfo) {
        const song = makeSong(songInfo)
        const exists = await songsDb.findByHash({ hash: song.getHash() })
        if (exists) {
            return exists
        }

        // const songSource = song.getSource()
        return songsDb.insert({
            id: song.getId(),
            title: song.getTitle(),
            artist: song.getArtist(),
            duration: song.getDuration(),
            genre: song.getGenre(),
            released: song.getReleased(),
            album: song.getAlbum(),
            hash: song.getHash()
        })
    }
}
