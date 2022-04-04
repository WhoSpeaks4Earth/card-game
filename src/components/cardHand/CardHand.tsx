import { SyntheticEvent } from "react";
import { ICard } from "../../models/ICard"
import { Card } from "../card/Card"
import './cardHand.css';


export const CardHand = (props: {cards: (ICard | null)[], activeIndex: number, onCardClick?: any, isTurn: boolean}) => {

    const isPlayerHand: boolean = true; //props.cards[0]?.isPlayerCard;

    const getCardStyle = (index: number): any => {
        const stackStyle: any = getStackStyle(index);
        let style = stackStyle;

        if (props.isTurn && props.activeIndex === index && props.cards[index])
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

    const getCardCss = (index: number) => {
        const card = props.cards[index];
        let css = '';
        if (props.isTurn && isPlayerHand && props.onCardClick !== undefined && card)
            css = 'selectable ';
        if (!card)
            css += 'ghost'
        return css;
    }

    const onCardClick = (index: number) => {
        if (props.onCardClick !== undefined && props.activeIndex !== index && props.cards[index]) {
            props.onCardClick(index);
        }
    }

    return (
        <div className='card-hand'>
            {
                props.cards.map((card: (ICard | null), index: number) => {
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