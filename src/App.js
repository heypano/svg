import React, { useEffect, useRef, useState } from "react";

const config = {
  lineWidth: 3,
  stepSize: 20,
  radiusFactor: 0.5,
  numOfPoints: 15
};
const svgNs = "http://www.w3.org/2000/svg";

function App() {
  const svg = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const radius = Math.min(width, height) * config.radiusFactor;
  const offset = radius * config.radiusFactor * 2;
  const lines = [];
  const { numOfPoints } = config;

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize);
  });

  for (let i = 1; i <= numOfPoints; i++) {
    const thisOne = i;
    const theNextOne = i + 1 <= numOfPoints ? i + 1 : 1;
    const [x1, y1] = getPointInCircle(thisOne, numOfPoints, radius, offset);
    const [x2, y2] = getPointInCircle(theNextOne, numOfPoints, radius, offset);

    lines.push(<line x1={x1} y1={y1} x2={x2} y2={y2} key={i}></line>);
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref={svg}>
      <circle cx={offset} cy={offset} r={radius} fill="none" stroke="black" />
      <g
        stroke="black"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {lines}
      </g>
    </svg>
  );
}

function getPointInCircle(n, numOfPoints, radius, offset) {
  const angle = 2 * (Math.PI / numOfPoints);

  const nthpoint = [
    radius * Math.cos(n * angle) + offset,
    radius * Math.sin(n * angle) + offset
  ];
  return nthpoint;
}

export default App;
