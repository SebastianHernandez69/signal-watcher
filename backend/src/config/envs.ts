import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars{
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    OPENAI_API_KEY: string;
    OPENAI_MODEL: string;
    REDIS_URL: string;
    FRONTEND_URL: string;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().required(),
    DATABASE_URL: joi.string().required(),
    OPENAI_API_KEY: joi.string().required(),
    OPENAI_MODEL: joi.string().required(),
    REDIS_URL: joi.string().required(),
    FRONTEND_URL: joi.string().required(),
}).unknown(true);

const { error, value } = envsSchema.validate( process.env );

if(error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    nodeEnv: envVars.NODE_ENV,
    databaseUrl: envVars.DATABASE_URL,
    openaiApiKey: envVars.OPENAI_API_KEY,
    openaiModel: envVars.OPENAI_MODEL,
    redisUrl: envVars.REDIS_URL,
    frontendUrl: envVars.FRONTEND_URL,
}