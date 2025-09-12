import { Router } from "express";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { prisma } from "../../infra/prisma";
import { validateBody } from "../../middlewares/validate";
import { createEventSchema } from "./dto/create-event.dto";
import { simulateEventSchema } from "./dto/simulate-event.dto";


const router = Router();
const eventService = new EventService(prisma);
const eventController = new EventController(eventService);

router.post('/create',validateBody(createEventSchema), eventController.createEvent.bind(eventController));
router.post('/simulate', validateBody(simulateEventSchema), eventController.simulateEvent.bind(eventController));
router.get('/watchlist/:watchlistId', eventController.getEventsByWatchlist.bind(eventController));
router.get('/', eventController.getAllEvents.bind(eventController));

export { router as eventRoutes };