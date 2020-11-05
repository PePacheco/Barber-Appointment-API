import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthentication from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

// Route : http://localhost:3333/users

profileRouter.use(ensureAuthentication);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;