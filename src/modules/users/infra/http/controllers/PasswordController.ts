import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

class PasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmailService);

        await sendForgotPasswordEmail.execute({
            email
        });

        return response.status(204).json();
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;

        const resetPassword = container.resolve(ResetPasswordService);

        await resetPassword.execute({
            token,
            password
        });

        return response.status(200).json();
    }
}

export default PasswordController;