import { useEffect, useState } from "react";
import { IBoardCell } from "../../models/IBoard";
import { ICard } from "../../models/ICard";
import { IGame, winner } from "../../models/IGame";
import { BoardService } from "../../services/board.service";
import { CardService } from "../../services/card.service";
import { DealerService } from "../../services/dealer.service";
import { Board } from "../board/Board";
import { CardHand } from "../cardHand/CardHand";
import { StatusBar } from "../statusBar/StatusBar";
import './gameTable.css';



const boardService = new BoardService();
const dealerService = new DealerService();
const cardService = new CardService();

export const GameTable = () => {

    const getInitialState = () => {
        const board = boardService.createBoard(2, 2);
        const cardsPerHand = boardService.getCardsPerHand(board);

        return {
            playerHand: {cards: dealerService.getPlayerCards(cardsPerHand), activeIndex: 0},
            opponentHand: {cards: dealerService.getOpponentCards(cardsPerHand), activeIndex: 0},
            board,
            isPlayerTurn: true, //(Math.floor(Math.random() * 100) % 2 === 0),
            winner: null
        }
    }

    const [game, setGame] = useState<IGame>(() => {
        console.log('setting initial state')
        return getInitialState();
    });

    useEffect(() => {
        const isBoardFull = boardService.isBoardFull(game.board);
        console.log('every effect');

        if (isBoardFull && !game.winner) {
            let winner: winner = dealerService.determineWinner(game.board);
            setGame({
                ...game,
                winner
            })
        }
        else 
        if (!game.isPlayerTurn && !game.winner) {
            console.log('playing opponent. it is player turn? ' + game.isPlayerTurn)
            playOpponentCard();
        }
    })


    const playNewGame = () => {
        setGame(getInitialState());
    }

    const playPlayerCard = (placement: IBoardCell) => {
        const newPlayerHand = cardService.removeCardFromSet(placement.card as ICard, game.playerHand.cards);
        
        setGame({
            ...game,
            playerHand: {cards: newPlayerHand, activeIndex: 0}, // TODO: set to first non-empty index, if none - return 0
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


    const onBoardCellSelected = (pos: [number, number]) => {
        const [x, y] = pos;
        if (game.isPlayerTurn && !game.board.cells[y][x].card && game.playerHand.cards[game.playerHand.activeIndex]) {
            playPlayerCard({cell: pos, card: {...game.playerHand.cards[game.playerHand.activeIndex], isPlayerCard: true} as ICard});
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
                <CardHand {...game.opponentHand} isTurn={!game.isPlayerTurn} />
            </div>
            <div className='table-board'>
                <Board board={game.board} onCellSelected={(pos: [number, number]) => onBoardCellSelected(pos)} />
                <StatusBar winner={game.winner} onPlayAgain={playNewGame} />
            </div>
            <div className='side-panel'>
                <CardHand {...game.playerHand} isTurn={game.isPlayerTurn} onCardClick={onPlayerCardClick} />
            </div>
        </div>
    )
}