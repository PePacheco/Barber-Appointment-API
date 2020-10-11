import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment'

const appointmentRouter = Router();

// Route : http://localhost:3333/appointments

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
    console.log(appointments);
    const { provider, date } = request.body;
    
    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find(appointment => 
        isEqual(parsedDate, appointment.date)
    );

    if(findAppointmentInSameDate) {
        return response.status(400).json({ message: "This appointment is already booked" });
    }

    const appointment = new Appointment(provider, parsedDate);
    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentRouter;