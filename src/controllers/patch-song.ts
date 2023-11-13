import { HttpRequest, Song } from "../use-cases/types";

interface PostSongDependencies {
    editSong: ({ id, ...changes }: { [key: string]: any; id: string }) => Promise<Song>;
}

export default function makePatchSong({ editSong }: PostSongDependencies) {
    return async function patchSong(httpRequest: HttpRequest) {
        try {
            const { ...songInfo } = httpRequest.body;
            const toEdit = {
                ...songInfo,
                id: httpRequest.params.id,
            };
            const patched = await editSong(toEdit);
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Last-Modified': new Date(patched.updatedAt!).toUTCString(),
                },
                statusCode: 200,
                body: { patched },
            };
        } catch (e: any) {
            // TODO: Error logging
            // console.log(e);
            if (e.name === 'RangeError') {
                return {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    statusCode: 404,
                    body: {
                        error: e.message,
                    },
                };
            }
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
