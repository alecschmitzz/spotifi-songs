import makePostSong from "./post-song";

describe("postSong", () => {
    it("should add a new song and return status code 201", async () => {
        // Arrange
        const addSong = jest.fn().mockResolvedValue({
            id: "new-song-id",
            title: "New Song",
            artist: "New Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "New Album",
            hash: "new-song-hash",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        const postSong = makePostSong({ addSong });

        const httpRequest = {
            body: {
                title: "New Song",
                artist: "New Artist",
                duration: 180,
                genre: "Rock",
                released: true,
                album: "New Album",
            },
        };

        // Act
        const result = await postSong(httpRequest);

        // Assert
        expect(addSong).toHaveBeenCalledWith({
            title: "New Song",
            artist: "New Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "New Album",
        });
        expect(result).toEqual({
            headers: {
                "Content-Type": "application/json",
            },
            statusCode: 201,
            body: {
                id: "new-song-id",
                title: "New Song",
                artist: "New Artist",
                duration: 180,
                genre: "Rock",
                released: true,
                album: "New Album",
                hash: "new-song-hash",
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            },
        });
    });

    it("should return status code 400 for errors during song addition", async () => {
        // Arrange
        const addSong = jest.fn().mockRejectedValue(new Error("Invalid input"));

        const postSong = makePostSong({ addSong });

        const httpRequest = {
            body: {
                title: "New Song",
                artist: "New Artist",
                duration: 180,
                genre: "Rock",
                released: true,
                album: "New Album",
            },
        };

        // Act
        const result = await postSong(httpRequest);

        // Assert
        expect(addSong).toHaveBeenCalledWith({
            title: "New Song",
            artist: "New Artist",
            duration: 180,
            genre: "Rock",
            released: true,
            album: "New Album",
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
