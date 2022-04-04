import { ICard } from '../../models/ICard';
import { CardRanks } from './CardRanks';
import './card.css';


export const Card = (props: {card: ICard, customStyle: any}) => {

    return (
        <div
            className={
                    'card-structure card ' + (props.card.isPlayerCard 
                    ? 'player-ownership' 
                    : 'opponent-ownership')
                    }
            style={props.customStyle ? props.customStyle : null}
            >
            <div className='card-header'>
                <CardRanks ranks={props.card.ranks} />
            </div>
            
            <div className='card-footer'>
                <div className='card-title'>{props.card.title}</div>
            </div>
        </div>
    )
}