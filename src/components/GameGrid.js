import Square from "./Square";
import { useState, useCallback } from "react";

export function GameGrid({ size }) {
  const [squares, setSquares] = useState(
    Array.from({ length: size }).map((_, i) =>
      Array.from({ length: size }).map((_, j) => ({
        x: i,
        y: j,
      })),
    ),
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const onClick = useCallback(
    (x, y) => {
      console.log(squares[x][y].text);

      if (squares[x][y].text !== undefined) return;
      setCurrentPlayer((current) => {
        return current === "X" ? "O" : "X";
      });
      setSquares((prev) => {
        const newSquares = [...prev];
        newSquares[x][y] = {
          ...newSquares[x][y],
          text: currentPlayer,
        };

        return newSquares;
      });
    },
    [squares],
  );

  return (
    <div style={style.container}>
      {Array.from({ length: size }).map((_, i) => (
        <div key={i} style={style.row}>
          {Array.from({ length: size }).map((_, j) => (
            <Square
              key={`${i}_${j}`}
              text={squares[i][j].text}
              x={i}
              y={j}
              onClick={onClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const style = {
  container: {
    flexDirection: "column",
    gap: 10,
    display: "flex",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    display: "flex",
  },
};
