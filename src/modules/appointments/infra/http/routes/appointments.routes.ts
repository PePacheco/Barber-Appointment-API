import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

// Route : http://localhost:3333/appointments

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return response.json(await appointmentsRepository.find());
});

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    
    const createAppointment = new CreateAppointmentService();
    
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appointment);
});

export default appointmentRouter;