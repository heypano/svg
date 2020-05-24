import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { throttle } from "throttle-debounce";
import { getRandomColor } from "../util";
import Mark from "./Mark";
import { addPoint, selectPoints } from "../redux/features/points/pointsSlice";
import Cursor from "./Cursor";
import {
  selectIsDrawing,
  setIsDrawing,
  setIsNotDrawing
} from "../redux/features/cursor/cursorSlice";
import { connect } from "react-redux";

class Paths extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOrTouchUp = this.mouseOrTouchUp.bind(this);
    this.mouseOrTouchDown = this.mouseOrTouchDown.bind(this);
    // this.drawPoint = throttle(25, this.drawPoint.bind(this));
    this.drawPoint = this.drawPoint.bind(this);
    this.drawMove = this.drawMove.bind(this);
    this.svgRef = React.createRef();
  }

  getPathFromPoints() {
    let result = "";
    for (let i = 0; i < this.props.points.length - 1; i += 2) {
      const { x: x1, y: y1 } = this.props.points[i];
      const { x: x2, y: y2 } = this.props.points[i + 1];
      result += `S ${x1} ${y1}, ${x2} ${y2} `;
    }
    return result;
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
    return (
      <div className="svg-container">
        <Cursor />
        <svg
          onMouseDown={this.mouseOrTouchDown}
          // onTouchStart={this.mouseOrTouchUp}
          onMouseUp={this.mouseOrTouchUp}
          // onTouchEnd={this.mouseOrTouchUp}
          // onMouseMove={this.drawMove}
          // onTouchMove={this.drawMove}
          ref={this.svgRef}
        >
          <g width="100%" height="100%" ref={this.groupRef}>
            <path
              fillRule="evenodd"
              d={`M 100 0 C 25 50, 25 100, 100 100 ${this.getPathFromPoints()}`}
            />
            {this.props.points.map(({ x, y }, index) => {
              const color = index % 2 ? "red" : "green";
              return <Mark x={x} y={y} r={5} fill={color} />;
            })}
          </g>
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

export default connect(mapStateToProps, mapDispatchToProps)(Paths);
