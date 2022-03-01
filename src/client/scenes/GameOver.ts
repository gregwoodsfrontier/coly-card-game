import Phaser from "phaser";

export default class GameOver extends Phaser.Scene 
{
    constructor()
    {
        super('gameover')
    }

    create()
    {
        console.log('game over scene')
    }
}