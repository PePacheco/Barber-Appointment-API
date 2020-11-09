import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { container, inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

interface Request {
    date: Date;
    provider_id: string;
    user_id: string;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,
    ) {}

    public async execute({ user_id, date, provider_id }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can´t create an appointment on past date.");
        }

        if(user_id === provider_id) {
            throw new AppError("You can´t create an appointment with yourself.");
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError("You can only create appointments between 8am and 5pm.");
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate) {
            throw new AppError('This appointment is alread booked', 400);
        }

        const appointment = await this.appointmentsRepository.create({ provider_id, user_id, date: appointmentDate }); 

        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormated}`
        });
        
        return appointment;
    }
}

export default CreateAppointmentService;