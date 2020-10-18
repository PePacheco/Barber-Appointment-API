import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

// Route : http://localhost:3333/sessions

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;