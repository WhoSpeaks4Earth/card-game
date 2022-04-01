import { rank, ranks } from '../../models/ICard';
import './card.css';


export const CardRanks = (props: {ranks: ranks}) => {
    
    const getRankDisplay = (rank: rank) => {
        return rank === 10 ? 'A' : rank;
    }

    return (
        <div className={`ranks`}>
            {
                props.ranks.map((r, i) => <div key={r.toString() + i}>{getRankDisplay(r)}</div>)
            }
        </div>
    )
}