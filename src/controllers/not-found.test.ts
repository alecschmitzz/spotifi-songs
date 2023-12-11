import notFound from "./not-found";

describe("notFound", () => {
    it("should return a not found response with status code 404", async () => {
        // Act
        const result = await notFound();

        // Assert
        expect(result).toEqual({
            headers: { "Content-Type": "application/json" },
            body: { error: "Not found." },
            statusCode: 404,
        });
    });
});
