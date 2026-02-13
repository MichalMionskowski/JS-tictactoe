export default function Square({ text, x, y, onClick }) {
  return (
    <div style={styles.square} className="square" onClick={() => onClick(x, y)}>
      {text}
    </div>
  );
}

const styles = {
  square: {
    width: "100px",
    height: "100px",
    backgroundColor: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
