import { ICard } from "./ICard"


export interface IBoardPlacement {
    cell: number,
    card: ICard,
    isPlayerCard: boolean
}

export interface IGame {
    playerHand: ICard[],
    opponentHand: ICard[],
    selectedCard: ICard | null,
    boardPlacements: (IBoardPlacement | null)[],
    isPlayerTurn: boolean
}