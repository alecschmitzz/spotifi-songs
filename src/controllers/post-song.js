export default function makePostSong({ addSong }) {
    return async function postSong(httpRequest) {
        try {
            const { ...songInfo } = httpRequest.body;
            const posted = await addSong({ ...songInfo });
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(posted.modifiedOn).toUTCString(),
                },
                statusCode: 201,
                body: { posted },
            };
        } catch (e) {
            // TODO: Error logging
            console.log(e);

            return {
                headers: {
                    'Content-Type': 'application/json',
                },
                statusCode: 400,
                body: {
                    error: e.message,
                },
            };
        }
    };
}
