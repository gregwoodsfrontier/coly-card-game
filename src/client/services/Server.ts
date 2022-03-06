import { Client, Room } from "colyseus.js";
import Phaser from "phaser";
import { EventKeys } from "../../types/events";
import { Cell, GameState, ITicTacToeState } from "../../types/ITicTacToeState";
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

    get gameState()
    {
        if(!this.room)
        {
            return GameState.WaitingForPlayers
        }

        return this.room?.state.gameState
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
            this.events.emit(EventKeys.OnceStateChanged, state)
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
                        this.events.emit(EventKeys.PlayerTurnChanged, value);
                        break;
                    
                    case 'winningPlayer':
                        this.events.emit(EventKeys.PlayerWin, value);
                        break;

                    case 'gameState':
                        this.events.emit(EventKeys.GameStateChanged, value);
                        break;
                    
                }
            })
        }

        this.room.state.board.onChange = (item, idx) => {
			this.events.emit(EventKeys.BoardChanged, item, idx)
		}
    }

    onceStateChanged(cb: (state: ITicTacToeState) => void, context?: any)
	{
		this.events.once(EventKeys.OnceStateChanged, cb, context)
	}

    makeSelection(idx: number)
    {
        if(!this.room)
        {
            throw new Error('This room does not exist')
        }

        if(this.room.state.gameState !== GameState.Playing)
        {
            console.warn('This room is not ready yet ...')
            return
        }

        if(this._playerIndex !== this.room.state.activePlayer)
        {
            console.warn('Not Your Turn. Please wait...')
            return
        }

        // check if the cell is selected
        if(this.room.state.board[idx] !== Cell.Empty)
        {
            console.warn('This cell is chosen. Choose another...')
            return
        }

        this.room.send(Message.PlayerSelection, { index: idx })
    }

    // listen for board change or game state change
    onBoardChanged(cb: (cell: number, index: number) => void, context?: any)
	{
		this.events.on(EventKeys.BoardChanged, cb, context)
	}

    onPlayerChanged(cb: (playerNumber: number) => void, context?: any)
    {
        this.events.on(EventKeys.PlayerTurnChanged, cb, context)
    }

    onPlayerWon(cb: (playerIndex: number) => void, context?: any)
	{
		this.events.on(EventKeys.PlayerWin, cb, context)
	}

    onGameStateChange(cb: (state: GameState) => void, context?: any)
	{
		this.events.on(EventKeys.GameStateChanged, cb, context)
	}

    leave()
	{
		this.room?.leave()
		this.events.removeAllListeners()
	}
}