import { useEffect, useState } from "react";
import { IBoard, IBoardCell } from "../../models/IBoard";
import { ICard } from "../../models/ICard";
import { IGame, winner } from "../../models/IGame";
import { BoardService } from "../../services/board.service";
import { CardService } from "../../services/card.service";
import { DealerService } from "../../services/dealer.service";
import { Board } from "../board/Board";
import { CardHand } from "../cardHand/CardHand";
import { PlayerCardHand } from "../cardHand/PlayerCardHand";
import './gameTable.css';



const boardService = new BoardService();
const dealerService = new DealerService();
const cardService = new CardService();

export const GameTable = () => {

    const getInitialState = () => {
        const board: IBoard = boardService.createBoard(2, 2);
        const cardsPerHand = boardService.getCardsPerHand(board);
        return {
            playerHand: {cards: dealerService.getPlayerCards(cardsPerHand), activeIndex: 0},
            opponentHand: {cards: dealerService.getOpponentCards(cardsPerHand), activeIndex: 0},
            board,
            isPlayerTurn: (Math.floor(Math.random() * 100) % 2 === 0),
            winner: null
        }
    }

    const [game, setGame] = useState<IGame>(getInitialState());

    useEffect(() => {
        const isBoardFull = boardService.isBoardFull(game.board);

        if (isBoardFull && !game.winner)
            determineWinner();
        else if (!game.isPlayerTurn && !game.winner)
            playOpponentCard();
    })

    

    const playNewGame = () => {
        setGame(getInitialState());
    }


    const playPlayerCard = (placement: IBoardCell) => {
        const newPlayerHand = cardService.removeCardFromSet(placement.card as ICard, game.playerHand.cards);

        setGame({
            ...game,
            playerHand: {cards: newPlayerHand, activeIndex: 0},
            board: boardService.getNewBoardFromPlacement(placement, game.board),
            isPlayerTurn: false
        })
    }

    const playOpponentCard = () => {
        const bestPlacement: IBoardCell = cardService.determineBestPlacement(game.board, game.opponentHand.cards);
        const newOpponentHand = cardService.removeCardFromSet(bestPlacement.card as ICard, game.opponentHand.cards);

        setGame({
            ...game,
            opponentHand: {cards: newOpponentHand, activeIndex: 0},
            board: boardService.getNewBoardFromPlacement(bestPlacement, game.board),
            isPlayerTurn: true
        })
    }

    const determineWinner = () => {
        let winner: winner = dealerService.determineWinner(game.board);
        setGame({
            ...game,
            winner
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
                { game.winner ?
                    (
                        <>
                            <div>{`Winner: ${game.winner}`}</div>
                            <button onClick={playNewGame}>Play Again?</button>
                        </>
                    )
                : null }
            </div>
            <div className='side-panel'>
                <PlayerCardHand {...game.playerHand} onCardClick={(index: number) => onPlayerCardClick(index)} />
            </div>
        </div>
    )
}