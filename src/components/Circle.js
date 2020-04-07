import { getRandomColor } from "../util";
import React, { useEffect, useRef, useState } from "react";

const config = {
  stepSize: 20,
  radiusFactor: 0.5,
  numOfPoints: "10",
  strokeWidth: "3px"
};

const Circle = props => {
  const svg = useRef(null);
  const [numOfPoints, setNumOfPoints] = useState(config.numOfPoints);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const radius = Math.min(width, height) * config.radiusFactor;
  const padding = 10;
  const offset = radius * config.radiusFactor * 2 + padding;
  const lines = getAllLinesForCircle(numOfPoints, radius, offset);

  useEffect(() => {
    function handleResize() {
      setWidth(svg.current.width.baseVal.value - padding * 2);
      setHeight(svg.current.height.baseVal.value - padding * 2);
    }
    window.addEventListener("resize", handleResize);
    setTimeout(handleResize, 0);
  });
  return (
    <>
      <div className="controls">
        <label>How many points?</label>
        <input
          type="number"
          onChange={e => setNumOfPoints(e.target.value)}
          defaultValue={config.numOfPoints}
          min={3}
          max={65}
        />
      </div>
      <div className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref={svg}>
          <g
            stroke="black"
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {lines}
          </g>
        </svg>
      </div>
    </>
  );
};

export default Circle;

/**
 * Return the array of lines between all points in a circle
 * @param numOfPoints - how many points total
 * @param radius - what is the radius
 * @param offset - how many px should we offset the circle from 0,0
 * @returns {[]}
 */
export function getAllLinesForCircle(numOfPoints, radius, offset) {
  const points = getAllPointsInCircle(numOfPoints, radius, offset);
  const lines = [];

  while (points.length) {
    const [x1, y1] = points.pop();
    for (let i = 0; i < points.length; i++) {
      const [x2, y2] = points[i];
      lines.push(
        <line
          onClick={onLineClicked}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          key={`(${x1},${y1}) to (${x2},${y2})`}
        ></line>
      );
    }
  }
  return lines;
}

/**
 * Return the array of points
 * @param numOfPoints - how many points total
 * @param radius - what is the radius
 * @param offset - how many px should we offset the circle from 0,0
 * @returns {[]}
 */
export function getAllPointsInCircle(numOfPoints, radius, offset) {
  const points = [];

  for (let i = 1; i <= numOfPoints; i++) {
    const point = getPointInCircle(i, numOfPoints, radius, offset);
    points.push(point);
  }

  return points;
}

/**
 * Called when a line is clicked
 * @param e
 */
function onLineClicked(e) {
  e.target.style.stroke = getRandomColor();
}

/**
 * Return a point (equidistant) in a circle in [x,y] coordinates
 * @param n - which point in the order
 * @param numOfPoints - how many points total
 * @param radius - what is the radius
 * @param offset - how many px should we offset the circle from 0,0
 * @returns {*[]}
 */
export function getPointInCircle(n, numOfPoints, radius, offset) {
  const angle = 2 * (Math.PI / numOfPoints);

  const nthpoint = [
    radius * Math.cos(n * angle) + offset,
    radius * Math.sin(n * angle) + offset
  ];
  return nthpoint;
}
