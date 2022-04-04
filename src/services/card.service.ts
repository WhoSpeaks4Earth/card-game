import { IBoard, IBoardCell } from "../models/IBoard";
import { ICard } from "../models/ICard";


export class CardService {

    removeCardFromSet(card: (ICard | null), set: (ICard | null)[]): (ICard | null)[] {
        return set.map(c => {
            if (c?.title === card?.title)
                return null;
            return c;
        });
    }

    determineBestPlacement(board: IBoard, hand: (ICard | null)[]): IBoardCell {
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

}