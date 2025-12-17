"use client";

import { SuperBoardGrid } from "./component/SuperBoardGrid";
import { Scoreboard } from "./component/Scoreboard";
import { GameOverOverlay } from "./component/GameOverOverlay";
import SuperCoolGradient from "./component/SuperCoolGradient";

export default function Page() {
  return (
    <div className="select-none flex flex-col landscape:flex-row justify-center items-center gap-4 landscape:gap-10 w-full h-full absolute top-0 left-0 bg-stone-900">
      <SuperCoolGradient />
      <GameOverOverlay />
      <SuperBoardGrid />
      <Scoreboard />
    </div>
  );
}
