import { ICard } from "../../models/ICard"
import { Card } from "../card/Card"
import { CardSelector } from "./CardSelector"


export const CardHand = (props: {cards: ICard[]}) => {

    return (
        <>
            {
                props.cards.map((card: ICard) => {
                    return <Card key={card.title} card={card} />
                })
            }
        </>
    )
}