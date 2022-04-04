import { IBoard, IBoardCell } from "../models/IBoard";


export class BoardService {

    public createBoard(xLength: number, yLength: number): IBoard {
        const newBoard: IBoard = {
            xLength,
            yLength,
            cells: this.getCells(xLength, yLength)
        };
        return newBoard;
    }

    public getCardsPerHand(board: IBoard) {
        const cellCount = this.getCellCount(board);
        return cellCount % 2 === 0 ? (cellCount / 2) : ((cellCount + 1) / 2)
    }

    public getNewBoardFromPlacement(placement: IBoardCell, currentBoard: IBoard): IBoard {
        // debugger;
        const [x, y] = placement.cell;
        const newBoard = currentBoard;
        newBoard.cells[y][x].card = placement.card;
        return newBoard;
    }

    public isBoardFull(board: IBoard): boolean {
        const flattenedCells = board.cells.flat();
        let isBoardFull = true;

        for (let i = 0; i < flattenedCells.length; i++) {
            if (!flattenedCells[i].card) {
                isBoardFull = false;
                break;
            }
        }

        return isBoardFull;
    }


    private getCellCount(board: IBoard): number {
        return board.cells.length * board.cells[0].length;
    }

    private getCells(xLength: number, yLength: number): IBoardCell[][] {
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