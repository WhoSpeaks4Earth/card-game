import { ICard } from '../../models/ICard'
import { Card } from '../card/Card'
import './gameTable.css';


const sampleCards: ICard[] = [
    {
        title: 'Apple',
        ranks: [6, 9, 8, 10]
    },
    {
        title: 'Microsoft',
        ranks: [7, 6, 10, 3]
    },
    {
        title: 'Tesla',
        ranks: [10, 7, 10, 9]
    },
]

export const GameTable = () => {

    return (
        <div className='game-table'>
            <div className='side-panel'>opponent cards</div>
            <div className='center-grid'>table</div>
            <div className='side-panel'>
                <Card card={sampleCards[0]} />
                <Card card={sampleCards[1]} />
                <Card card={sampleCards[2]} />
            </div>
        </div>
    )
}