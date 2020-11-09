import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthentication from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// Route : http://localhost:3333/users

profileRouter.use(ensureAuthentication);

profileRouter.put(
    '/', 
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string()
        }
    }),
    profileController.update
);
profileRouter.get('/', profileController.show);

export default profileRouter;