import type Server from '../client/services/Server'

export interface IGameOverSceneData
{
	winner: boolean
	onRestart?: () => void
}

export interface IGameSceneData
{
	server: Server
	onGameOver: (data: IGameOverSceneData) => void
}

export enum SceneKeys
{
	Game = "game",
	GameOver = "gameover",
	BootStrap = "bootstrap"
}