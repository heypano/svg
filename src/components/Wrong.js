import { getColorByMousePosition } from "../util";
import React from "react";

const config = {
  ratio: 100,
  stepSize: 20,
  numOfPoints: "10",
  strokeWidth: "3px"
};

class Wrong extends React.Component {
  componentDidMount() {
    const cir = document.getElementById("circle");
    const group = document.getElementById("circleg");
    let goingUp = true;
    function handleMouseMove(event) {
      if (cir) {
        const { clientX, clientY } = event;
        const x = clientX !== undefined ? clientX : event.touches[0].clientX;
        const y = clientY !== undefined ? clientY : event.touches[0].clientY;
        const fillColor = getColorByMousePosition(x, y);
        const maxScale = 2;
        const minScale = 1;
        const step = 0.005;

        let scale;
        // if (match) {
        const currentR = +cir.getAttribute("r");
        const currentScale = currentR / config.ratio;
        const scaleUp = currentScale + step;
        const scaleDown = currentScale - step;
        const wouldBeTooBig = scaleUp > maxScale;
        const wouldBeTooSmall = scaleDown < minScale;
        if (goingUp && wouldBeTooBig) {
          goingUp = false;
        } else if (!goingUp && wouldBeTooSmall) {
          goingUp = true;
        }
        scale = goingUp ? scaleUp : scaleDown;
        cir.setAttribute("cx", x);
        cir.setAttribute("cy", y);
        console.log(currentScale, currentR, scale);
        cir.setAttribute("r", scale * config.ratio);
        // cir.style.transform = `translate(${x}px,${y}px) scale(${scaleX},${scaleY})`;
        // cir.style.transform = `scale(${scaleX},${scaleY})`;
        // group.setAttribute("fill", `hsl(${fillColor}, 100%, 50%);`);
        group.setAttribute("fill", fillColor);
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
  }

  render() {
    return (
      <>
        <div className="svg-container">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <g
              stroke="black"
              fill="hotpink"
              strokeWidth={config.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              id="circleg"
            >
              <circle r={100} cx={0} cy={0} id="circle" />
            </g>
          </svg>
        </div>
      </>
    );
  }
}

export default Wrong;
