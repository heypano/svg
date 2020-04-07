import React, { useEffect, useRef, useState } from "react";
import { getRandomColor } from "./util";
import Circle from "./components/Circle";

function App() {
  return (
    <div className="app">
      <Circle />
    </div>
  );
}

export default App;
