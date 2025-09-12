import Joi from "joi";

export interface CreateTermDto {
    value: string;
}

export const createTermSchema = Joi.object({
    value: Joi.string()
      .trim()
      .min(1)
      .max(255)
      .required()
});