import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { connect } from "react-redux";
import { addPoint, selectPoints } from "../redux/features/cursor/cursorSlice";
import Cursor from "./Cursor";
import {
  selectIsDrawing,
  setIsDrawing,
  setIsNotDrawing
} from "../redux/features/cursor/cursorSlice";
import { debounce, throttle } from "throttle-debounce";

const MaskPaths = ({ className }) => {
  const Eye = () => (
    <clipPath id="eyeMask">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z"
      />
    </clipPath>
  );
  const Kiss = () => (
    <clipPath id="kissMask">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M304 308.5c0-19.2-28.8-41.5-71.5-44-3.8-.4-7.4 2.4-8.2 6.2-.9 3.8 1.1 7.7 4.7 9.2l16.9 7.2c13 5.5 20.8 13.5 20.8 21.5s-7.8 16-20.7 21.5l-17 7.2c-5.7 2.4-6 12.2 0 14.8l16.9 7.2c13 5.5 20.8 13.5 20.8 21.5s-7.8 16-20.7 21.5l-17 7.2c-3.6 1.5-5.6 5.4-4.7 9.2.8 3.6 4.1 6.2 7.8 6.2h.5c42.8-2.5 71.5-24.8 71.5-44 0-13-13.4-27.3-35.2-36 21.7-9.1 35.1-23.4 35.1-36.4zm70.5-83.5l9.5 8.5c3.8 3.3 9.3 4 13.7 1.6 4.4-2.4 6.9-7.4 6.1-12.4-4-25.2-34.2-42.1-59.8-42.1s-55.9 16.9-59.8 42.1c-.8 5 1.7 10 6.1 12.4 5.8 3.1 11.2.7 13.7-1.6l9.5-8.5c14.8-13.2 46.2-13.2 61 0zM136 208.5c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm365.1 194c-8-20.8-31.5-31.5-53.1-25.9l-8.4 2.2-2.3-8.4c-5.9-21.4-27-36.5-49-33-25.2 4-40.6 28.6-34 52.6l22.9 82.6c1.5 5.3 7 8.5 12.4 7.1l83-21.5c24.1-6.3 37.7-31.8 28.5-55.7zM334 436.3c-26.1 12.5-55.2 19.7-86 19.7-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200c0 22.1-3.7 43.3-10.4 63.2 9 6.4 17 14.2 22.6 23.9 6.4.1 12.6 1.4 18.6 2.9 10.9-27.9 17.1-58.2 17.1-90C496 119 385 8 248 8S0 119 0 256s111 248 248 248c35.4 0 68.9-7.5 99.4-20.9-2.5-7.3 4.3 17.2-13.4-46.8z"
      />
    </clipPath>
  );
  const Gem = () => (
    <clipPath id="gemMask">
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M464 0H112c-4 0-7.8 2-10 5.4L2 152.6c-2.9 4.4-2.6 10.2.7 14.2l276 340.8c4.8 5.9 13.8 5.9 18.6 0l276-340.8c3.3-4.1 3.6-9.8.7-14.2L474.1 5.4C471.8 2 468.1 0 464 0zm-19.3 48l63.3 96h-68.4l-51.7-96h56.8zm-202.1 0h90.7l51.7 96H191l51.6-96zm-111.3 0h56.8l-51.7 96H68l63.3-96zm-43 144h51.4L208 352 88.3 192zm102.9 0h193.6L288 435.3 191.2 192zM368 352l68.2-160h51.4L368 352z"
      />
    </clipPath>
  );

  return [<Eye key="eye" />, <Kiss key="kiss" />, <Gem key="gem" />];
};

class Scratch extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOrTouchUp = this.mouseOrTouchUp.bind(this);
    this.mouseOrTouchDown = this.mouseOrTouchDown.bind(this);
    this.drawPoint = throttle(25, true, this.drawPoint.bind(this));
    this.drawMove = this.drawMove.bind(this);
    this.svgRef = React.createRef();
  }

  componentDidMount() {
    // document.onmousemove = this.documentMouseMove.bind(this);
  }

  /**
   * Draw while moving
   * @param event
   */
  drawMove(event) {
    if (this.props.isDrawing) {
      const svg = this.svgRef.current;
      const [x, y] = getPointInSvgFromEvent(svg, event);
      this.drawPoint(x, y);
    }
  }

  drawPoint(x, y) {
    this.props.addPoint({ x, y });
  }

  mouseOrTouchDown(event) {
    const svg = this.svgRef.current;
    const [x, y] = getPointInSvgFromEvent(svg, event);
    this.props.setIsDrawing();
    this.drawPoint(x, y);
  }
  mouseOrTouchUp(event) {
    this.props.setIsNotDrawing();
  }

  render() {
    const width = 100;
    const height = 100;
    const padding = 50;
    return (
      <div className="svg-container">
        <Cursor debug={false} />
        <svg
          onMouseDown={this.mouseOrTouchDown}
          // onTouchStart={this.mouseOrTouchUp}
          onMouseUp={this.mouseOrTouchUp}
          // onTouchEnd={this.mouseOrTouchUp}
          onMouseMove={this.drawMove}
          onTouchMove={this.drawMove}
          id="Layer_1"
          ref={this.svgRef}
        >
          <defs>
            <radialGradient
              id="GradientReflect"
              cx="0.5"
              cy="0.5"
              r="0.4"
              fx="0.75"
              fy="0.75"
              spreadMethod="reflect"
            >
              <stop offset="0%" stopColor="hotpink" />
              <stop offset="100%" stopColor="forestgreen" />
            </radialGradient>
          </defs>
          <MaskPaths />

          {["gemMask", "kissMask", "eyeMask"].map((id, index) => (
            <g
              clipPath={`url(#${id})`}
              width="100px"
              height="100px"
              style={{
                transform: `translateX(${(width + padding) *
                  index}px, ${(height + padding) * index}px)`
              }}
              key={`maskArea_${index}`}
            >
              {this.props.points.map((position, index) => {
                const size = 50;
                const { x, y } = position;
                return (
                  <circle
                    cx={x}
                    cy={y}
                    r={30}
                    key={index}
                    fill="url(#GradientReflect)"
                  />
                );
              })}
            </g>
          ))}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  points: selectPoints(state),
  isDrawing: selectIsDrawing(state)
});
const mapDispatchToProps = { addPoint, setIsNotDrawing, setIsDrawing };

export default connect(mapStateToProps, mapDispatchToProps)(Scratch);
