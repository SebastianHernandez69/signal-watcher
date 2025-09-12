import Joi from 'joi';

export interface SimulateEventDto {
    eventType: 'suspicious_domain' | 'malware_detected' | 'phishing_attempt' | 'data_breach';
    details: {
      domain?: string;
      ip?: string;
      malwareHash?: string;
      affectedUsers?: number;
      [key: string]: any;
    };
    watchlistId: string;
  }

export const simulateEventSchema = Joi.object({
    eventType: Joi.string()
      .valid('suspicious_domain', 'malware_detected', 'phishing_attempt', 'data_breach')
      .required()
      .messages({
        'any.only': 'Tipo de evento inválido',
        'any.required': 'El tipo de evento es requerido'
      }),
    
    details: Joi.object({
      domain: Joi.string().optional(),
      ip: Joi.string().ip().optional(),
      malwareHash: Joi.string().optional(),
      affectedUsers: Joi.number().integer().min(0).optional()
    }).unknown(true).required(),
    
    watchlistId: Joi.string()
      .uuid()
      .required()
});