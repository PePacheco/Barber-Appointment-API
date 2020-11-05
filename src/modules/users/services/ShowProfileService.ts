import { inject, injectable } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface Request {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    
    public async execute({ user_id }: Request) : Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found', 401);
        }

        return user;
    }
}

export default ShowProfileService;