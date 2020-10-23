import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';

class EtherealMailProvider implements IMailProvider{
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });
            this.client = transporter;
        }); 
    }

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: 'Pedro Pacheco <pedro.pacheco98@outlook.com>',
            to,
            subject: 'Recuperação de senha',
            text: body
        });
        console.log(`Message sent: ${message.messageId}`);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;