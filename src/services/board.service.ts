import { IBoard, IBoardCell } from "../models/IBoard";
import { ICard } from "../models/ICard";


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
        const [x, y] = placement.cell;
        let newBoard = currentBoard;
        newBoard.cells[y][x].card = placement.card;
        debugger;

        const flips = this.getFlips(placement, currentBoard);

        newBoard = this.applyFlips(flips, newBoard);


        return newBoard;
    }


    // check if there are placed cells adjustent to this one
    // is opposite team?
        // is higher rank than me? - log my pos
        // higher rank than them? log their pos
    private getFlips(placement: IBoardCell, board: IBoard): [[number, number]] {
        return [[0,0]];
    }

    private applyFlips(flips: [[number, number]], board: IBoard): IBoard {

        const newBoard = board;

        flips.forEach((pos: [number, number]) => {
            const [x, y] = pos;
            const card = newBoard.cells[x][y].card;
            if (card) card.isPlayerCard = !card.isPlayerCard;
        })

        return newBoard;
        
        // const newBoard = board;
        // const cell = newBoard.cells[0][0];
        // if (cell.card) cell.card.isPlayerCard = !cell.card.isPlayerCard;

        // newBoard.cells[0][0] = cell;
        // return newBoard;
    }



    public determineBestPlacement(board: IBoard, hand: ICard[]): IBoardCell {
        let firstEmptyCell: [number, number] | null = null;

        for (let y = 0; y < board.cells.length; y++) {
            for (let x = 0; x < board.cells[y].length; x++) {
                if (!board.cells[y][x].card) {
                    firstEmptyCell = [x, y];
                    break;
                }
            }
            if (firstEmptyCell)
                break;
        }


        return {cell: firstEmptyCell as [number, number], card: hand[0]}
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