"use client";

import { useEffect, useState } from "react";

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
  Board
];

const colors = {
  X: "#84BC9C",
  O: "#F46197",
  background: "#FFFDF780",
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

function XWonBoard(board: Board): boolean {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === "X")
  );
}

function OWonBoard(board: Board): boolean {
  return winningCombinations.some((combination) =>
    combination.every((index) => board[index] === "O")
  );
}

function isWonBoard(board: Board): boolean {
  return winningCombinations.some(
    (combination) =>
      combination.every((index) => board[index] === "X") ||
      combination.every((index) => board[index] === "O")
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
      combination.every((index) => XWonBoard(gameState[index]))
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
  const [gameState, setGameState] = useState<GameState>();
  const [playerTurn, setPlayerTurn] = useState<Player>("X");
  const [focusedCell, setFocusedCell] = useState<number | null>(null);

  useEffect(() => {
    const initialBoard: GameState = Array(9)
      .fill(null)
      .map(() => Array(9).fill(null) as Board) as GameState;
    setGameState(initialBoard);
  }, []);

  return (
    <div
      className="flex w-screen h-screen items-center justify-center"
      style={{ backgroundColor: colors[playerTurn] }}
    >
      <div
        className="grid grid-cols-3 gap-1 aspect-square landscape:h-full portrait:w-full"
        style={{
          backgroundColor: colors.background,
          boxShadow: "0 0 20px 10px "+ colors.background,
        }}
      >
        {gameState && gameIsWon(gameState) ? (
          <div
            className="col-span-3 text-center text-2xl font-bold rounded grid place-items-center"
            style={{ backgroundColor: colors[winner(gameState)!] }}
          >
            WINNER
          </div>
        ) : (
          gameState?.map((board, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-2 aspect-square rounded-lg overflow-hidden p-2"
              style={{
                background:
                  focusedCell === index
                    ? colors[playerTurn] + "80"
                    : "transparent",
              }}
            >
              {XWonBoard(board) ? (
                <div
                  className="border size-full aspect-square rounded-lg flex items-center justify-center col-span-3"
                  style={{ backgroundColor: colors.X }}
                ></div>
              ) : OWonBoard(board) ? (
                <div
                  className="border size-full aspect-square rounded-lg flex items-center justify-center col-span-3"
                  style={{ backgroundColor: colors.O }}
                ></div>
              ) : (
                board.map((cell, cellIndex) => (
                  <div
                    key={cellIndex}
                    className="border flex items-center justify-center size-full aspect-square rounded-lg"
                    style={{
                      backgroundColor:
                        cell === "X"
                          ? colors.X
                          : cell === "O"
                          ? colors.O
                          : colors.background,
                    }}
                    onClick={() => {
                      if (cell || !gameState) return;
                      if (focusedCell !== null && focusedCell !== index) {
                        return;
                      }
                      const newGameState = [...gameState];
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
    </div>
  );
}
