import { Client, Room } from "colyseus.js";
import { Schema } from "@colyseus/schema"
import Phaser from "phaser";
import { ITicTacToeState } from "../../types/ITicTacToeState";
import { Message } from "../../types/messages";

export default class Server
{
    private client: Client
    private events: Phaser.Events.EventEmitter
    private room?: Room<ITicTacToeState>
    private _playerIndex = -1

    get playerIndex()
    {
        return this._playerIndex
    }

    constructor()
    {
        this.client = new Client('ws://localhost:2567')
        this.events = new Phaser.Events.EventEmitter()
    }

    async join()
    {
        this.room = await this.client.joinOrCreate<ITicTacToeState>('tic-tac-toe')
        
        this.room.onMessage(Message.PlayerIndex, (message: { playerIndex: number}) => {
            this._playerIndex = message.playerIndex
        })

        this.room.onStateChange.once(state => {
            this.events.emit('once-state-changed', state)
        })

        // checks for state changes and emit events
        this.room.state.onChange = (changes) => {
            changes.forEach(change => {
                // console.dir(change)
                const { field, value } = change
                
                switch (field) {
                    /* case 'board' :
                        this.events.emit('board-changed', value);
                        break; */
                    
                    case 'activePlayer':
                        this.events.emit('player-turn-changed', value);
                        break;
                    
                    case 'winningPlayer':
                        this.events.emit('player-win', value);
                        break;
                }
            })
        }

        this.room.state.board.onChange = (item, idx) => {
            console.log({item});
            console.log({idx})
			this.events.emit('board-changed', item, idx)
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

        if(this._playerIndex !== this.room.state.activePlayer)
        {
            console.warn('Not Your Turn. Please wait...')
            return
        }

        this.room.send(Message.PlayerSelection, { index: idx })
    }

    // listen for board change or game state change
    onBoardChanged(cb: (cell: number, index: number) => void, context?: any)
	{
		this.events.on('board-changed', cb, context)
	}

    onPlayerChanged(cb: (playerNumber: number) => void, context?: any)
    {
        this.events.on('player-turn-changed', cb, context)
    }

    onPlayerWon(cb: (playerIndex: number) => void, context?: any)
	{
		this.events.on('player-win', cb, context)
	}

    leave()
	{
		this.room?.leave()
		this.events.removeAllListeners()
	}
}