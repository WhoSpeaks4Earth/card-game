import { ICard } from '../../models/ICard';
import { CardRanks } from './CardRanks';
import './card.css';


export const Card = (props: {card: ICard, customStyle: any, customCss?: string}) => {

    return (
        <div
            className={`card  ${(props.customCss && props.card) ? props.customCss : ''}`}
            style={props.customStyle ? props.customStyle : null}>
                {
                    props.card ?
                    <div className={'card-content ' + (props.card.isPlayerCard ? 'player-ownership' : 'opponent-ownership')}>
                        <div className='card-header'>
                            <CardRanks ranks={props.card.ranks} />
                        </div>
                        
                        <div className='card-footer'>
                            <div className='card-title'>{props.card.title}</div>
                        </div>
                    </div> : null
                }
            
        </div>
    )
}