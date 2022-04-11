# Colyseus Phaser Gather-That-Set Card Game

A clone of the card mini game in the Voice of Cards: The Isle Dragon Roars.
Mainly as a project game to find out how to design a card game using Colyseus and Phaser.
This repo consists of both client and server.

## Tutorial-inspired by

Check out this [Ourcade tutorial series](https://www.youtube.com/embed/videoseries?list=PLumYWZ2t7CRueXsocQXOGqewmwzohljof) about multiplayer games.

## How to Run

Run the site.
```
npm run dev
```

Then run the server.
```
npm run start-server
```
## Setup
- Deck
- Common Place
- Player's Hand (up to 3)
- Players's Set (up to 3)
- Dump

## Starting 
- Each player draws 1 card.
- Determine Player order.

## Each turn
- Each player draw 2 cards. (can draw up to 3 cards ?)
- A set can consist of
	- A pair of numbers
	- Triple numbers
	- 3 cards of consecutive numbers
	- (more fun:  3 cards of consecutive numbers with same pattern. Every 2 earns 1 extra point )
- Each player can only make a Set per turn. 
- If there are cards in Common PLace, the players can choose those cards to make Sets.
- After making 1 Set (or no Set) , the player discard their hand to the Common Place to only 1 left. 
- Each player can hold only up to 3 sets. If exceed, the player must discard their Sets to the Dump.
- Calculate the points on those sets (sum of the numbers) and add to player.
- Pass to Other player.

## Game End
- When the deck runs out of cards when the turn ends.

## Determine Winner
- Whoever has the most points is the winner. 
