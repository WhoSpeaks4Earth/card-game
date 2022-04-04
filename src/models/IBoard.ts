import { ICard } from "./ICard";

export interface IBoard {
    xLength: number,
    yLength: number,
    cells: IBoardCell[][]
}

export interface IBoardCell {
    cell: [number, number],
    card: ICard | null
}