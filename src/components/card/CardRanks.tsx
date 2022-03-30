import { rank, ranks } from "../../models/ICard";

export const CardRanks = (props: {ranks: ranks}) => {
    
    const getRankDisplay = (rank: rank) => {
        return rank === 10 ? 'A' : rank;
    }

    return (
        <div>
            {
                props.ranks.map((r, i) => <div key={r.toString() + i}>{getRankDisplay(r)}</div>)
            }
        </div>
    )
}