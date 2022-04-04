import { IBoard } from "./IBoard"
import { ICard } from "./ICard"

export type winner = 'player' | 'opponent' | 'draw' | null

export interface IGame {
    board: IBoard,
    playerHand: {cards: ICard[], activeIndex: number},
    opponentHand: {cards: ICard[], activeIndex: number},
    isPlayerTurn: boolean,
    winner: winner
}