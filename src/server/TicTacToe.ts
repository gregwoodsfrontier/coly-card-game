import { Client, Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { Message } from "../types/messages";
import TicTacToeState from "./TicTacToeState";
import PlayerSelectionCommand from "./commands/PlayerSelectionCommand";

export default class TicTacToe extends Room {
    private dispatcher = new Dispatcher(this)

    // When room is initialized
    onCreate()
    {
        this.maxClients = 2;
        this.setState(new TicTacToeState())

        // split into diff commands for shared logic
        this.onMessage(Message.PlayerSelection, (client, message: { index: number }) => {
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client, 
                index: message.index
            })
        })
    }

    onJoin(client: Client)
    {
        const idx = this.clients.findIndex(c => c.sessionId === client.sessionId)
        client.send(Message.PlayerIndex, { playerIndex: idx})
    
    }

}