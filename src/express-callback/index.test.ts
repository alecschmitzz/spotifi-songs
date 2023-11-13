import { mockRequest, mockResponse } from 'jest-mock-req-res';
import makeExpressCallback from '.'; // replace with the actual path

describe('makeExpressCallback', () => {
    it('should call the controller with the correct httpRequest', async () => {
        const mockController = jest.fn(async () => ({ statusCode: 200, body: {} }));
        const expressCallback = makeExpressCallback(mockController);

        const req = mockRequest();
        const res = mockResponse();

        await expressCallback(req, res);

        expect(mockController).toHaveBeenCalledWith({
            body: req.body,
            query: req.query,
            params: req.params,
            ip: req.ip,
            method: req.method,
            path: req.path,
            headers: {
                'Content-Type': req.get('Content-Type'),
                Referer: req.get('referer'),
                'User-Agent': req.get('User-Agent')
            }
        });
    });

    it('should set response headers and send the correct response when controller succeeds', async () => {
        const mockController = jest.fn(async () => ({
            statusCode: 200,
            body: { key: 'value' },
            headers: { 'Custom-Header': 'custom-value' },
        }));
        const expressCallback = makeExpressCallback(mockController);

        const req = mockRequest();
        const res = mockResponse();

        await expressCallback(req, res);

        expect(res.set).toHaveBeenCalledWith({ 'Custom-Header': 'custom-value' });
        expect(res.type).toHaveBeenCalledWith('json');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ key: 'value' });
    });
    it('should send a 500 status with an error message when an unknown error occurs', async () => {
        const mockController = jest.fn(async () => {
            throw new Error('Unknown error');
        });
        const expressCallback = makeExpressCallback(mockController);

        const req = mockRequest();
        const res = mockResponse();

        try {
            await expressCallback(req, res);
        } catch (error) {
            // Ensure the promise is rejected
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'An unknown error occurred.' });
        }
    });


});
