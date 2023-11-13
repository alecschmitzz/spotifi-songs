import makeListSongs from './list-songs';

// Mock the SongsDb dependency
const mockSongsDb = {
    findByHash: jest.fn(),
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

const listSongs = makeListSongs({ songsDb: mockSongsDb });

describe('listSongs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of songs when they exist in the database', async () => {
        const existingSongs = [
            {
                id: "song-id-1",
                title: "Song 1",
                artist: "Artist 1",
                duration: 200,
                genre: "Pop",
                released: true,
                album: "Album 1",
                hash: "song-hash-1",
            },
            {
                id: "song-id-2",
                title: "Song 2",
                artist: "Artist 2",
                duration: 180,
                genre: "Rock",
                released: false,
                album: "Album 2",
                hash: "song-hash-2",
            },
        ];

        mockSongsDb.findAll.mockResolvedValue(existingSongs);

        const result = await listSongs();

        // Check if the database findAll method is called
        expect(mockSongsDb.findAll).toHaveBeenCalled();

        // Check if the result is an array of existing songs
        expect(result).toEqual(existingSongs);
    });

    it('should return an empty array when no songs exist in the database', async () => {
        // Mock that there are no songs in the database
        mockSongsDb.findAll.mockResolvedValue([]);

        const result = await listSongs();

        // Check if the database findAll method is called
        expect(mockSongsDb.findAll).toHaveBeenCalled();

        // Check if the result is an empty array
        expect(result).toEqual([]);
    });
});
