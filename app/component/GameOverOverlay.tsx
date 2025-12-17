"use client";

import { useGame } from "../context/game";
import { OIcon, XIcon } from "./Icons";

export function GameOverOverlay() {
  const {
    game: { winner },
    dispatch,
  } = useGame();

  if (!winner) {
    return null;
  }

  return (
    <div className="absolute inset-0 bg-stone-900/80 grid place-content-center animate-scale-in z-10">
      <div className="flex flex-col items-center gap-4">
        {winner === "Draw" ? (
          <h1 className="text-4xl md:text-3xl font-bold text-white">
            Draw
          </h1>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 md:w-24 md:h-24">
              {winner === "X" && <XIcon activated={true} />}
              {winner === "O" && <OIcon activated={true} />}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">Wins!</h1>
          </div>
        )}
        <div className="w-full flex">
          <button
            className="border-stone-700 bg-stone-900 border-4 h-full px-2 py-1 text-stone-500 w-full transition-all hover:bg-sky-950 hover:text-sky-500 hover:border-sky-500"
            onClick={() => dispatch({ type: "revanche" })}
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
