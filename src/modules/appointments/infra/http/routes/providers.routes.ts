import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../controllers/ProvidersController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const providerRouter = Router();
const providersController = new ProvidersController();
const dayAvailabilityController = new DayAvailabilityController();
const monthAvailabilityController = new MonthAvailabilityController();

// Route : http://localhost:3333/providers

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);

providerRouter.get(
    '/:id/month-availability', 
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required()
        }
    }),
    monthAvailabilityController.index
);

providerRouter.get(
    '/:id/day-availability', 
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required()
        }
    }),
    dayAvailabilityController.index
);

export default providerRouter;