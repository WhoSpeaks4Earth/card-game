import { IBoard } from "../models/IBoard";
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

export class DealerService {

    getOpponentCards(count: number): ICard[] {
        return cards.slice(0, count);
    }

    getPlayerCards(count: number): ICard[] {
        return cards.slice(0, count).map((c: ICard) => {
            return {...c, isPlayerCard: true}
        });
    }

    determineWinner(board: IBoard): 'player' | 'opponent' | 'draw' {
        let playerCount = 0;
        let opponentCount = 0;

        for (let i = 0; i < board.cells.length; i++) {
            for (let j = 0; j < board.cells[i].length; j++) {
                if (board.cells[i][j].card?.isPlayerCard)
                    playerCount++;
                else
                    opponentCount++;
            }
        }

        if (playerCount > opponentCount)
            return 'player';
        else if (opponentCount > playerCount)
            return 'opponent'
        else
            return 'draw'
    }
}