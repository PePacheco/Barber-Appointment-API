import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

// Route : http://localhost:3333/sessions

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({ email, password });

        return response.json({ data: {user, token} });
    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;