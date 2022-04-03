import { IBoard, IBoardCell } from "../models/IBoard";


export const BoardFactory = () => {

    const MAX_GRID_LENGTH: number = 4;

    const createBoard = (xLength: number, yLength: number): IBoard => {
        if (xLength > MAX_GRID_LENGTH || yLength > MAX_GRID_LENGTH)
            throw('exceeded game board max length')

        if (xLength < 0 && yLength < 0)
            throw('board dimensions not allowed')

        const newBoard: IBoard = {
            xLength,
            yLength,
            cells: generateCells(xLength, yLength)
        };

        return newBoard;
    }

    const generateCells = (xLength: number, yLength: number): IBoardCell[][] => {
        const cells: IBoardCell[][] = [];
        for (let y = 0; y <= yLength; y++) {

            const xCells: IBoardCell[] = [];
            for (let x = 0; x <= xLength; x++)
                xCells.push({xPos: x, yPos: y, card: null})

            cells.push(xCells);
        }

        return cells;
    }

    return {
        createBoard
    }

}