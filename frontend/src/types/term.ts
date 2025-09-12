export interface Term {
    id: string;
    value: string;
    watchlistId: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTermDto {
    value: string;
}