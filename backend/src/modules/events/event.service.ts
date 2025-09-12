import { PrismaClient } from "@prisma/client";
import { CreateEventDto } from "./dto/create-event.dto";
import { SimulateEventDto } from "./dto/simulate-event.dto";
import { AIServiceFactory } from "../ai/ai.factory";
import { logger } from "../../utils/logger";
import { NotFoundError, InternalServerError, UnauthorizedError, TooManyRequestsError, BadRequestError } from "../../utils/errors";
import { AIProvider } from "../ai/interfaces/ai.provider";

export class EventService{
    private aiService: AIProvider;

    constructor(private readonly prisma: PrismaClient){
        this.aiService = AIServiceFactory.create();
    }

    async createEvent(createEventDto: CreateEventDto, correlationId: string){

        const { rawText, watchlistId } = createEventDto;

        try {
            logger.info({
                correlationId, 
                eventLength: rawText.length, 
                watchlistId},
            'Processing new event');
            
            const watchlist = await this.prisma.watchlist.findUnique({
                where: {
                    id: watchlistId
                },
                include: {
                    terms: true
                }
            });

            if (!watchlist) {
                throw new NotFoundError('Watchlist not found');
            }

            const watchlistTerms = watchlist.terms.map((term) => term.value);
            const aiAnalysis = await this.aiService.analyzeEvent(rawText, watchlistTerms);

            logger.info({
                correlationId, 
                severity: aiAnalysis.severity, 
                watchlistId},
            'Event processed successfully');
           
            // create event with ai analysis
            const event = await this.prisma.event.create({
                data: {
                    rawText,
                    summary: aiAnalysis.summary,
                    severity: aiAnalysis.severity,
                    suggestions: aiAnalysis.suggestions,
                    watchlistId
                },
                include: {
                    watchlist: {
                        include: {
                            terms: true
                        }
                    }
                }
            })

            return event;
        } catch (error) {
            if(error instanceof NotFoundError){
                throw error;
            }
            
            if(error instanceof UnauthorizedError || error instanceof TooManyRequestsError || error instanceof BadRequestError){
                throw error;
            }
            
            logger.error({ error, correlationId }, 'Error creating event');
            throw new InternalServerError('Error creating event');
        }
    }

    async simulateEvent(simulateEventDto: SimulateEventDto, correlationId: string){
        const { eventType, details, watchlistId } = simulateEventDto;
        
        return this.createEvent({
            rawText: this.generateEventText(eventType, details),
            watchlistId
        }, correlationId);
    }

    private generateEventText(eventType: string, details: any){
        const timestamp = new Date().toISOString();

        switch (eventType) {
            case 'suspicious_domain':
              return `[${timestamp}] ALERT: Suspicious domain detected - ${details.domain || 'unknown-domain.com'}. Potential phishing or malware distribution site. Source IP: ${details.ip || 'unknown'}`;
            
            case 'malware_detected':
              return `[${timestamp}] CRITICAL: Malware sample identified with hash ${details.malwareHash || 'SHA256:unknown'}. Potential threat to ${details.affectedUsers || 'multiple'} systems.`;
            
            case 'phishing_attempt':
              return `[${timestamp}] WARNING: Phishing attempt detected targeting financial services. Fraudulent domain: ${details.domain || 'fake-bank.com'} mimicking legitimate services.`;
            
            case 'data_breach':
              return `[${timestamp}] CRITICAL: Data breach incident reported affecting ${details.affectedUsers || 1000} user accounts. Immediate containment and investigation required.`;
            
            default:
              return `[${timestamp}] ALERT: Security event detected requiring analysis.`;
        }
    }

    async getEventsByWatchlistId(watchlistId: string, correlationId: string){
        try {
            // TODO: pagination
            const events = await this.prisma.event.findMany({
                where: {
                    watchlistId
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            logger.info({ events }, 'Events found successfully');
            return events;
        } catch (error) {
            logger.error({ error, correlationId }, 'Error getting events');
            throw new InternalServerError('Error getting events');
        }
    }

    async getAllEvents(){
        return this.prisma.event.findMany();
    }
}