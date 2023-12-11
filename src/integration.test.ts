import request from 'supertest';
import app from './index'; // Adjust the import path

let createdSongId: string;

describe('Integration Tests', () => {
    it('should create a new song', async () => {
        const response = await request(app)
            .post('/api/songs')
            .send({
                title: 'Test Song',
                artist: 'Test Artist',
                duration: 180,
                genre: 'Test Genre',
                album: 'Test Album',
            });

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Test Song');

        createdSongId = response.body.id;
        // Add more assertions as needed
    });

    it('should get all songs', async () => {
        const response = await request(app).get('/api/songs');

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should get a specific song', async () => {
        const songId = createdSongId;
        const response = await request(app).get(`/api/songs/${songId}`);

        expect(response.status).toBe(200);
        // Add more assertions as needed
    });

    it('should update a song', async () => {
        const songId = createdSongId;
        const response = await request(app)
            .patch(`/api/songs/${songId}`)
            .send({
                title: 'Updated Test Song',
            });

        expect(response.status).toBe(200);
        expect(response.body.patched.title).toBe('Updated Test Song');
    });

    it('should delete a song', async () => {
        const songId = createdSongId;
        const response = await request(app).delete(`/api/songs/${songId}`);

        expect(response.status).toBe(200);
        expect(response.body.deleted.deletedCount).toBe(1);
    });

    it('should handle not found routes', async () => {
        const response = await request(app).get('/api/nonexistent');

        expect(response.status).toBe(404);
    });
});
