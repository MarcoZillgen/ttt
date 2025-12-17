export type Player = "X" | "O";

export type Cell = Player | null;

export type StrictSubBoard = [
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
  Cell,
];

export type SubBoard = StrictSubBoard | Cell;

export type SuperBoard = [
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
  SubBoard,
];

export type Game = {
  superBoard: SuperBoard;
  player: Player;
  focused: number | null;
  score: {
    O: number;
    X: number;
    Draw: number;
  };
  end: boolean;
  winner: Player | "Draw" | null;
};

export type GameActionMove = {
  type: "move";
  subBoardIndex: number;
  cellIndex: number;
};

export type GameActionSurrender = { type: "surrender" };
export type GameActionRevanche = { type: "revanche" };

export type GameAction =
  | GameActionMove
  | GameActionSurrender
  | GameActionRevanche;
