import { IBoard } from "./IBoard"
import { ICard } from "./ICard"


export interface IGame {
    board: IBoard,
    playerHand: {cards: ICard[], activeIndex: number},
    opponentHand: {cards: ICard[], activeIndex: number},
    isPlayerTurn: boolean
}