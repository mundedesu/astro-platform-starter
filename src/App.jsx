import React from "react";
import ReactDOM from "react-dom/client";
import CircularText from "./CircularText";

function App() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Circular Text Spinner</h1>
      <CircularText text="SPINNING TEXT" onHover="goBonkers" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
