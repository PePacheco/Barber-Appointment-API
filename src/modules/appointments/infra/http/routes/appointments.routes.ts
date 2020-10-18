import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

// Route : http://localhost:3333/appointments

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get('/', async (request, response) => {
//     return response.json(await appointmentsRepository.find());
// });

appointmentRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    
    const createAppointment = container.resolve(CreateAppointmentService);
    
    const appointment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appointment);
});

export default appointmentRouter;