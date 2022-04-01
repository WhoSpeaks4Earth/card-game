import { rank, ranks } from '../../models/ICard';
import './card.css';


export const CardRanks = (props: {ranks: ranks}) => {
    
    const getRankDisplay = (rank: rank) => {
        return rank === 10 ? 'A' : rank;
    }

    return (
        <div className={`ranks`}>
            <div>{getRankDisplay(props.ranks[0])}</div>
            <div>
                <div>{getRankDisplay(props.ranks[3])}</div>
                <div>{getRankDisplay(props.ranks[1])}</div>
            </div>
            <div>{getRankDisplay(props.ranks[2])}</div>
        </div>
    )
}