import { ICard } from "./ICard";

export interface IBoard {
    xLength: number,
    yLength: number,
    cells: IBoardCell[][]
}

export interface IBoardCell {
    xPos: number,
    yPos: number,
    card: ICard | null
}