import { ICard } from "../models/ICard";


const cards: any[] = [
    {
        title: 'Apple',
        ranks: [6, 9, 8, 10]
    },
    {
        title: 'Microsoft',
        ranks: [7, 6, 10, 3]
    },
    {
        title: 'Tesla',
        ranks: [10, 7, 10, 9]
    },
    {
        title: 'IBM',
        ranks: [6, 9, 8, 10]
    },
    {
        title: 'Starbucks',
        ranks: [6, 7, 5, 9]
    },
    {
        title: 'Pelaton',
        ranks: [3, 1, 7, 4]
    },
]

export class CardService {

    getCards(): ICard[] {
        return cards.slice(0, 3);
    }

}