import { IBoard } from "./IBoard"
import { ICard } from "./ICard"


// export interface IBoardPlacement {
//     cell: number,
//     card: ICard,
//     isPlayerCard: boolean
// }

export interface IGame {
    board: IBoard,
    playerHand: ICard[],
    opponentHand: ICard[],
    selectedCard: ICard | null,
    isPlayerTurn: boolean
}