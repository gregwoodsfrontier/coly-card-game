import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import LoadScene from './scenes/Load'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerHeight * 1.33,
        height: window.innerHeight
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [HelloWorldScene, LoadScene]
}

export default new Phaser.Game(config)
