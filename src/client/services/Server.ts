import { Client, Room } from "colyseus.js";
import { Schema } from "@colyseus/schema"
import Phaser from "phaser";
import { ITicTacToeState } from "../../types/ITicTacToeState";
import { Message } from "../../types/messages";

export default class Server
{
    private client: Client
    private events: Phaser.Events.EventEmitter
    private room?: Room<ITicTacToeState & Schema>

    constructor()
    {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
    }

    async join()
    {
        this.room = await this.client.joinOrCreate<ITicTacToeState & Schema>('tic-tac-toe')
                
        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })

        // checks for state changes and emit events
        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                const { field, value } = change

                switch(field)
                {
                    case 'board':
                        this.events.emit('board-changed', value)
                        break
                }
            })
        }

        
    }

    onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any)
	{
		this.events.once('once-state-changed', cb, context)
	}

    makeSelection(idx: number)
    {
        if(!this.room)
        {
            throw new Error('the room does not exist')
        }

        this.room.send(Message.PlayerSelection, { index: idx })
    }

    // listen for board change or game state change
    onBoardChanged(cb: (board: number[]) => void, context?: any)
    {
        this.events.on('board-changed', cb, context)
    }
}