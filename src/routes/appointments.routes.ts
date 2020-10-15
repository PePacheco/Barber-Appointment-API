import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

// Route : http://localhost:3333/appointments

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return response.json(await appointmentsRepository.find());
});

appointmentRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        
        const createAppointment = new CreateAppointmentService();
        
        const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

        return response.json(appointment);

    } catch(err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentRouter;