import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { Cell, ITicTacToeState } from '../../types/ITicTacToeState'

export default class NextTurnCommand extends Command<ITicTacToeState>
{
    execute()
    {
        const activePlayer = this.room.state.activePlayer

        this.room.state.activePlayer = this.room.state.activePlayer === 0 ? 1 : 0
        
    }
}