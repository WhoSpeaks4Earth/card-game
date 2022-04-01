import { ICard } from '../../models/ICard';
import { CardRanks } from './CardRanks';
import './card.css';


export const Card = (props: {card: ICard}) => (
    <div className='card'>
        <div className='card-header'>
            <CardRanks ranks={props.card.ranks} />
        </div>
        
        <div className='card-footer'>
            <div className='card-title'>{props.card.title}</div>
        </div>
    </div>
)