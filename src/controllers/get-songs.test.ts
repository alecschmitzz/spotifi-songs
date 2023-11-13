import makeGetSongs from "./get-songs";

describe("getSongs", () => {
    it("should return a list of songs and status code 200 if songs are found", async () => {
        // Arrange
        const listSongs = jest.fn().mockResolvedValue([
            {
                id: "song-id-1",
                title: "Song 1",
                artist: "Artist 1",
                duration: 180,
                genre: "Rock",
                released: true,
                album: "Album 1",
                hash: "song-hash-1",
            },
            {
                id: "song-id-2",
                title: "Song 2",
                artist: "Artist 2",
                duration: 240,
                genre: "Pop",
                released: false,
                album: "Album 2",
                hash: "song-hash-2",
            },
        ]);

        const getSongs = makeGetSongs({ listSongs });

        const httpRequest = {
            params: {},
            body: {},
            query: {},
            method: "GET",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await getSongs(httpRequest);

        // Assert
        expect(listSongs).toHaveBeenCalled();
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 200,
            body: [
                {
                    id: "song-id-1",
                    title: "Song 1",
                    artist: "Artist 1",
                    duration: 180,
                    genre: "Rock",
                    released: true,
                    album: "Album 1",
                    hash: "song-hash-1",
                },
                {
                    id: "song-id-2",
                    title: "Song 2",
                    artist: "Artist 2",
                    duration: 240,
                    genre: "Pop",
                    released: false,
                    album: "Album 2",
                    hash: "song-hash-2",
                },
            ],
        });
    });

    it("should return status code 400 if an error occurs during song listing", async () => {
        // Arrange
        const listSongs = jest.fn().mockRejectedValue(new Error("List error"));

        const getSongs = makeGetSongs({ listSongs });

        const httpRequest = {
            params: {},
            body: {},
            query: {},
            method: "GET",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await getSongs(httpRequest);

        // Assert
        expect(listSongs).toHaveBeenCalled();
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 400,
            body: { error: "List error" },
        });
    });
});
