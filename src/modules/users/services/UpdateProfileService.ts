import { inject, injectable } from 'tsyringe';
import { hash, compare } from 'bcryptjs';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    
    public async execute({ user_id, name, email, password, old_password }: Request) : Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found', 401);
        }

        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

        if(userWithUpdatedEmail && user.id !== userWithUpdatedEmail.id) {
            throw new AppError('Email already in use', 401);
        }

        user.name = name;
        user.email = email;

        if(password && !old_password) {
            throw new AppError('You need to inform the old password', 401);
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError('Old password does not match', 401);
            }

            user.password = await hash(password, 8);
        }

        return this.usersRepository.save(user);
    }
}

export default UpdateProfileService;