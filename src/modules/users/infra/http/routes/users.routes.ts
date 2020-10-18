import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthentication from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

// Route : http://localhost:3333/users

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
        name,
        email,
        password
    });
    
    return response.json(user);
});

usersRouter.patch(
    '/avatar', 
    ensureAuthentication, 
    upload.single('avatar'), 
    async (request, response) => {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            userId: request.user.id,
            avatarFilename: request.file.filename
        });

        return response.json(user);
    }
);

export default usersRouter;