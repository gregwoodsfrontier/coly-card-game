import { Room } from "colyseus";
import { Dispatcher } from "@colyseus/command";
import { Message } from "../types/messages";
import TicTacToeState from "./TicTacToeState";
import PlayerSelectionCommand from "./commands/PlayerSelectionCommand";

export default class TicTacToe extends Room {
    private dispatcher = new Dispatcher(this)

    // When room is initialized
    onCreate()
    {
        console.log('room created')
        this.setState(new TicTacToeState())

        // split into diff commands for shared logic
        this.onMessage(Message.PlayerSelection, (client, message: { index: number }) => {
            this.dispatcher.dispatch(new PlayerSelectionCommand(), {
                client, 
                index: message.index
            })
        })
    }

    /* // Authorize client based on provided options before WebSocket handshake is complete
    onAuth (client: Client, options: any, request: http.IncomingMessage) { }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) { }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { } */
}