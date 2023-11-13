import { Request, Response } from 'express';
import { HttpRequest } from '../use-cases/types';

type ExpressCallback = (req: Request, res: Response) => void;

export default function makeExpressCallback(controller: (httpRequest: HttpRequest) => Promise<any>): ExpressCallback {
    return (req, res) => {
        const httpRequest: HttpRequest = {
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
        };

        controller(httpRequest)
            .then(httpResponse => {
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }
                res.type('json');
                res.status(httpResponse.statusCode).send(httpResponse.body);
            })
            .catch(e => res.status(500).send({ error: 'An unknown error occurred.' }));
    };
}
