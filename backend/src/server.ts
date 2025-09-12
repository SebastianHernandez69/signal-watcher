import app from "./app";
import { envs } from "./config/envs";
import { prisma } from "./infra/prisma";
import { logger } from "./utils/logger";

const port = envs.port;

async function bootstrap() {
    try {

        await prisma.$connect();
        logger.info("Connected to database");

        app.listen(port);
        logger.info(`Server is running on port ${port}`);
    } catch (error) {
        logger.error(`Server failed to start: ${error}`);
        process.exit(1);
    }
}

bootstrap();
