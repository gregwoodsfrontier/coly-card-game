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
        console.log(state)
    }
}