
export type rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ranks = [rank, rank, rank, rank];

export interface ICard {
    title: string,
    ranks: [rank, rank, rank, rank]
}