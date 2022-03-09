import { GameState } from "../../types/ICardGameState";
import { Command } from "@colyseus/command";
import ITicTacToeState from "../../types/ICardGameState";
import NextTurnCommand from "./NextTurnCommand";

export default class CheckWinnerCommand extends Command<ITicTacToeState>
{
    private determineWin()
    {
        console.log('determine Win func')
    }

    execute()
    {
        console.log('Check Win Command excute')
    }
}