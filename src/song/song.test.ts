// Import necessary modules and functions
import { buildMakeSong, Song } from "./song";

// Mock dependencies
const mockMakeId = jest.fn().mockReturnValue("cfa8edwkk5f8ej3krimusxwr");
const mockMd5 = jest.fn().mockReturnValue("mocked-md5");
const mockSanitize = jest.fn().mockImplementation((text) => text);

// Mocked MakeSongOptions
const mockedMakeSongOptions = {
    Id: {
        makeId: mockMakeId,
        isValidId: jest.fn().mockReturnValue(true),
    },
    md5: mockMd5,
    sanitize: mockSanitize,
};

// Describe block for buildMakeSong tests
describe("buildMakeSong", () => {
    // beforeEach to reset mock functions before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test case for buildMakeSong function
    it("should return a function", () => {
        const makeSong = buildMakeSong(mockedMakeSongOptions);
        expect(typeof makeSong).toBe("function");
    });

    // Test case for makeSong function
    describe("makeSong", () => {
        // Test case for valid input
        it("should create a song with valid input", () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);

            const song = makeSong({
                id: "cfa8edwkk5f8ej3krimusxwr",
                title: "Test Song",
                artist: "Test Artist",
                duration: 180,
                genre: "Test Genre",
                album: "Test Album",
            });

            expect(song).toBeInstanceOf(Object);
            expect(song.getId()).toBe("cfa8edwkk5f8ej3krimusxwr");
            expect(song.getTitle()).toBe("Test Song");
            expect(song.getArtist()).toBe("Test Artist");
            expect(song.getDuration()).toBe(180);
            expect(song.getGenre()).toBe("Test Genre");
            expect(song.getAlbum()).toBe("Test Album");
            expect(song.getReleased()).toBe(false);
            expect(song.getHash()).toBe("mocked-md5");
        });

        // Test case for missing required fields
        it("should throw an error for missing required fields", () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);

            expect(() => makeSong({} as any)).toThrow("Song must have a title.");
            expect(() => makeSong({ title: "Test Song" } as any)).toThrow("Song must have an artist.");
            expect(() => makeSong({ title: "Test Song", artist: "Test Artist" } as any)).toThrow("Song must have a valid duration.");
            expect(() => makeSong({ title: "Test Song", artist: "Test Artist", duration: 0 } as any)).toThrow("Song must have a valid duration.");
            expect(() => makeSong({ title: "Test Song", artist: "Test Artist", duration: 180 } as any)).toThrow("Song must have a genre.");
            expect(() => makeSong({ title: "Test Song", artist: "Test Artist", duration: 180, genre: "Test Genre" } as any)).toThrow("Song must belong to an album.");
        });

        // Test case for invalid id
        it("should throw an error for invalid id", () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);
            mockedMakeSongOptions.Id.isValidId.mockReturnValueOnce(false);

            expect(() => makeSong({ title: "Test Song", artist: "Test Artist", duration: 180, genre: "Test Genre", album: "Test Album" } as any)).toThrow("Song must have a valid id.");
        });

        // Test case for markReleased method
        it('should mark the song as released', () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);
            const song = makeSong({
                title: 'Test Song',
                artist: 'Test Artist',
                duration: 180,
                genre: 'Test Genre',
                album: 'Test Album',
            });

            song.markReleased();
            expect(song.getReleased()).toBe(true);
        });

        // Test case for markUnreleased method
        it('should mark the song as unreleased', () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);
            const song = makeSong({
                title: 'Test Song',
                artist: 'Test Artist',
                duration: 180,
                genre: 'Test Genre',
                album: 'Test Album',
                released: true, // Ensure the song is initially released
            });

            song.markUnreleased();
            expect(song.getReleased()).toBe(false);
        });


        // Test case for title sanitization and length check
        it("should throw an error for a title with no usable text", () => {
            const makeSong = buildMakeSong(mockedMakeSongOptions);
            mockedMakeSongOptions.sanitize.mockReturnValueOnce("");

            expect(() => makeSong({
                title: "   ",
                artist: "Test Artist",
                duration: 180,
                genre: "Test Genre",
                album: "Test Album",
            } as any)).toThrow("Song title contains no usable text.");
        });
    });
});

