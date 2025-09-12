import { Request, Response, NextFunction } from 'express';
import { EventService } from './event.service';
import { logger } from '../../utils/logger';

export class EventController {
    constructor(private readonly eventService: EventService){}

    async createEvent(req: Request, res: Response, next: NextFunction){
        const { rawText, watchlistId } = req.body;
        const correlationId = req.get('X-Correlation-Id') as string;
        
        try {
            const event = await this.eventService.createEvent({ rawText, watchlistId }, correlationId);
            
            logger.info({ correlationId, eventId: event.id, severity: event.severity }, 'Event created successfully');
            res.status(201).json(event);
        } catch (error) {
            next(error);
        }
    }

    async simulateEvent(req: Request, res: Response, next: NextFunction){
        const correlationId = req.get('X-Correlation-Id') as string;
        const { eventType, details, watchlistId } = req.body;

        try {
            const event = await this.eventService.simulateEvent({ eventType, details, watchlistId }, correlationId);
            
            logger.info({ correlationId, eventId: event.id, eventType: eventType, severity: event.severity }, 'Event simulated successfully');
            
            res.status(201).json(event);
        } catch (error) {
            next(error);
        }
    }

    async getEventsByWatchlist(req: Request, res: Response, next: NextFunction){
        const correlationId = req.get('X-Correlation-Id') as string;
        const { watchlistId } = req.params;
        
        try {
            const events = await this.eventService.getEventsByWatchlistId(watchlistId, correlationId);
            
            logger.info({ correlationId, watchlistId, count: events.length }, 'Events retrieved successfully');
            
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }

    async getAllEvents(req: Request, res: Response, next: NextFunction){
        try {
            const events = await this.eventService.getAllEvents();
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }
}