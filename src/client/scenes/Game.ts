import Phaser from "phaser";
import { Cell, ITicTacToeState } from "../../types/ITicTacToeState";
import type Server from "../services/Server";

export default class Game extends Phaser.Scene 
{
    private server?: Server
    private cells: {display: Phaser.GameObjects.Rectangle, value: Cell}[] = []

    constructor()
    {
        super('game')
    }

    async create(data: { server: Server })
    {
        const { server } = data

        this.server = server
        
        if (!this.server)
		{
			throw new Error('server instance missing')
		}

		await this.server.join()

		this.server.onceStateChanged(this.createBoard, this)
    }

    private createBoard(state: ITicTacToeState)
    {
        const { width, height } = this.scale
        const rWidth = 128
        const rHeight = 128
        const gap = 15
        let x = width * 0.5 - rWidth
        let y = height * 0.5 - rHeight
        
        state.board.forEach((cellState, idx) => {
            const cell = this.add.rectangle(x, y, rWidth, rHeight, 0xffffff)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                // here the player selects a cell and sends to server
                // server sends the message to room
                this.server?.makeSelection(idx)
            })

            this.cells.push({
                display: cell,
                value: cellState
            });

            x += rWidth + gap

            if((idx + 1) % 3 === 0)
            {
                y += rHeight + gap
                x = width * 0.5 - rWidth
            }
        })

        this.server?.onBoardChanged(this.handleBoardChanged, this)
    }

    private handleBoardChanged(board: Cell[])
    {
        console.log('function called')
        for (let i = 0; i < board.length; ++i)
        {
            const cell = this.cells[i]

            // check if there is any difference with data and render
            if(cell.value !== board[i])
            {
                this.add.star(cell.display.x, cell.display.y, 4, 4, 64, 0xff0000)
                .setAngle(45)
            }
        }
    }
}