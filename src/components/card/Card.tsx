import { ICard } from '../../models/ICard';
import { CardRanks } from './CardRanks';
import './card.css';


export const Card = (props: {card: ICard}) => {


    const getCustomStyles = () => {
        const styles: string[] = [];
        if (props.card.isPlayerCard)
            styles.push('player-ownership')
        if (props.card.isSelected)
            styles.push('selected');

        return styles.join(' ');
    }

    return (
        <div className={`card ` + getCustomStyles()}>
            <div className='card-header'>
                <CardRanks ranks={props.card.ranks} />
            </div>
            
            <div className='card-footer'>
                <div className='card-title'>{props.card.title}</div>
            </div>
        </div>
    )
}