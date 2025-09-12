import Joi from 'joi';

export interface CreateEventDto {
  rawText: string;
  watchlistId: string;
}

export const createEventSchema = Joi.object<CreateEventDto>({
  rawText: Joi.string().trim().min(10).max(2000).required(),
  watchlistId: Joi.string().uuid().required(),
});
