import makeDeleteSong from "./delete-song";

describe("deleteSong", () => {
    it("should delete a song and return 200 if deletedCount is greater than 0", async () => {
        // Arrange
        const removeSong = jest.fn().mockResolvedValue({ deletedCount: 1 });
        const deleteSong = makeDeleteSong({ removeSong });

        // Extend the httpRequest object to include additional properties
        const httpRequest = {
            params: {
                id: "song-id-to-delete",
            },
            body: {}, // Include an empty body
            query: {}, // Include an empty query
            method: "DELETE", // Include a method
            path: "/api/songs", // Include a path
            headers: {}, // Include headers
        };

        // Act
        const result = await deleteSong(httpRequest);

        // Assert
        expect(removeSong).toHaveBeenCalledWith({ id: "song-id-to-delete" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 200,
            body: { deleted: { deletedCount: 1 } },
        });
    });

    it("should return 404 if deletedCount is 0", async () => {
        // Arrange
        const removeSong = jest.fn().mockResolvedValue({ deletedCount: 0 });
        const deleteSong = makeDeleteSong({ removeSong });

        const httpRequest = {
            params: {
                id: "non-existent-song-id",
            },
            body: {},
            query: {},
            method: "DELETE",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await deleteSong(httpRequest);

        // Assert
        expect(removeSong).toHaveBeenCalledWith({ id: "non-existent-song-id" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 404,
            body: { deleted: { deletedCount: 0 } },
        });
    });

    it("should return 400 if an error occurs during deletion", async () => {
        // Arrange
        const removeSong = jest.fn().mockRejectedValue(new Error("Delete error"));
        const deleteSong = makeDeleteSong({ removeSong });

        const httpRequest = {
            params: {
                id: "song-id-to-delete",
            },
            body: {},
            query: {},
            method: "DELETE",
            path: "/api/songs",
            headers: {},
        };

        // Act
        const result = await deleteSong(httpRequest);

        // Assert
        expect(removeSong).toHaveBeenCalledWith({ id: "song-id-to-delete" });
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            statusCode: 400,
            body: { error: "Delete error" },
        });
    });
});
