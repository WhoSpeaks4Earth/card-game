import { SyntheticEvent } from "react";
import { ICard } from "../../models/ICard"
import { Card } from "../card/Card"
import './cardHand.css';


export const CardHand = (props: {cards: ICard[], activeIndex: number, onCardClick?: any, isTurn: boolean}) => {

    const isPlayerHand: boolean = props.cards[0]?.isPlayerCard;

    const getCardStyle = (index: number): any => {
        return {
            position: 'relative',
            top: (-80 * index) + 'px',
            zIndex: index
        };
    }

    const getCardCss = (index: number) => {
        let css = '';
        if (isSelectable())
            css = 'selectable ';
        if (isActive(index))
            css += 'active ';
        return css;
    }

    const onCardClick = (index: number) => {
        if (isClickable(index))
            props.onCardClick(index);
    }

    const isSelectable = () => {
        return props.isTurn && isPlayerHand && props.onCardClick !== undefined;
    }

    const isActive = (index: number): boolean => {
        return props.isTurn && (props.activeIndex === index);
    }

    const isClickable = (index: number) => {
        return props.onCardClick !== undefined && props.activeIndex !== index;
    }

    return (
        <div className='card-hand'>
            {
                props.cards.map((card: ICard, index: number) => {
                    return (
                        <div key={`${card?.title}${index}`} onClick={() => onCardClick(index)}>
                            <Card card={card} customStyle={getCardStyle(index)} customCss={getCardCss(index)} />
                        </div>
                        )
                })
            }
        </div>
    )
}