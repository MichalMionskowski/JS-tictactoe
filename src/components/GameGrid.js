import Square from "./Square";
import { useState, useCallback, useEffect } from "react";

export function GameGrid({ size }) {
  const [squares, setSquares] = useState(setInitialSquareState((size = size)));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameState, setGameState] = useState("Next player: X");

  useEffect(() => {
    if (checkForWinner(squares)) {
      setGameState(checkForWinner(squares));
    } else {
      setGameState(`Next player: ${currentPlayer}`);
    }
  }, [currentPlayer]);

  const onClick = useCallback(
    (x, y) => {
      if (squares[x][y].text !== "") return;
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
    <div>
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
      <div>{gameState}</div>
      <button onClick={() => setSquaressetInitialSquareState((size = size))}>
        Reset
      </button>
    </div>
  );
}

function checkForWinner(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i][0].text === squares[i][1].text &&
      squares[i][1].text === squares[i][2].text &&
      squares[i][0].text !== ""
    ) {
      return `${squares[i][0].text} IS THE WINNER!`;
    } else if (
      squares[0][i].text === squares[1][i].text &&
      squares[1][i].text === squares[2][i].text &&
      squares[0][i].text !== ""
    ) {
      return `${squares[0][i].text} IS THE WINNER!`;
    }
  }
  if (
    squares[0][0].text === squares[1][1].text &&
    squares[1][1].text === squares[2][2].text &&
    squares[1][1].text !== ""
  ) {
    return `${squares[0][0].text} IS THE WINNER!`;
  } else if (
    squares[0][2].text === squares[1][1].text &&
    squares[1][1].text === squares[2][0].text &&
    squares[1][1].text !== ""
  ) {
    return `${squares[1][1].text} IS THE WINNER!`;
  }
  return null;
}

function setInitialSquareState(size) {
  return Array.from({ length: size }).map((_, i) =>
    Array.from({ length: size }).map((_, j) => ({
      text: "",
      x: i,
      y: j,
    })),
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
