import { SyntheticEvent } from "react";
import { ICard } from "../../models/ICard"
import { Card } from "../card/Card"
import './cardHand.css';


export const CardHand = (props: {cards: ICard[], activeIndex: number, onCardClick?: any, isTurn: boolean}) => {

    const isPlayerHand: boolean = props.cards[0]?.isPlayerCard;

    const getCardStyle = (index: number): any => {
        const stackStyle: any = getStackStyle(index);
        let style = stackStyle;

        if (props.isTurn && props.activeIndex === index)
            style = {...style, ...getActiveStyle()};

        return style;
    }

    const getStackStyle = (index: number) => {
        return {
            position: 'relative',
            top: (-80 * index) + 'px',
            zIndex: index
        };
    }

    const getActiveStyle = () => {
        const style = {
            left: isPlayerHand ? '-20px' : '20px',
            boxShadow: '6px 6px gray'
        };
        return style;
    }

    const onCardClick = (index: number) => {
        if (props.onCardClick !== undefined && props.activeIndex !== index) {
            props.onCardClick(index);
        }
    }

    return (
        <div className='card-hand'>
            {
                props.cards.map((card: ICard, index: number) => {
                    return (
                        <div key={`${card.title}${index}`} onClick={() => onCardClick(index)}>
                            <Card card={card} customStyle={getCardStyle(index)} />
                        </div>
                    )
                })
            }
        </div>
    )
}