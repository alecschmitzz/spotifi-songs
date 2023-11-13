import Id from '../Id';
import makeAddSong from './add-song';


// Mock the SongsDb dependency
const mockSongsDb = {
    findByHash: jest.fn(),
    insert: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
};

const addSong = makeAddSong({ songsDb: mockSongsDb });

describe('addSong', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a new song to the database if it does not exist', async () => {
        // Mock that the song does not exist in the database
        mockSongsDb.findByHash.mockResolvedValue(null);
        mockSongsDb.insert.mockImplementation((song) => Promise.resolve(song));

        const songInfo = {
            title: "Test Song",
            artist: "Test Artist",
            duration: 240,
            genre: "Pop",
            album: "Test Album",
        };

        const result = await addSong(songInfo);

        // Check if the database insert method is called with the correct parameters
        expect(mockSongsDb.insert).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            hash: expect.any(String),
            released: expect.any(Boolean),
            ...songInfo,
        }));

        // Check if the result is the same as the inserted song
        expect(result).toEqual(expect.objectContaining({
            id: expect.any(String),
            hash: expect.any(String),
            released: expect.any(Boolean),
            ...songInfo,
        }));


        // Check if the result has a valid CUID as the ID
        expect(Id.isValidId(result.id!)).toBe(true);
    });

    it('should return the existing song if it already exists in the database', async () => {
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

        mockSongsDb.findByHash.mockResolvedValue(existingSong);


        const songInfo = {
            title: "Existing Song",
            artist: "Existing Artist",
            duration: 180,
            genre: "Rock",
            album: "Existing Album",
        };

        const result = await addSong(songInfo);

        // Check if the database insert method is not called
        expect(mockSongsDb.insert).not.toHaveBeenCalled();

        // Check if the result is the same as the existing song
        expect(result).toEqual(existingSong);
    });
});
