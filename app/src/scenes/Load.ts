import Phaser from 'phaser'

export default class LoadScene extends Phaser.Scene
{
	constructor()
	{
		super('load')
	}

	preload()
    {
        this.load.atlas('all-cards', '../assets/all-cards.png', '../assets/all-cards.json')
    }

    create()
    {
        this.scene.start("game")
    }
}
