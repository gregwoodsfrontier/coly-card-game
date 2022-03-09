import {
    Schema,
    ArraySchema,
    type
} from '@colyseus/schema'
import { 
    GameState, 
    ICard, 
    ICardSet, 
    ICardGameState, 
    IPlayerState, 
    CardPattern
} from '../types/ICardGameState'

class Card extends Schema implements ICard
{
    @type('string') 
    pattern: string

    @type('number')
    points: number

    @type('number')
    random = 0

    constructor(_pattern: string, _points: number)
    {
        super()
        this.pattern = _pattern
        this.points = _points
    }
}

class CardSet extends Schema implements ICardSet
{
    @type([Card])
    group: ArraySchema<Card>

    constructor()
    {
        super()
        this.group = new ArraySchema<Card>()
    }
}

class Player extends Schema implements IPlayerState
{
    @type('string')
    id: string

    @type([Card])
    hand: ArraySchema<Card>

    @type([Card])
    sets: ArraySchema<CardSet>

    @type('number')
    score = 0
}

export default class CardGameState extends Schema implements ICardGameState
{
    @type('number')
    gameState = GameState.WaitingForPlayers

    @type(['string'])
    common: ArraySchema<string>

    @type([Card])
    deck: ArraySchema<Card>

    @type([Player])
    players: ArraySchema<Player>

    @type('number')
    activePlayer = 0

    @type('number')
    winningPlayer = -1

    constructor()
    {
        super()

        this.common = new ArraySchema('0','0','0','0','0','0')
        this.deck = new ArraySchema<Card>()
        this.players = new ArraySchema<Player>()

        this.createDeck()
        this.shuffleDeck()
    }

    private createDeck()
    {
        // TODO: created the starter deck first
        for(let pat of CardPattern)
        {
            for(let p = 1; p < 9; p++)
            {
                this.deck.push(new Card(pat, p))
            }
        }
    }

    private shuffleDeck()
    {
        // TODO: shuffle the starter deck first
        this.deck.forEach(card => card.random = Math.random())
        this.deck.sort((a: Card, b: Card) => a.random - b.random)
    }
}