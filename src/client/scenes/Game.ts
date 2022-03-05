import Phaser from "phaser";
import { IGameOverSceneData, IGameSceneData } from '../../types/scenes'
import { Cell, ITicTacToeState } from "../../types/ITicTacToeState";
import type Server from "../services/Server";

export default class Game extends Phaser.Scene 
{
    private server?: Server
    private onGameOver?: (data: IGameOverSceneData) => void
    private cells: {display: Phaser.GameObjects.Rectangle, value: Cell}[] = []

    constructor()
    {
        super('game')
    }

    async create(data: IGameSceneData)
    {
        const { server, onGameOver } = data

        this.server = server
        this.onGameOver = onGameOver
        
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

            switch (cellState)
			{
				case Cell.X:
				{
					this.add.star(cell.x, cell.y, 4, 4, 60, 0xff0000)
						.setAngle(45)
					break
				}

				case Cell.O:
				{
					this.add.circle(cell.x, cell.y, 50, 0x0000ff)
					break
				}
			}

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
        this.server?.onPlayerChanged(this.handlePlayerTurnChanged, this)
        this.server?.onPlayerWon(this.handlePlayerWon, this)
    }

    private handlePlayerWon(playerIndex: number)
    {
        this.time.delayedCall(1000, () => {
            if (!this.onGameOver)
            {
                return
            }

            this.onGameOver({
                winner: this.server?.playerIndex === playerIndex
            })
        })

    }

    private handleBoardChanged(newValue: Cell, idx: number)
	{
        console.log('handle board change')
		const cell = this.cells[idx]
		if (cell.value !== newValue)
		{
			switch (newValue)
			{
				case Cell.X:
				{
					this.add.star(cell.display.x, cell.display.y, 4, 4, 60, 0xff0000)
						.setAngle(45)
					break
				}

				case Cell.O:
				{
					this.add.circle(cell.display.x, cell.display.y, 50, 0x0000ff)
					break
				}
			}

			cell.value = newValue
		}
	}

    private handlePlayerTurnChanged(playerIndex: number)
    {
        console.log('player turn changed ', playerIndex)
    }
}