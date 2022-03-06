import Phaser from "phaser";
import Server from "../services/Server"
import { IGameOverSceneData, SceneKeys } from "../../types/scenes";

// always running bootsrap
export default class Bootstrap extends Phaser.Scene 
{
    private server!: Server

    constructor()
    {
        super(SceneKeys.BootStrap)
    }

    init()
    {
        // init the server
        this.server = new Server()
    }

    create()
    {
        this.createNewGame()
    }

    private createNewGame()
    {
        this.scene.launch(SceneKeys.Game, {
            server: this.server,
            onGameOver: this.handleGameOver
        })
    }

    private handleGameOver = (data: IGameOverSceneData) => {
		this.server.leave()
		this.scene.stop(SceneKeys.Game)

		this.scene.launch(SceneKeys.GameOver, {
			...data,
			onRestart: this.handleRestart
		})
	}

    private handleRestart = () => {
        this.scene.stop(SceneKeys.GameOver)
        this.createNewGame()
    }
}