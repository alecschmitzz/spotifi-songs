import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';
import { buildMakeSong } from './song';
import { md5, sanitize } from '.';

// Mocking the Id module
jest.mock('../Id', () => ({
    makeId: jest.fn(() => 'mocked-id'),
    isValidId: jest.fn((id: string) => id === 'mocked-id'),
}));

describe('buildMakeSong', () => {
    const makeIdMock = jest.fn(() => 'mocked-id');
    const md5Mock = jest.fn((text: string) => crypto.createHash('md5').update(text, 'utf-8').digest('hex'));
    const sanitizeMock = jest.fn((text: string) => sanitizeHtml(text));

    const makeSong = buildMakeSong({
        Id: {
            makeId: makeIdMock,
            isValidId: (id: string) => id === 'mocked-id',
        },
        md5: md5Mock,
        sanitize: sanitizeMock,
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('creates a valid Song object', () => {
        const validSongData = {
            title: 'Valid Title',
            artist: 'Valid Artist',
            duration: 120,
            genre: 'Rock',
            album: 'Valid Album',
        };

        const song = makeSong(validSongData);

        expect(song.getTitle()).toBe('Valid Title');
        expect(song.getArtist()).toBe('Valid Artist');
        expect(song.getDuration()).toBe(120);
        expect(song.getId()).toBe('mocked-id');
        expect(song.getGenre()).toBe('Rock');
        expect(song.getAlbum()).toBe('Valid Album');
        expect(song.getReleased()).toBe(false);
        expect(typeof song.getHash()).toBe('string');
        expect(makeIdMock).toHaveBeenCalled();
        expect(md5Mock).toHaveBeenCalled();
        expect(sanitizeMock).toHaveBeenCalled();
    });

    it('throws an error for an invalid id', () => {
        const invalidSongData = {
            title: 'Invalid Title',
            artist: 'Invalid Artist',
            duration: 180,
            genre: 'Pop',
            album: 'Invalid Album',
            id: 'invalid-id',
        };

        expect(() => makeSong(invalidSongData)).toThrow('Song must have a valid id.');
    });

    describe('md5', () => {
        it('calculates the MD5 hash correctly', () => {
            const hash = md5('test');
            const hashed = "098f6bcd4621d373cade4e832627b4f6"
            expect(hash).toEqual(hashed);
            // Add more specific hash expectation if needed
        });
    });

    describe('sanitize', () => {
        it('sanitizes HTML correctly', () => {
            const sanitizedText = sanitize('<a>Test</a>');
            const expectedSanitizedText = '<a>Test</a>';
            expect(sanitizedText).toBe(expectedSanitizedText);
        });
        it('handles complex HTML input', () => {
            const htmlInput = '<p>This is <script>alert("dangerous");</script> <iframe src="https://example.com"></iframe> HTML.</p>';
            const sanitizedText = sanitize(htmlInput);
            const expectedSanitizedText = '<p>This is   HTML.</p>';

            expect(sanitizedText).toBe(expectedSanitizedText);
        });
    });
});
