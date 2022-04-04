import { IBoard, IBoardCell } from "../models/IBoard";


export class BoardService {

    private readonly MAX_GRID_LENGTH: number = 4;

    public createBoard(xLength: number, yLength: number): IBoard {
        if (xLength > this.MAX_GRID_LENGTH || yLength > this.MAX_GRID_LENGTH)
            throw('exceeded game board max length')

        if (xLength < 0 && yLength < 0)
            throw('board dimensions not allowed')

        const newBoard: IBoard = {
            xLength,
            yLength,
            cells: this.generateCells(xLength, yLength)
        };

        return newBoard;
    }

    public createBoardFromPlacement(currentBoard: IBoard, newPlacement: IBoardCell): IBoard {
        const newBoard = currentBoard;
        const [x, y] = newPlacement.cell;
        newBoard.cells[y][x] = {...newPlacement};
        return newBoard;
    }

    private generateCells(xLength: number, yLength: number): IBoardCell[][] {
        const cells: IBoardCell[][] = [];
        for (let y = 0; y <= yLength; y++) {

            const xCells: IBoardCell[] = [];
            for (let x = 0; x <= xLength; x++)
                xCells.push({cell: [x, y], card: null})

            cells.push(xCells);
        }

        return cells;
    }

}