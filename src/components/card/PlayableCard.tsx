import { ICard } from "../../models/ICard"
import { Card } from "./Card"


export const PlayableCard = (props: {card: ICard, isSelected: boolean, onSelected: any}) => {

    return (
        <div className={'playable ' + (props.isSelected ? 'selected' : '')} onClick={() => props.onSelected()}>
            <Card card={props.card} />
        </div>
    )
}