import { Room } from "colyseus";
import TicTacToeState from "./TicTacToeState";

export default class TicTacToe extends Room {
    // When room is initialized
    onCreate()
    {
        console.log('room created')
        this.setState(new TicTacToeState())
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