import { useEffect, useState } from "react";
import { IBoardCell } from "../../models/IBoard";
import { ICard } from "../../models/ICard";
import { IGame } from "../../models/IGame";
import { BoardService } from "../../services/board.service";
import { CardService } from "../../services/card.service";
import { Board } from "../board/Board";
import { CardHand } from "../cardHand/CardHand";
import { PlayerCardHand } from "../cardHand/PlayerCardHand";
import './gameTable.css';


export const GameTable = () => {
    const cardService = new CardService();
    const boardService = new BoardService();

    const [game, setGame] = useState<IGame>({
        playerHand: {cards: [], activeIndex: 0},
        opponentHand: {cards: [], activeIndex: 0},
        board: boardService.createBoard(2, 2),
        isPlayerTurn: true
    });

    useEffect(() => {
        const playerCards = cardService.getPlayerCards()
        setGame({
            ...game,
            playerHand: {cards: playerCards, activeIndex: 0},
            opponentHand: {cards: cardService.getOpponentCards(), activeIndex: 0},
        });
    }, []);

    useEffect(() => {
        if (!game.isPlayerTurn)
            playOpponentCard();
    })

    const playPlayerCard = (placement: IBoardCell) => {
        const newPlayerHand = cardService.removeCardFromSet(placement.card as ICard, game.playerHand.cards);

        setGame({
            ...game,
            playerHand: {cards: newPlayerHand, activeIndex: 0},
            board: boardService.createBoardFromPlacement(game.board, placement),
            isPlayerTurn: false
        })
    }

    const playOpponentCard = () => {
        const bestPlacement: IBoardCell = cardService.determineBestPlacement(game.board, game.opponentHand.cards);
        const newOpponentHand = cardService.removeCardFromSet(bestPlacement.card as ICard, game.opponentHand.cards);

        setGame({
            ...game,
            opponentHand: {cards: newOpponentHand, activeIndex: 0},
            board: boardService.createBoardFromPlacement(game.board, bestPlacement),
            isPlayerTurn: true
        })
    }



    const onBoardCellSelected = (pos: [number, number]) => {
        const [x, y] = pos;
        if (game.isPlayerTurn && !game.board.cells[y][x].card) {
            playPlayerCard({cell: pos, card: {...game.playerHand.cards[game.playerHand.activeIndex], isPlayerCard: true}});
        }
    }

    const onPlayerCardClick = (index: number) => {
        setGame({
            ...game,
            playerHand: {...game.playerHand, activeIndex: index}
        })
    }

    
    return (
        <div className='game-table'>
            <div className='side-panel'>
                <CardHand {...game.opponentHand} />
            </div>
            <div className='table-board'>
                <Board board={game.board} onCellSelected={(pos: [number, number]) => onBoardCellSelected(pos)} />
            </div>
            <div className='side-panel'>
                <PlayerCardHand {...game.playerHand} onCardClick={(index: number) => onPlayerCardClick(index)} />
            </div>
        </div>
    )
}