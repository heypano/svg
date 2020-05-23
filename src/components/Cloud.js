import React from "react";

let multiplier = 1;
let scaleModifier = 100;
let step = 0.1;
let scale = 1;
const getPath = (x, y) => {
  // const finalX = (1 / scale) * (-35 + x); //- window.innerWidth / 2;
  // const finalY = (1 / scale) * y; //- window.innerHeight / 2;
  const finalX = x - 35;
  const finalY = y;
  const v1 = Math.round(20 + multiplier);
  const v2 = Math.round(15 + multiplier);
  const v3 = Math.round(10 + multiplier);
  return `M ${finalX} ${finalY}
          a ${v1},${v1} 1 0,0 0,40
          h 50
          a ${v1},${v1} 1 0,0 0,-40
          a ${v3},${v3} 1 0,0 -15,-10
          a ${v2},${v2} 1 0,0 -35,10
          z`;
};

class Cloud extends React.Component {
  componentDidMount() {
    const path = document.getElementById("cloud-path");
    const svg = document.getElementById("svg-element");
    svg.setAttribute(
      "viewBox",
      `0 0 ${scaleModifier * scale} ${scaleModifier * scale}`
    );
    const handleMouseMove = event => {
      if (path) {
        const { clientX, clientY } = event;
        const x = clientX !== undefined ? clientX : event.touches[0].clientX;
        const y = clientY !== undefined ? clientY : event.touches[0].clientY;
        path.setAttribute("d", getPath(x, y));
      }
    };
    const handleClick = event => {
      if (path) {
        // multiplier += step;
        scale = +(step + scale).toFixed(1);
        // path.setAttribute("d", getPath(x, y));
        // path.setAttribute("transform", `scale(${scale})`);
        svg.setAttribute(
          "viewBox",
          `0 0 ${scaleModifier * scale} ${scaleModifier * scale}`
        );
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("click", handleClick);
  }

  render() {
    const cloudFill = "aliceblue";
    const cloudStroke = "black";

    return (
      <>
        <div className="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            fill={cloudFill}
            stroke={cloudStroke}
            id="svg-element"
          >
            <g width="100%" height="100%">
              <path d={getPath(0, 0)} id="cloud-path" />
            </g>
          </svg>
        </div>
      </>
    );
  }
}

export default Cloud;
