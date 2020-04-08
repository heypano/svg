import { getRandomColor } from "../util";
import React from "react";

const config = {
  stepSize: 20,
  radiusFactor: 0.5,
  numOfPoints: "10",
  strokeWidth: "3px"
};

class Wrong extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const cir = document.getElementById("circleee");
    let goingUp = true;
    function handleMouseMove(event) {
      if (cir) {
        const { clientX, clientY } = event;
        const x = clientX !== undefined ? clientX : event.touches[0].clientX;
        const y = clientY !== undefined ? clientY : event.touches[0].clientY;
        const maxScale = 2;
        const minScale = 1;
        const step = 0.005;

        const match = cir.style.transform.match(/scale\((.+),[\s]*(.+)\)/);

        let scaleX;
        let scaleY;
        if (match) {
          const currentScaleX = +match[1];
          const currentScaleY = +match[2];
          const scaleXUp = currentScaleX + step;
          const scaleXDown = currentScaleX - step;
          const scaleYUp = currentScaleY + step;
          const scaleYDown = currentScaleY - step;
          const wouldBeTooBig = scaleXUp > maxScale || scaleYUp > maxScale;
          const wouldBeTooSmall =
            scaleXDown < minScale || scaleYDown < minScale;
          if (goingUp && wouldBeTooBig) {
            goingUp = false;
          } else if (!goingUp && wouldBeTooSmall) {
            goingUp = true;
          }
          scaleX = goingUp ? scaleXUp : scaleXDown;
          scaleY = goingUp ? scaleYUp : scaleYDown;
        } else {
          scaleX = 1;
          scaleY = 1;
        }
        cir.style.transform = `translate(${x}px,${y}px) scale(${scaleX},${scaleY})`;
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
  }

  render() {
    const padding = 10;

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
            >
              <circle r={100} id="circleee" cx={0} cy={0} id="circleee" />
            </g>
          </svg>
        </div>
      </>
    );
  }
}

export default Wrong;
