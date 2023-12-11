import makePatchSong from "./patch-song";

describe("patchSong", () => {
    it("should patch an existing song and return status code 200", async () => {
        // Arrange
        const editSong = jest.fn().mockResolvedValue({
            id: "song-id-1",
            title: "Patched Song",
            artist: "Patched Artist",
            duration: 200,
            genre: "Pop",
            released: true,
            album: "Patched Album",
            hash: "patched-song-hash",
            updatedAt: new Date().toISOString(),
        });

        const patchSong = makePatchSong({ editSong });

        const httpRequest = {
            params: { id: "song-id-1" },
            body: {
                title: "Patched Song",
                artist: "Patched Artist",
                duration: 200,
                genre: "Pop",
                released: true,
                album: "Patched Album",
            },
            query: {},
            method: "PATCH",
            path: "/api/songs/song-id-1",
            headers: {},
        };

        // Act
        const result = await patchSong(httpRequest);

        // Assert
        expect(editSong).toHaveBeenCalledWith({
            id: "song-id-1",
            title: "Patched Song",
            artist: "Patched Artist",
            duration: 200,
            genre: "Pop",
            released: true,
            album: "Patched Album",
        });
        expect(result).toEqual({
            headers: {
                "Content-Type": "application/json",
                "Last-Modified": expect.any(String),
            },
            statusCode: 200,
            body: {
                patched: {
                    id: "song-id-1",
                    title: "Patched Song",
                    artist: "Patched Artist",
                    duration: 200,
                    genre: "Pop",
                    released: true,
                    album: "Patched Album",
                    hash: "patched-song-hash",
                    updatedAt: expect.any(String),
                },
            },
        });
    });

    it("should return status code 404 if the song to patch is not found", async () => {
        // Arrange
        const editSong = jest.fn().mockRejectedValue(new RangeError("Song not found"));

        const patchSong = makePatchSong({ editSong });

        const httpRequest = {
            params: { id: "non-existing-id" },
            body: {
                title: "Patched Song",
                artist: "Patched Artist",
                duration: 200,
                genre: "Pop",
                released: true,
                album: "Patched Album",
            },
            query: {},
            method: "PATCH",
            path: "/api/songs/non-existing-id",
            headers: {},
        };

        // Act
        const result = await patchSong(httpRequest);

        // Assert
        expect(editSong).toHaveBeenCalledWith({
            id: "non-existing-id",
            title: "Patched Song",
            artist: "Patched Artist",
            duration: 200,
            genre: "Pop",
            released: true,
            album: "Patched Album",
        });
        expect(result).toEqual({
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 404,
            body: {
                error: "Song not found",
            },
        });
    });

    it("should return status code 400 for other errors during patching", async () => {
        // Arrange
        const editSong = jest.fn().mockRejectedValue(new Error("Invalid input"));

        const patchSong = makePatchSong({ editSong });

        const httpRequest = {
            params: { id: "song-id-1" },
            body: {
                title: "Patched Song",
                artist: "Patched Artist",
                duration: 200,
                genre: "Pop",
                released: true,
                album: "Patched Album",
            },
            query: {},
            method: "PATCH",
            path: "/api/songs/song-id-1",
            headers: {},
        };

        // Act
        const result = await patchSong(httpRequest);

        // Assert
        expect(editSong).toHaveBeenCalledWith({
            id: "song-id-1",
            title: "Patched Song",
            artist: "Patched Artist",
            duration: 200,
            genre: "Pop",
            released: true,
            album: "Patched Album",
        });
        expect(result).toEqual({
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 400,
            body: {
                error: "Invalid input",
            },
        });
    });
});
