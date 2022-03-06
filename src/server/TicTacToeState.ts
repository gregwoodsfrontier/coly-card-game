import {
    Schema,
    ArraySchema,
    type
} from '@colyseus/schema'
import { GameState, ITicTacToeState } from '../types/ITicTacToeState'

export default class TicTacToeState extends Schema implements ITicTacToeState
{
    @type(['number'])
    board: ArraySchema<number>

    @type('number')
    gameState = GameState.WaitingForPlayers
    
    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor()
    {
        super()

        this.board = new ArraySchema(
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        )
    }
}