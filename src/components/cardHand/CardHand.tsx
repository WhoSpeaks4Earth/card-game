import { ICard } from "../../models/ICard"
import { ActiveStatus } from "../card/ActiveStatus"
import { Card } from "../card/Card"


export const CardHand = (props: {cards: ICard[], activeIndex: number}) => {

    return (
        <>
            {
                props.cards.map((card: ICard, index: number) => {
                    return (
                        <ActiveStatus key={index} active={props.activeIndex === index}>
                            <Card card={card} />
                        </ActiveStatus>
                    )
                })
            }
        </>
    )
}