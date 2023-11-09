export default function makeGetSong({ getSingleSong }) {
    return async function getSong(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const song = await getSingleSong({ id: httpRequest.params.id });
            return {
                headers,
                statusCode: 200,
                body: song,
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
