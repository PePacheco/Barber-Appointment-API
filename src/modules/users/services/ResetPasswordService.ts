import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface Request {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository
    ){}

    public async execute({ token, password }: Request): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if(!user) {
            throw new AppError('User does not exists');
        }

        user.password = await hash(password, 8);
        
        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;