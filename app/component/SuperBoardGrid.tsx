import { useGame } from "../context/game";
import { Cell, SubBoard } from "../types/game";
import { isStrictSubBoard } from "../util/game";
import { XIcon, OIcon } from "./Icons";

export function SuperBoardGrid() {
  const { game, dispatch } = useGame();

  return (
    <div className="md:size-[80vmin] size-[90vmin] landscape:lg:size-[80vmin] landscape:size-[70vmin] grid gap-2 md:gap-4 grid-cols-3 grid-rows-3">
      {game.superBoard.map((subBoard, subBoardIndex) => (
        <SubBoardGrid
          key={subBoardIndex}
          subBoard={subBoard}
          inFocus={game.focused === subBoardIndex || game.focused === null}
          dispatch={(cellIndex: number) =>
            dispatch({
              type: "move",
              cellIndex,
              subBoardIndex: subBoardIndex,
            })
          }
        />
      ))}
    </div>
  );
}

function SubBoardGrid({
  subBoard,
  inFocus,
  dispatch,
}: {
  subBoard: SubBoard;
  inFocus: boolean;
  dispatch: (cellIndex: number) => void;
}) {
  // If this one is already solved, we just show a big symbol
  if (!isStrictSubBoard(subBoard)) {
    return <CellBuilder cell={subBoard} dispatch={() => {}} clickable={false} />;
  }

  // else we show the whole subBoard
  return (
    <div
      className={`w-full h-full grid gap-0.5 md:gap-1  p-0.5 md:p-1 grid-cols-3 grid-rows-3 ${inFocus ? "bg-stone-500" : "bg-stone-700"}`}
    >
      {subBoard.map((cell, cellIndex) => (
        <CellBuilder
          key={cellIndex}
          cell={cell}
          clickable={!cell && inFocus}
          dispatch={!cell && inFocus ? () => dispatch(cellIndex) : () => {}}
        />
      ))}
    </div>
  );
}

function CellBuilder({
  cell,
  dispatch,
  clickable,
}: {
  cell: Cell;
  dispatch: () => void;
  clickable: boolean;
}) {
  return (
    <div
      className={`p-0.5 md:p-1 bg-stone-900 transition-all ${clickable ? "cursor-pointer hover:bg-stone-800" : ""}`}
      onClick={dispatch}
    >
      {cell === "X" ? <XIcon activated={true} /> : cell === "O" ? <OIcon activated={true} /> : ""}
    </div>
  );
}
