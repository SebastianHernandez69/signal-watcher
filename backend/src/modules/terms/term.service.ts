import { PrismaClient } from "@prisma/client";
import { CreateTermDto } from "./dto/create-term.dto";
import { logger } from "../../utils/logger";
import { BadRequestError, NotFoundError } from "../../utils/errors";

export class TermService {
    constructor(private prisma: PrismaClient) {}

    async createTerm(watchlistId: string, dto: CreateTermDto): Promise<any> {
        const term = await this.prisma.term.create({
            data: {
                value: dto.value,
                watchlist: {
                    connect: {
                        id: watchlistId
                    }
                }
            }
        });
        logger.info({ term }, "Term created successfully");
        return term;
    }

    async getTermById(termId: string){
        const term = await this.prisma.term.findUnique({
            where: {
                id: termId
            }
        });
        logger.info({ term }, "Term found successfully");
        return term;
    }

    async removeTerm(termId: string){
        const term = await this.getTermById(termId);
        
        if (!term) {
            throw new NotFoundError("Term not found");
        }

        const deletedTerm = await this.prisma.term.delete({
            where: {
                id: termId
            }
        });

        logger.info({ deletedTerm }, "Term deleted successfully");
        return deletedTerm;
    }

    async removeTermsByWatchlistId(watchlistId: string){
        const deletedTerms = await this.prisma.term.deleteMany({
            where: {
                watchlist: {
                    id: watchlistId
                }
            }
        });
        logger.info({ deletedTerms }, "Terms deleted successfully");
        return deletedTerms;
    }

    async addTermsByWatchlistId(watchlistId: string, terms: CreateTermDto[]){
        const addedTerms = await this.prisma.term.createMany({
            data: terms.map((term) => ({
                value: term.value,
                watchlistId
            }))
        });

        const newTerms = await this.prisma.term.findMany({
            where: {
                watchlist: {
                    id: watchlistId
                }
            }
        });

        logger.info({ newTerms }, "Terms added successfully");
        return newTerms;
    }
}