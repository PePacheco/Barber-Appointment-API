import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default class DayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.params.id;
        const { month, year, day } = request.body;

        const listProviderDayAvailability = container.resolve(ListDayAvailabilityService);

        const availabilty = await listProviderDayAvailability.execute({ provider_id, day, year, month });

        return response.json(availabilty);
    }
}