import { IBoard } from "./IBoard"
import { ICard } from "./ICard"

export type winner = 'player' | 'opponent' | 'draw' | null

export interface IGame {
    board: IBoard,
    playerHand: {cards: (ICard | null)[], activeIndex: number},
    opponentHand: {cards: (ICard | null)[], activeIndex: number},
    isPlayerTurn: boolean,
    winner: winner
}