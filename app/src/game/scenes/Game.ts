import Phaser from "phaser";
import { IGameOverSceneData, IGameSceneData, SceneKeys } from '../../types/scenes'
// import { Cell, GameState, ITicTacToeState } from "../../types/ICardSetState";
import type Server from "../services/Server";

export default class Game extends Phaser.Scene 
{
    private server?: Server
    private onGameOver?: (data: IGameOverSceneData) => void
    private cells: {display: Phaser.GameObjects.Rectangle, value: Cell}[] = []
    private gameStateText?: Phaser.GameObjects.Text

    constructor()
    {
        super(SceneKeys.Game)
    }

    async create()
    {
        this.createLayout()
    }

    /**
     * Make the basic layout of the card game first.
     */
    private createLayout()
    {
        // TODO: create the basic layout of the game first
    }

/*     private handleGameStateChange(state: GameState)
    {
        if(state === GameState.Playing && this.gameStateText)
        {
            this.gameStateText.destroy()
            this.gameStateText = undefined
        }
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
    } */
}