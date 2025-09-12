import Joi from "joi";
import { CreateTermDto, createTermSchema } from "../../terms/dto/create-term.dto";

export interface CreateWatchlistDto {
    name: string;
    terms: CreateTermDto[];
}

export const createWatchlistSchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required(),
    
    terms: Joi.array()
      .items(createTermSchema)
      .min(1)
      .max(50)
      .required()
});