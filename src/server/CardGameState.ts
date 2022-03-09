import {
    Schema,
    ArraySchema,
    SetSchema,
    type
} from '@colyseus/schema'
import { Scene } from 'phaser'
import { GameState, ICard, ICardGameState, IPlayerState } from '../types/ICardGameState'

class Card extends Schema implements ICard
{
    @type('string')
    pattern: string

    @type('number')
    points: number
}

class Player extends Schema implements IPlayerState
{
    @type('string')
    id: string

    @type({set: Card})
    hand: SetSchema<Card>

    @type(['string'])
    sets: ArraySchema<string>

    @type('number')
    score: number
}

export default class CardGameState extends Schema implements ICardGameState
{
    @type([Card])
    deck: ArraySchema<Card>

    @type(['string'])
    players: ArraySchema<string>

    @type(['string'])
    common: ArraySchema<string>

    @type('number')
    gameState = GameState.WaitingForPlayers
    
    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor()
    {
        super()

        this.common = new ArraySchema('0','0','0','0','0','0')
        this.deck = new ArraySchema<Card>()
        this.players = new ArraySchema<string>()
    }

    private createDeck()
    {
        // TODO: created the starter deck first
    }

    private shuffleDeck()
    {
        // TODO: shuffle the starter deck first
    }
}