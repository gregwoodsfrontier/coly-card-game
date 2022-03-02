export enum Cell {
    Empty,
    X,
    O
}

export interface ITicTacToeState {
    board: number[]
    activePlayer: number
}