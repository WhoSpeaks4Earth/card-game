import { useEffect, useState } from 'react';
import { ICard } from '../../models/ICard'
import { IGame } from '../../models/IGame';
import { CardService } from '../../services/card.service';
import { Card } from '../card/Card';
import { CardPlaceholder } from '../card/CardPlaceholder';
import { PlayableCard } from '../card/PlayableCard';
import './gameTable.css';


export const GameTable = () => {

    const cardService = new CardService();

    const [game, setGame] = useState<IGame>({
        playerHand: [],
        opponentHand: [],
        selectedCard: null,
        boardPlacements: [null, null, null],
        isPlayerTurn: true
    });

    useEffect(() => {
        const playerCards = cardService.getCards()
        setGame({
            ...game,
            playerHand: playerCards,
            opponentHand: cardService.getCards(),
            selectedCard: playerCards[0] ?? null
        });
    }, []);

    useEffect(() => {
        if (!game.isPlayerTurn)
            doOpponentPlay();
    })

    const onCardSelected = (card: ICard) => {
        setGame({...game, selectedCard: card});
    }

    const isCardSelected = (card: ICard) => {
        return game.selectedCard?.title === card.title;
    }

    const placeCard = (cell: number) => {
        if (game.selectedCard && game.boardPlacements[cell] === null) {
            const newPlacements = game.boardPlacements;
            newPlacements[cell] = {cell, card: game.selectedCard, isPlayerCard: true};
            const newPlayerHand = cardService.removeCardFromSet(game.selectedCard, game.playerHand);

            setGame({
                ...game,
                selectedCard: null,
                playerHand: newPlayerHand,
                boardPlacements: newPlacements,
                isPlayerTurn: false
            })
        }
    }

    const doOpponentPlay = () => {
        const bestPlacement = cardService.determineBestPlacement(game.opponentHand);
        const newOpponentHand = cardService.removeCardFromSet(bestPlacement.card, game.opponentHand);
        setGame({
            ...game,
            opponentHand: newOpponentHand,
            boardPlacements: cardService.getNewBoardPlacements(bestPlacement, game.boardPlacements),
            isPlayerTurn: true
        })
    }


    return (
        <div className='game-table'>
            <div className='side-panel'>
                {
                    game.opponentHand.map((card: ICard) => {
                        return <Card key={card.title} card={card} />
                    })
                }
            </div>
            <div className='center-grid'>
                {
                    game.boardPlacements.map((p, i) => {
                        return <div key={i} className='grid-cell' onClick={() => placeCard(i)}>
                            {
                                p ?
                                <div className={p.isPlayerCard ? 'player-ownership' : 'opponent-ownership'}>
                                    <Card card={p.card} />
                                </div>
                                : <CardPlaceholder />}
                        </div>
                    })
                }
            </div>
            <div className='side-panel'>
                {
                    game.playerHand.map((card: ICard) => {
                        return <PlayableCard key={card.title} card={card} isSelected={isCardSelected(card)} onSelected={() => onCardSelected(card)} />
                    })
                }
            </div>
        </div>
    )
}