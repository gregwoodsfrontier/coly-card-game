import Phaser from "phaser";
import { IGameOverSceneData, SceneKeys } from "../../types/scenes";

export default class GameOver extends Phaser.Scene 
{
    constructor()
    {
        super(SceneKeys.GameOver)
    }

    create(data: IGameOverSceneData)
    {
        const { width, height } = this.scale
        const text =  data.winner ? 'You Won!' : 'You lost!'

        this.add.text( width * 0.5, height * 0.5, text)
        .setOrigin(0.5, 0.5)
    }
}