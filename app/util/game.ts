import {
  Game,
  GameAction,
  GameActionMove,
  Player,
  StrictSubBoard,
  SubBoard,
  SuperBoard,
} from "../types/game";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function GameReducer(game: Game, action: GameAction): Game {
  const clone = deepCloneGame(game);
  switch (action.type) {
    case "move":
      return move(clone, action);
    case "surrender":
      return surrender(clone);
    case "revanche":
      return revanche(clone);
  }
}

function revanche(clone: Game) {
  return {
    ...clone,
    superBoard: generateClearSuperBoard(),
    end: false,
    winner: null,
  };
}

function move(clone: Game, { subBoardIndex, cellIndex }: GameActionMove) {
  // dont move if over
  if (clone.end) return clone;

  const currentSubBoard = clone.superBoard[subBoardIndex];
  // dont move if occupied
  if (!isStrictSubBoard(currentSubBoard)) return clone;
  if (currentSubBoard[cellIndex] !== null) {
    return clone;
  }

  // Tick off cell
  currentSubBoard[cellIndex] = clone.player;

  // check for win/draw in subBoard and update it
  if (checkWin(currentSubBoard, clone.player)) {
    clone.superBoard[subBoardIndex] = clone.player;
  } else if (currentSubBoard.every((cell) => cell !== null)) {
    clone.superBoard[subBoardIndex] = null;
  }

  // check for global win or draw
  if (checkWin(clone.superBoard, clone.player)) {
    clone.score[clone.player]++;
    clone.end = true;
    clone.winner = clone.player;
  } else if (checkDraw(clone.superBoard)) {
    clone.score.Draw++;
    clone.end = true;
    clone.winner = "Draw";
  }

  // check if focus is possible for next subBoard
  if (isStrictSubBoard(clone.superBoard[cellIndex])) {
    clone.focused = cellIndex;
  } else {
    clone.focused = null;
  }

  // next player and return
  clone.player = clone.player == "X" ? "O" : "X";
  return clone;
}

function surrender(clone: Game) {
  const winner = clone.player === "X" ? "O" : "X";
  clone.score[winner]++;
  clone.end = true;
  clone.winner = winner;
  return clone;
}

export function generateStartGame(player: Player = "X"): Game {
  return {
    score: { X: 0, Draw: 0, O: 0 },
    player: player,
    superBoard: generateClearSuperBoard(),
    focused: null,
    end: false,
    winner: null,
  };
}

function generateClearSuperBoard(): SuperBoard {
  return Array.from({ length: 9 }, () => new Array(9).fill(null)) as SuperBoard;
}

function checkDraw(superBoard: SuperBoard): boolean {
  return superBoard.every((subBoard) => !isStrictSubBoard(subBoard));
}

function deepCloneGame(game: Game): Game {
  const superBoardCopy: SuperBoard = [
    ...(game.superBoard.map((subBoard) =>
      cloneSubBoard(subBoard),
    ) as SuperBoard),
  ];
  return {
    ...game,
    score: { ...game.score },
    superBoard: superBoardCopy,
  };
}

function cloneSubBoard(subBoard: SubBoard): SubBoard {
  return isStrictSubBoard(subBoard) ? [...subBoard] : subBoard;
}

export function checkWin(
  superBoard: StrictSubBoard | SuperBoard,
  player: Player,
): boolean {
  for (const comb of winningCombinations) {
    if (comb.every((idx) => superBoard[idx] === player)) {
      return true;
    }
  }
  return false;
}

export function isStrictSubBoard(
  subBoard: SubBoard,
): subBoard is StrictSubBoard {
  return Array.isArray(subBoard);
}
