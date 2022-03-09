import { Schema, ArraySchema } from '@colyseus/schema'

export const CardPattern = ['heart', "dia", "spade", "club"]

export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface ICard extends Schema
{
	pattern: string,
	points: number
}

export interface ICardSet extends Schema
{
	group: ArraySchema
}

export interface IPlayerState extends Schema
{
	id: string

	hand: ArraySchema

	sets: ArraySchema

	score: number
}

export interface ICardGameState extends Schema
{	
	gameState: number

	common: ArraySchema

	deck: ArraySchema

	players: ArraySchema

	activePlayer: number

	winningPlayer: number
}

export default ICardGameState