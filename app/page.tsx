"use client";

import { useState } from "react";

type Player = "X" | "O";

type Cell = Player | null;

type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];

type GameState = [
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
  Board,
];

const colors = {
  X: "#E5989B", // Coral Sand
  O: "#84A59D", // Seafoam Green
  background: "#F6FFF8", // Dune Mist
  border: "#000000", // Black
  cell: "#DDE5B6", // Coastal Grass
};

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

function generateEmptyGameState(): GameState {
  return Array(9)
    .fill(null)
    .map(() => Array(9).fill(null)) as GameState;
}

function XWonBoard(board: Board): boolean {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === "X"),
  );
}

function OWonBoard(board: Board): boolean {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === "O"),
  );
}

function isWonBoard(board: Board): boolean {
  return winningCombinations.some(
    (combination) =>
      combination.every((index) => board[index] === "X") ||
      combination.every((index) => board[index] === "O"),
  );
}

function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

function unableToFocus(board: Board): boolean {
  return isWonBoard(board) || isBoardFull(board);
}

function gameIsWon(gameState: GameState): boolean {
  return winningCombinations.some(
    (combination) =>
      combination.every((index) => OWonBoard(gameState[index])) ||
      combination.every((index) => XWonBoard(gameState[index])),
  );
}

function gameEnded(gameState: GameState): boolean {
  return (
    gameIsWon(gameState) || gameState.every((board) => unableToFocus(board))
  );
}

function winner(gameState: GameState): Player | null {
  for (const combination of winningCombinations) {
    if (combination.every((index) => XWonBoard(gameState[index]))) {
      return "X";
    }
    if (combination.every((index) => OWonBoard(gameState[index]))) {
      return "O";
    }
  }
  return null;
}

export default function Page() {
  const [gameState, setGameState] = useState<GameState>(
    generateEmptyGameState(),
  );
  const [playerTurn, setPlayerTurn] = useState<Player>("X");
  const [focusedCell, setFocusedCell] = useState<number | null>(null);
  // [x,o]
  const [points, setPoints] = useState<Record<Player, number>>({ X: 0, O: 0 });

  return (
    <div
      className="flex w-screen h-screen items-center justify-center portrait:flex-col"
      style={{ backgroundColor: colors.background }}
    >
      <span className="w-full h-full flex items-center justify-center">
        {points.X}
      </span>
      <div className="grid grid-cols-3 gap-1 aspect-square landscape:h-full portrait:w-full">
        {gameState && gameEnded(gameState) ? (
          <div
            className="col-span-3 text-center text-2xl font-bold rounded grid place-items-center"
            style={{
              backgroundColor:
                winner(gameState) == null
                  ? colors.cell
                  : colors[winner(gameState)!],
            }}
          >
            {winner(gameState) == null
              ? "IT'S A DRAW!"
              : `${winner(gameState)} WINS!`}
            <button
              onClick={() => {
                const initialBoard: GameState = Array(9)
                  .fill(null)
                  .map(() => Array(9).fill(null) as Board) as GameState;
                setGameState(initialBoard);
                if (winner(gameState) == null) return;
                const newPoints = { X: points.X, O: points.O };
                newPoints[winner(gameState)!]++;
                setPoints(newPoints);
              }}
            >
              ONE MORE TIME
            </button>
          </div>
        ) : (
          gameState?.map((board, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-2 aspect-square rounded-lg overflow-hidden p-2"
              style={{
                backgroundColor:
                  focusedCell === index
                    ? colors[playerTurn] + "80"
                    : "transparent",
              }}
            >
              {XWonBoard(board) ? (
                <div
                  className="border-2 size-full aspect-square rounded-lg flex items-center justify-center col-span-3"
                  style={{
                    backgroundColor: colors.X,
                    borderColor: colors.border,
                  }}
                ></div>
              ) : OWonBoard(board) ? (
                <div
                  className="border-2 size-full aspect-square rounded-lg flex items-center justify-center col-span-3"
                  style={{
                    backgroundColor: colors.O,
                    borderColor: colors.border,
                  }}
                ></div>
              ) : (
                board.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="border-2 flex items-center justify-center size-full aspect-square rounded-lg"
                    style={{
                      backgroundColor:
                        cell === "X"
                          ? colors.X
                          : cell === "O"
                            ? colors.O
                            : colors.cell,
                      borderColor: colors.border,
                    }}
                    onClick={() => {
                      if (cell || !gameState) return;
                      if (focusedCell !== null && focusedCell !== index) {
                        return;
                      }
                      const newGameState = [
                        ...(gameState.map((b) => [...b]) as GameState),
                      ];
                      newGameState[index][cellIndex] = playerTurn;
                      setGameState(newGameState as GameState);
                      setPlayerTurn(playerTurn === "X" ? "O" : "X");
                      if (unableToFocus(newGameState[cellIndex])) {
                        setFocusedCell(null);
                      } else {
                        setFocusedCell(cellIndex);
                      }
                    }}
                  ></div>
                ))
              )}
            </div>
          ))
        )}
      </div>
      <span className="w-full h-full flex items-center justify-center">
        {points.O}
      </span>
    </div>
  );
}
