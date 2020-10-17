import { getRepository } from 'typeorm';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
    userId: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    private usersRepository: IUsersRepository;

    constructor(usersRepository: IUsersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public async execute({ userId, avatarFilename }: Request) : Promise<User>{
        const user = await this.usersRepository.findById(userId);

        if(!user) {
            throw new AppError('Only authenticated users can change avatar', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;