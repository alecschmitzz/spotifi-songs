// songs-db.test.ts
import makeSongsDb from './songs-db';
import { prismaMock, Song } from './singleton';

describe('Songs Database', () => {
    const songsDb = makeSongsDb({ prisma: prismaMock });

    beforeEach(() => {
        // Manually clear mock function calls
        jest.clearAllMocks();
    });

    it('findAll should return all songs', async () => {
        // Arrange
        const expectedSongs: Song[] = [
            { id: '1', title: 'Song 1', artist: 'Artist 1', duration: 300, genre: 'Pop', released: true, album: 'Album 1', hash: 'hash1', createdAt: new Date(), updatedAt: new Date() },
            { id: '2', title: 'Song 2', artist: 'Artist 2', duration: 240, genre: 'Rock', released: false, album: 'Album 2', hash: 'hash2', createdAt: new Date(), updatedAt: new Date() },
        ];
        prismaMock.song.findMany.mockResolvedValueOnce(expectedSongs);

        // Act
        const result = await songsDb.findAll();

        // Assert
        expect(result).toEqual(expectedSongs);
        expect(prismaMock.song.findMany).toHaveBeenCalledWith();
    });

    it('findById should return a specific song by ID', async () => {
        // Arrange
        const songId = '1';
        const expectedSong: Song = {
            id: songId,
            title: 'Song 1',
            artist: 'Artist 1',  // Placeholder value for artist
            duration: 240,       // Placeholder value for duration in seconds
            genre: 'Pop',        // Placeholder value for genre
            released: true,       // Placeholder value for released status
            album: 'Album 1',    // Placeholder value for album
            hash: 'hash1',       // Placeholder value for hash
            createdAt: new Date(),    // Placeholder value for createdAt
            updatedAt: new Date(),    // Placeholder value for updatedAt
        };
        prismaMock.song.findFirst.mockResolvedValueOnce(expectedSong);

        // Act
        const result = await songsDb.findById({ id: songId });

        // Assert
        expect(result).toEqual(expectedSong);
        expect(prismaMock.song.findFirst).toHaveBeenCalledWith({ where: { id: songId } });
    });

    it('findByHash should return a specific song by hash', async () => {
        // Arrange
        const hash = 'hash1';
        const expectedSong: Song = {
            id: '1',
            title: 'Song 1',
            artist: 'Artist 1',  // Placeholder value for artist
            duration: 240,       // Placeholder value for duration in seconds
            genre: 'Pop',        // Placeholder value for genre
            released: true,       // Placeholder value for released status
            album: 'Album 1',    // Placeholder value for album
            hash: 'hash1',       // Placeholder value for hash
            createdAt: new Date(),    // Placeholder value for createdAt
            updatedAt: new Date(),    // Placeholder value for updatedAt
        };

        // Mocking the behavior
        prismaMock.song.findFirst.mockResolvedValueOnce(expectedSong);

        // Act
        const result = await songsDb.findByHash({ hash });

        // Assert
        expect(result).toEqual(expectedSong);
        expect(prismaMock.song.findFirst).toHaveBeenCalledWith({ where: { hash } });
    });

    it('insert should insert a new song', async () => {
        // Arrange
        const newSong: Song = {
            id: '3',  // Replace with a unique ID
            title: 'New Song',
            artist: 'New Artist',
            duration: 300,
            genre: 'Pop',
            released: true,
            album: 'New Album',
            hash: 'newHash',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mocking the behavior
        prismaMock.song.create.mockResolvedValueOnce(newSong);

        // Act
        const result = await songsDb.insert(newSong);

        // Assert
        expect(result).toEqual(newSong);
        expect(prismaMock.song.create).toHaveBeenCalledWith({ data: newSong });
    });

    it('update should update a specific song by ID', async () => {
        // Arrange
        const songId = '1';
        const updatedSongInfo = {
            title: 'Updated Song Title',
            artist: 'Updated Artist',
            // ... other properties you want to update
        };

        const originalSong: Song = {
            id: songId,
            title: 'Song 1',
            artist: 'Artist 1',
            duration: 240,
            genre: 'Pop',
            released: true,
            album: 'Album 1',
            hash: 'hash1',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mocking the behavior
        prismaMock.song.update.mockResolvedValueOnce({ ...originalSong, ...updatedSongInfo });

        // Act
        const result = await songsDb.update({ id: songId, ...updatedSongInfo });

        // Assert
        expect(result).toEqual({ ...originalSong, ...updatedSongInfo });
        expect(prismaMock.song.update).toHaveBeenCalledWith({
            where: { id: songId },
            data: updatedSongInfo,
        });
    });

    it('remove should delete a specific song by ID', async () => {
        // Arrange
        const songId = '1';
        const expectedSong: Song = {
            id: songId,
            title: 'Song 1',
            artist: 'Artist 1',  // Placeholder value for artist
            duration: 240,       // Placeholder value for duration in seconds
            genre: 'Pop',        // Placeholder value for genre
            released: true,       // Placeholder value for released status
            album: 'Album 1',    // Placeholder value for album
            hash: 'hash1',       // Placeholder value for hash
            createdAt: new Date(),    // Placeholder value for createdAt
            updatedAt: new Date(),    // Placeholder value for updatedAt
        };

        // Mocking the behavior
        prismaMock.song.delete.mockResolvedValueOnce(expectedSong);

        // Act
        const result = await songsDb.remove({ id: songId });

        // Assert
        expect(result).toEqual(expectedSong);
        expect(prismaMock.song.delete).toHaveBeenCalledWith({ where: { id: songId } });
    });


});
