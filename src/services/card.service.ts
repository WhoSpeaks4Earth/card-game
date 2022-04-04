import { IBoard, IBoardCell } from "../models/IBoard";
import { ICard } from "../models/ICard";


export class CardService {

    removeCardFromSet(card: ICard, set: ICard[]): ICard[] {
        return set.filter(c => c.title !== card.title);
    }

    determineBestPlacement(board: IBoard, hand: ICard[]): IBoardCell {
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