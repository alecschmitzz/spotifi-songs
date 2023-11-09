export default function makeDeleteSong({ removeSong }) {
    return async function deleteSong(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const deleted = await removeSong({ id: httpRequest.params.id }); // Adjust the parameter extraction according to your routes and URL structure
            return {
                headers,
                statusCode: deleted.deletedCount === 0 ? 404 : 200,
                body: { deleted },
            };
        } catch (e) {
            // TODO: Error logging
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: e.message,
                },
            };
        }
    };
}
