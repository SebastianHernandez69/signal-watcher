export const createFactoryError = (name: string, statusCode: number, code?: string) => {
    return class extends Error {
        
        public readonly statusCode: number;
        public readonly code?: string;

        constructor(message: string = 'An error occurred', ) {
            super(message);
            this.statusCode = statusCode;
            this.name = name;
            this.code = code;
            
            Error.captureStackTrace(this, createFactoryError);
            // Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
        }
    }
}

export const BadRequestError = createFactoryError('BadRequestError', 400);
export const UnauthorizedError = createFactoryError('UnauthorizedError', 401);
export const ForbiddenError = createFactoryError('ForbiddenError', 403);
export const NotFoundError = createFactoryError('NotFoundError', 404);
export const InternalServerError = createFactoryError('InternalServerError', 500);
export const TooManyRequestsError = createFactoryError('TooManyRequestsError', 429);