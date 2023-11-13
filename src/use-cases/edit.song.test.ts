import Id from '../Id';
import makeEditSong from './edit-song';

// Mock the SongsDb dependency
const mockSongsDb = {
    findByHash: jest.fn(),
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};


const editSong = makeEditSong({ songsDb: mockSongsDb });

describe('editSong', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if no id is provided', async () => {
        // Perform the edit without providing an id and expect it to throw an error
        await expect(editSong({ /* no id provided */ } as any)).rejects.toThrow('You must supply an id.');

        // Check if the database findById method is not called
        expect(mockSongsDb.findById).not.toHaveBeenCalled();

        // Check that the database update method is not called
        expect(mockSongsDb.update).not.toHaveBeenCalled();
    });

    it('should return existing song if the hash is unchanged', async () => {
        const existingSong = {
            id: "xuooqvxo9wp0aomzmd7w5r5d",
            title: "Existing Song",
            artist: "Existing Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "Existing Album",
            hash: "94f232058f9c02313eed09c57e6c2834",
        };

        mockSongsDb.findById.mockResolvedValue(existingSong);
        mockSongsDb.update.mockResolvedValue({ patched: existingSong }); // Assume no changes

        const changes = {
            // No changes provided
            artist: "Existing Artist",
        };

        const result = await editSong({ id: existingSong.id, ...changes });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: existingSong.id });

        // Check that the database update method is not called
        expect(mockSongsDb.update).not.toHaveBeenCalled();

        // Check if the result is the existing song
        expect(result).toEqual(existingSong);
    });

    it('should edit an existing song in the database', async () => {
        const existingSong = {
            id: "rzl50g5w2kyei11cca1l67rb",
            title: "Existing Song",
            artist: "Existing Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "Existing Album",
            hash: "existing-song-hash",
        };

        mockSongsDb.findById.mockResolvedValue(existingSong);
        mockSongsDb.update.mockImplementation((song) => Promise.resolve({ patched: song }));

        const changes = {
            title: "Updated Song",
            duration: 200,
            genre: "Pop",
        };


        const result = await editSong({ id: existingSong.id, ...changes });

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: existingSong.id });

        // Check if the database update method is called with the correct parameters
        expect(mockSongsDb.update).toHaveBeenCalledWith({
            id: existingSong.id,
            title: changes.title,
            artist: existingSong.artist, // Assume unchanged
            duration: changes.duration,
            genre: changes.genre,
            album: existingSong.album, // Assume unchanged
            released: existingSong.released, // Assume unchanged
            hash: expect.any(String), // Updated hash
        });

        // Check if the result is the updated song
        expect(result).toEqual(expect.objectContaining({
            patched: {
                id: existingSong.id,
                title: changes.title,
                artist: existingSong.artist, // Assume unchanged
                duration: changes.duration,
                genre: changes.genre,
                album: existingSong.album, // Assume unchanged
                released: existingSong.released, // Assume unchanged
                hash: expect.any(String), // Updated hash
            }
        }));

        // Check if the result has a valid CUID as the ID
        expect(Id.isValidId(result.id!)).toBe(true);
    });

    it('should throw an error if the song to edit is not found in the database', async () => {
        // Mock that the song does not exist in the database
        mockSongsDb.findById.mockResolvedValue(null);

        const changes = {
            title: "Updated Song",
            duration: 200,
            genre: "Pop",
        };

        // Perform the edit and expect it to throw an error
        await expect(editSong({ id: "non-existent-id", ...changes })).rejects.toThrow('Song not found.');

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).toHaveBeenCalledWith({ id: "non-existent-id" });

        // Check that the database update method is not called
        expect(mockSongsDb.update).not.toHaveBeenCalled();
    });

    it('should throw an error if no changes are provided', async () => {
        // Mock that the song exists in the database
        const existingSong = {
            id: "existing-song-id",
            title: "Existing Song",
            artist: "Existing Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "Existing Album",
            hash: "existing-song-hash",
        };

        mockSongsDb.findById.mockResolvedValue(existingSong);

        // Perform the edit with no changes and expect it to throw an error
        await expect(editSong({ id: existingSong.id })).rejects.toThrow('You must supply at least one change to edit.');

        // Check if the database findById method is called with the correct parameters
        expect(mockSongsDb.findById).not.toHaveBeenCalled();

        // Check that the database update method is not called
        expect(mockSongsDb.update).not.toHaveBeenCalled();
    });
});
