import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PasswordController from '../controllers/PasswordController';

const passwordRouter = Router();
const passwordController = new PasswordController();

// Route : http://localhost:3333/password

passwordRouter.post(
    '/forgot', 
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string()
        }
    }),
    passwordController.create
);

passwordRouter.put(
    '/reset', 
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required,
            password: Joi.string().required()
        }
    }),
    passwordController.update
);

export default passwordRouter;