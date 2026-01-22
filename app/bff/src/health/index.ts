import { Router, Request, Response } from 'express';

const healthRouter = Router();

healthRouter.get('/isAlive', (req: Request, res: Response) => {
    res.status(200).end();
});

healthRouter.get('/isReady', (req: Request, res: Response) => {
    res.status(200).end();
})

export default healthRouter;