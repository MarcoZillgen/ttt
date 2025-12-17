"use client";

import {
  createContext,
  ActionDispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { generateStartGame, GameReducer } from "../util/game";
import { Game, GameAction } from "../types/game";

const GameContext = createContext<{
  game: Game;
  dispatch: ActionDispatch<[GameAction]>;
}>({
  game: generateStartGame(),
  dispatch: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [game, dispatch] = useReducer(GameReducer, generateStartGame());

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  return context;
}
