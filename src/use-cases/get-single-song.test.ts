import makeGetSingleSong from './get-single-song';

// Mock the SongsDb dependency
const mockSongsDb = {
    findByHash: jest.fn(),
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

const getSingleSong = makeGetSingleSong({ songsDb: mockSongsDb });

describe('getSingleSong', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a song when it exists in the database', async () => {
        const existingSong = {
            id: 'existing-song-id',
            title: 'Existing Song',
            artist: 'Existing Artist',
            duration: 180,
            genre: 'Rock',
            released: true,
            album: 'Existing Album',
            hash: 'existing-song-hash',
        };

        mockSongsDb.findById.mockResolvedValue(existingSong);

        const result = await getSingleSong({ id: existingSong.id });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: existingSong.id });

        // Check if the result is the same as the existing song
        expect(result).toEqual(existingSong);
    });

    it('should return null when the song does not exist in the database', async () => {
        // Mock that the song does not exist in the database
        mockSongsDb.findById.mockResolvedValue(null);

        const nonExistentId = 'non-existent-id';
        const result = await getSingleSong({ id: nonExistentId });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: nonExistentId });

        // Check if the result is null
        expect(result).toBeNull();
    });
});
