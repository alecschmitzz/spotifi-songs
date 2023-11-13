import makeRemoveSong from './remove-song';

// Mock the SongsDb dependency
const mockSongsDb = {
    findByHash: jest.fn(),
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

const removeSong = makeRemoveSong({ songsDb: mockSongsDb });

describe('removeSong', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if no id is provided', async () => {
        // Perform the remove without providing an id and expect it to throw an error
        await expect(removeSong({ /* no id provided */ } as any)).rejects.toThrow('You must supply a song id.');

        // Check if the database findById method is not called
        expect(mockSongsDb.findById).not.toHaveBeenCalled();

        // Check that the database remove method is not called
        expect(mockSongsDb.remove).not.toHaveBeenCalled();
    });


    it('should remove a song when it exists in the database', async () => {
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

        const result = await removeSong({ id: existingSong.id });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: existingSong.id });

        // Check if the database remove method is called with the correct parameters
        expect(mockSongsDb.remove).toHaveBeenCalledWith(existingSong);

        // Check if the result indicates that the song was deleted
        expect(result).toEqual({
            deletedCount: 1,
            message: 'Song deleted.',
        });
    });

    it('should return a message when trying to remove a non-existent song', async () => {
        // Mock that the song does not exist in the database
        mockSongsDb.findById.mockResolvedValue(null);

        const nonExistentId = 'non-existent-id';
        const result = await removeSong({ id: nonExistentId });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: nonExistentId });

        // Check if the result indicates that nothing was deleted
        expect(result).toEqual({
            deletedCount: 0,
            message: 'Song not found, nothing to delete.',
        });

        // Check that the database remove method is not called
        expect(mockSongsDb.remove).not.toHaveBeenCalled();
    });
});
