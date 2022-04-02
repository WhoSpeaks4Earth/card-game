import { useEffect, useState } from 'react';
import { ICard } from '../../models/ICard'
import { CardService } from '../../services/card.service';
import { Card } from '../card/Card';
import { CardPlaceholder } from '../card/CardPlaceholder';
import { PlayableCard } from '../card/PlayableCard';
import './gameTable.css';

interface IBoardPlacement {
    cell: number,
    card: ICard
}

interface IGame {
    playerHand: ICard[],
    opponentHand: ICard[],
    selectedCard: ICard | null,
    boardPlacements: (IBoardPlacement | null)[]
}


export const GameTable = () => {

    const cardService = new CardService();

    const [game, setGame] = useState<IGame>({
        playerHand: [],
        opponentHand: [],
        selectedCard: null,
        boardPlacements: [null, null, null]
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

    const onCardSelected = (card: ICard) => {
        setGame({...game, selectedCard: card});
    }

    const isCardSelected = (card: ICard) => {
        return game.selectedCard?.title === card.title;
    }

    const placeCard = (cell: number) => {
        console.log(`placing in ${cell.toString()}`)
        if (game.selectedCard) {
            const newPlacements = game.boardPlacements;
            newPlacements[cell] = {cell, card: game.selectedCard};

            setGame({
                ...game,
                selectedCard: null,
                playerHand: game.playerHand.filter(c => c.title !== game.selectedCard?.title),
                boardPlacements: newPlacements
            })
        }
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
                            {p ? <Card card={p.card} /> : <CardPlaceholder />}
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