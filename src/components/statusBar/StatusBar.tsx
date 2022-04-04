import { winner } from "../../models/IGame"
import './statusBar.css';

export const StatusBar = (props: {winner: winner, onPlayAgain: any}) => {

    return (
        <div className='status-bar'>
            { props.winner ?
                    (
                        <>
                            <div>{`Winner: ${props.winner}`}</div>
                            <button onClick={props.onPlayAgain}>Play Again?</button>
                        </>
                    )
                : <div>playing...</div>}
        </div>
    )
}