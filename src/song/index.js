import crypto from 'crypto'
import Id from '../Id'
import sanitizeHtml from 'sanitize-html'
import buildMakeSong from './song'

const makeSong = buildMakeSong({ Id, md5, sanitize })

export default makeSong


function md5(text) {
    return crypto
        .createHash('md5')
        .update(text, 'utf-8')
        .digest('hex')
}

function sanitize(text) {
    return sanitizeHtml(text)
}
