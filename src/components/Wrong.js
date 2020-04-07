import { getRandomColor } from "../util";
import React, { useEffect, useRef, useState } from "react";

const Wrong = props => {
  const svg = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

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
      <div className="svg-container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref={svg}>
          <g
            stroke="black"
            fill="none"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1={0} x2={100} y1={200} y2={200} />
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
