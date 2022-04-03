import { IBoard } from "../../models/IBoard"
import { Card } from "../card/Card";
import { CardPlaceholder } from "../card/CardPlaceholder";
import './board.css';


export const Board = (props: {board: IBoard}) => {

    return (
        <div className='board'>
            {
                props.board.cells.map((row, yIndex) => {
                    return <div key={yIndex} className='row'>
                        {
                            row.map((cell, xIndex) => {
                                return <div key={`${xIndex} ${yIndex}`} className='cell'>
                                    {cell.card ? <Card card={cell.card} /> : <CardPlaceholder />}
                                </div> 
                            })
                        }
                    </div>                
            })
        }
        </div>
    )
}