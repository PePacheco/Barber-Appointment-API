import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

// Route : http://localhost:3333/sessions

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.json({ data: {user, token} });
});

export default sessionsRouter;