import { ICard } from "../../models/ICard"
import { Card } from "../card/Card"


export const CardHand = (props: {cards: ICard[], activeIndex: number}) => {

    return (
        <>
            {
                props.cards.map((card: ICard, index: number) => {
                    return (
                        <div key={card.title} className={props.activeIndex === index ? 'active' : ''}>
                            <Card card={card} />
                        </div>
                    )
                })
            }
        </>
    )
}