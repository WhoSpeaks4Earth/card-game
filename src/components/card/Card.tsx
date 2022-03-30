import { ICard } from "../../models/ICard";
import { CardRanks } from "./CardRanks";



export const Card = (props: {card: ICard}) => (
    <div>
        <CardRanks ranks={props.card.ranks} />
        <h6>{props.card.title}</h6>
    </div>
)