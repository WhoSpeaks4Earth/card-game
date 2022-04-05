import { IBoard, IBoardCell } from "../models/IBoard";
import { ICard } from "../models/ICard";


export class CardService {

    removeCardFromSet(card: ICard, set: ICard[]): ICard[] {
        return set.filter(c => c.title !== card.title);
    }

}