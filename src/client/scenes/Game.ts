import Phaser from "phaser";
import { ITicTacToeState } from "../../types/ITicTacToeState";
import type Server from "../services/Server";

export default class Game extends Phaser.Scene 
{
    private server?: Server

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
                this.server?.makeSelection(idx)
            })

            x += rWidth + gap

            if((idx + 1) % 3 === 0)
            {
                y += rHeight + gap
                x = width * 0.5 - rWidth
            }
        })
    }
}