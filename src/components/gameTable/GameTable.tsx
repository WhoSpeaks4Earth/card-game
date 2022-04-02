import { useEffect, useState } from 'react';
import { ICard } from '../../models/ICard'
import { CardService } from '../../services/card.service';
import { Card } from '../card/Card';
import { PlayableCard } from '../card/PlayableCard';
import './gameTable.css';

interface IGame {
    playerHand: ICard[],
    opponentHand: ICard[],
    selectedCard: ICard | null
}


export const GameTable = () => {

    const cardService = new CardService();

    const [game, setGame] = useState<IGame>({
        playerHand: [],
        opponentHand: [],
        selectedCard: null
    });

    useEffect(() => {
        const playerCards = cardService.getCards()
        setGame({
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

    return (
        <div className='game-table'>
            <div className='side-panel'>
                {
                    game.opponentHand.map((c: ICard) => {
                        return <Card key={c.title} card={c} />
                    })
                }
            </div>
            <div className='center-grid'>
                <div></div>
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