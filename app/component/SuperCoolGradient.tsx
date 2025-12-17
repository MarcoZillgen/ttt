import { useGame } from "../context/game";

export default function SuperCoolGradient() {
  const {
    game: { player },
  } = useGame();

  return (
    <>
      <div
        className={`flex flex-col justify-center items-center gap-10 landscape:w-[10vw] landscape:h-full portrait:w-full portrait:h-[10vh] absolute top-0 left-0 landscape:bg-gradient-to-r portrait:bg-gradient-to-b ${player === "X" ? "from-x/20" : "from-o/20"}`}
      />
      <div
        className={`flex flex-col justify-center items-center gap-10 landscape:w-[10vw] landscape:h-full portrait:w-full portrait:h-[10vh] absolute bottom-0 right-0 landscape:bg-gradient-to-l portrait:bg-gradient-to-t ${player === "X" ? "from-x/20" : "from-o/20"}`}
      />
    </>
  );
}
