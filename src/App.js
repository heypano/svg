import React, { useEffect, useRef, useState } from "react";
import { getRandomColor } from "./util";
import Circle from "./components/Circle";
import Wrong from "./components/Wrong";

function App() {
  return (
    <div className="app">
      <Wrong />
    </div>
  );
}

export default App;
