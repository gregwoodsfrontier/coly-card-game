import { Command } from '@colyseus/command'
import { Client } from 'colyseus'
import { Cell, ITicTacToeState } from '../../types/ITicTacToeState'
import NextTurnCommand from './NextTurnCommand'

type Payload = {
    client: Client,
    index: number
}

export default class PlayerSelectionCommand extends Command<ITicTacToeState, Payload>
{
    execute(data: Payload)
    {
        const { client, index } = data
        
        const clientIndex = this.room.clients.findIndex(c => c.id === client.id)

        const cellValue = clientIndex === 0 ? Cell.X : Cell.O

        // coly will get the changes and send that to client
        this.room.state.board[index] = cellValue

        // give to next player
        return [
            new NextTurnCommand()
        ]
    }
}