import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}
    
    public async execute({ provider_id, month, year, day }: Request) : Promise<Appointment[]>{
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({ provider_id, month, year, day });

        return appointments;
    }
}

export default ListMonthAvailabilityService;