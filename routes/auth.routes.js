import  {Router} from 'express'

const authRouter = Router();

authRouter.post('/sign-up', (res, req) => res.send({message: 'sign-up'}));
authRouter.post('/sign-in', (res, req) => res.send({message: 'sign-in'}));
authRouter.post('/sign-out', (res, req) => res.send({message: 'sign-out'}));

export default authRouter;