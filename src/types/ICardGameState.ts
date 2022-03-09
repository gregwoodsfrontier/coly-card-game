import { Schema, ArraySchema, SetSchema, CollectionSchema } from '@colyseus/schema'

export type CardPattern = 'heart' | "dia" | "spade" | "club"

export type CardSet = ICard[]

export enum GameState
{
	WaitingForPlayers,
	Playing,
	Finished
}

export interface ICard extends Schema
{
	pattern: CardPattern,
	points: number
}

export interface ICardSet extends Schema
{
	group: CollectionSchema
}

export interface IPlayerState extends Schema
{
	id: string

	hand: CollectionSchema

	sets: CollectionSchema

	score: number
}

export interface ICardGameState extends Schema
{	
	gameState: number

	common: CollectionSchema

	deck: CollectionSchema

	activePlayer: number

	winningPlayer: number

	players: ArraySchema
}

export default ICardGameState