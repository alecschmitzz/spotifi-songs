import crypto from 'crypto'
import Id from '../Id'
import sanitizeHtml from 'sanitize-html'
import { buildMakeSong, Song } from './song'

const makeSong = buildMakeSong({ Id, md5, sanitize })

//workaround
//https://github.com/oven-sh/bun/issues/5426
export { makeSong };
export type { Song };

function md5(text: string): string {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}

function sanitize(text: string): string {
    return sanitizeHtml(text)
}
