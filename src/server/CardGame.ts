import { Client, Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { Message } from "../types/messages";
import CardGameState from "./CardGameState";
import PlayerSelectionCommand from "./commands/PlayerSelectionCommand";
import { GameState } from "../types/ICardGameState";

export default class CardGame extends Room {
    private dispatcher = new Dispatcher(this)

    // When room is initialized
    onCreate()
    {
        this.maxClients = 2;
        this.setState(new CardGameState())

        // split into diff commands for shared logic
        this.onMessage(Message.PlayerSelection, (client, message: {}) => {
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                
            })
        })
    }

    onJoin(client: Client)
    {
        
    }

}