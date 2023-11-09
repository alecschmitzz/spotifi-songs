export default function makeGetSongs({ listSongs }) {
    return async function getSongs(httpRequest) {
        const headers = {
            'Content-Type': 'application/json',
        };
        try {
            const songs = await listSongs();
            return {
                headers,
                statusCode: 200,
                body: songs,
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
