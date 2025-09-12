import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "../utils/errors";
import { logger } from "../utils/logger";

export const validateBody = (schema: Joi.ObjectSchema) => 
    (req: Request, res: Response, next: NextFunction) => {

        const correlationId = req.headers['x-correlation-id'] as string;

        try {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false, 
                allowUnknown: false,
                stripUnknown: true,
            });
    
            if(error){
                const message = error.details.map(d => d.message).join(', ');
    
                logger.warn({
                    correlationId,
                    endpoint: req.path,
                    method: req.method,
                    validationErrors: error.details.map(d => ({
                        field: d.path.join('.'),
                        message: d.message,
                        value: d.context?.value
                    }))
                }, 'Body validation failed');

                return next(new BadRequestError(`Validation error: ${message}`));
            }

            req.body = value;
            next();
        } catch (error: any) {
            logger.error({
                correlationId,
                endpoint: req.path,
                method: req.method,
                error: error.message
            }, 'Unexpected error in body validation middleware');
            
            next(error);
        }

    }

export const validateParams = (schema: Joi.ObjectSchema) => 
    (req: Request, res: Response, next: NextFunction) => {
        const correlationId = req.headers['x-correlation-id'] as string;

        try {
            const { error, value } = schema.validate(req.params, {
                abortEarly: false,
                allowUnknown: false,
                stripUnknown: true,
            });

            if(error){
                const message = error.details.map(d => d.message).join(', ');

                logger.warn({
                    correlationId,
                    endpoint: req.path,
                    method: req.method,
                    validationErrors: error.details.map(d => ({
                        field: d.path.join('.'),
                        message: d.message,
                        value: d.context?.value
                    }))
                }, 'Params validation failed');

                return next(new BadRequestError(`Validation error: ${message}`));
            }

            req.params = value;
            next();
        } catch (error: any) {
            logger.error({
                correlationId,
                endpoint: req.path,
                method: req.method,
                error: error.message
            }, 'Unexpected error in params validation middleware');
            next(error);
        }
    }