import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthentication from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Route : http://localhost:3333/users

usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensureAuthentication, upload.single('avatar'), userAvatarController.update);

export default usersRouter;