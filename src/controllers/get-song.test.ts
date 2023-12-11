import makeGetSong from "./get-song";

describe("getSong", () => {
    it("should return a song and status code 200 if the song is found", async () => {
        // Arrange
        const getSingleSong = jest.fn().mockResolvedValue({
            id: "test-song-id",
            title: "Test Song",
            artist: "Test Artist",
            duration: 240,
            genre: "Pop",
            released: true,
            album: "Test Album",
            hash: "test-song-hash",
        });

        const getSong = makeGetSong({ getSingleSong });

        const httpRequest = {
            params: {
                id: "test-song-id",
            },
            body: {},
            query: {},
            method: "GET",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await getSong(httpRequest);

        // Assert
        expect(getSingleSong).toHaveBeenCalledWith({ id: "test-song-id" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 200,
            body: {
                id: "test-song-id",
                title: "Test Song",
                artist: "Test Artist",
                duration: 240,
                genre: "Pop",
                released: true,
                album: "Test Album",
                hash: "test-song-hash",
            },
        });
    });

    it("should return status code 404 if the song is not found", async () => {
        // Arrange
        const getSingleSong = jest.fn().mockResolvedValue(null);

        const getSong = makeGetSong({ getSingleSong });

        const httpRequest = {
            params: {
                id: "non-existent-song-id",
            },
            body: {},
            query: {},
            method: "GET",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await getSong(httpRequest);

        // Assert
        expect(getSingleSong).toHaveBeenCalledWith({ id: "non-existent-song-id" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 404,
            body: null,
        });
    });

    it("should return status code 400 if an error occurs during retrieval", async () => {
        // Arrange
        const getSingleSong = jest.fn().mockRejectedValue(new Error("Retrieve error"));

        const getSong = makeGetSong({ getSingleSong });

        const httpRequest = {
            params: {
                id: "test-song-id",
            },
            body: {},
            query: {},
            method: "GET",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await getSong(httpRequest);

        // Assert
        expect(getSingleSong).toHaveBeenCalledWith({ id: "test-song-id" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 400,
            body: { error: "Retrieve error" },
        });
    });
});
