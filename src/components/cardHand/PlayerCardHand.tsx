import { ICard } from "../../models/ICard"
import { ActiveStatus } from "../card/ActiveStatus"
import { Card } from "../card/Card"


export const PlayerCardHand = (props: {cards: ICard[], activeIndex: number, onCardClick: any}) => {

    return (
        <>
            {
                props.cards.map((card: ICard, index: number) => {
                    return (
                        <ActiveStatus key={index} active={props.activeIndex === index}>
                            <div onClick={() => props.onCardClick(index)}>
                                <Card card={card} />
                            </div>
                        </ActiveStatus>
                    )
                })
            }
        </>
    )
}