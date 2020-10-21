import { Router } from 'express';

import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const passwordController = new PasswordController();

// Route : http://localhost:3333/password

passwordRouter.post('/forgot', passwordController.create);

passwordRouter.put('/reset', passwordController.update);

export default passwordRouter;