import { useGame } from "../context/game";

export function Scoreboard() {
  return (
    <aside className="w-fit portrait:w-[90vw] portrait:md:w-[80vmin] h-fit flex landscape:flex-col gap-2">
      <ScoreValue />
      <Buttons />
    </aside>
  );
}

function ScoreValue() {
  const { game } = useGame();
  const { player, score } = game;

  return (
    <div className="grid grid-cols-3 gap-4 text-stone-300 place-items-center border-stone-700 border-4 p-2 w-full">
      <span
        className={`text-xl text-stone-500 transition-all ${player === "X" ? "scale-125 !text-x" : ""}`}
      >
        X
      </span>
      <span className="text-xl text-stone-500">Ties</span>
      <span
        className={`text-xl text-stone-500 transition-all ${player === "O" ? "scale-125 !text-o" : ""}`}
      >
        O
      </span>
      <span
        className={`text-xl font-bold transition-all ${player === "X" ? "scale-125 !text-x" : ""}`}
      >
        {score.X}
      </span>
      <span className="text-xl font-bold">{score.Draw}</span>
      <span
        className={`text-xl font-bold transition-all ${player === "O" ? "scale-125 !text-o" : ""}`}
      >
        {score.O}
      </span>
    </div>
  );
}

function Buttons() {
  const { dispatch } = useGame();

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        className="border-stone-700 border-4 h-full px-2 py-1 text-stone-500 w-full transition-all hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500"
        onClick={() => dispatch({ type: "surrender" })}
      >
        Surrender
      </button>
    </div>
  );
}
