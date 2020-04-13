import { getColorByMousePosition } from "../util";
import React from "react";

const getPath = (x, y) => {
  const finalX = 25 + x; //- window.innerWidth / 2;
  const finalY = 60 + y; //- window.innerHeight / 2;
  return `M ${finalX},${finalY}
          a 20,20 1 0,0 0,40
          h 50
          a 20,20 1 0,0 0,-40
          a 10,10 1 0,0 -15,-10
          a 15,15 1 0,0 -35,10
          z`;
};

class Cloud extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const path = document.getElementById("cloud-path");
    function handleMouseMove(event) {
      if (path) {
        const { clientX, clientY } = event;
        const x = clientX !== undefined ? clientX : event.touches[0].clientX;
        const y = clientY !== undefined ? clientY : event.touches[0].clientY;
        path.setAttribute("d", getPath(x, y));
      }
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
  }

  render() {
    const padding = 10;
    const cloudFill = "aliceblue";
    const cloudStroke = "black";

    return (
      <>
        <div className="svg-container">
          <svg viewBox="0 0 105 105" fill={cloudFill} stroke={cloudStroke}>
            <path d={getPath(0, 0)} id="cloud-path" />
          </svg>
        </div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            className="w-full"
            src="/img/card-top.jpg"
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #winter
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Cloud;
