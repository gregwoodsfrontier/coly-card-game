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
        const restartString = 'Press SPACE to play again'
        const fontConfig = {
            fontSize: '48px'
        }

        const title = this.add.text( width * 0.5, height * 0.5, text, fontConfig)
        .setOrigin(0.5, 0.5)

        this.add.text( title.x, title.y + height * 0.05, restartString, {
            fontSize: '12px'
        })
        .setOrigin(0.5, 0.5)

        this.input.keyboard.once('keyup-SPACE', () => {
            if(data.onRestart)
            {
                data.onRestart();
            }
        })
    }
}