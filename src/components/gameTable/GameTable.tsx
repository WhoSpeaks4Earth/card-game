import { useEffect, useState } from "react";
import { IGame } from "../../models/IGame";
import { BoardFactory } from "../../services/board.factory";
import { CardService } from "../../services/card.service";
import { Board } from "../board/Board";
import { CardHand } from "../cardHand/CardHand";
import './gameTable.css';


export const GameTable = () => {

    const [game, setGame] = useState<IGame>({
        playerHand: [],
        opponentHand: [],
        selectedCard: null,
        board: BoardFactory().createBoard(2, 2),
        isPlayerTurn: true
    });

    useEffect(() => {
        const cardService = new CardService();
        const playerCards = cardService.getCards()
        setGame({
            ...game,
            playerHand: playerCards,
            opponentHand: cardService.getCards(),
            selectedCard: playerCards[0] ?? null
        });
    }, []);

    
    return (
        <div className='game-table'>
            <div className='side-panel'>
                <CardHand cards={game.opponentHand} />
            </div>
            <div className='table-board'>
                <Board board={game.board} />
            </div>
            <div className='side-panel'>
                <CardHand cards={game.playerHand} />
            </div>
        </div>
    )
}