import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { throttle } from "throttle-debounce";
import { getRandomColor } from "../util";
import Mark from "./Mark";
import { addPoint, selectPoints } from "../redux/features/cursor/cursorSlice";
import Cursor from "./Cursor";
import {
  resetCurrentTool,
  selectCurrentTool,
  selectIsDrawing,
  selectTools,
  selectToolStage,
  setIsDrawing,
  setIsNotDrawing,
  setNextToolStage
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
    const { points } = this.props;
    let result = "";
    for (const point of points) {
      const { x, y, type, stage } = point;
      const { stages, toolName } = this.props.tools[type];
      if (stage == 0) {
        result += `${toolName} ${x} ${y}, `;
      } else {
        result += `${x} ${y}, `;
      }
      // const { x: x2, y: y2, type: t2, stage: s2 } = points[i + 1];
      // result += `S ${x1} ${y1}, ${x2} ${y2} `;
    }
    console.log(result);
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
    this.props.addPoint({
      x,
      y,
      type: this.props.currentTool,
      stage: this.props.toolStage
    });
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
              fill="none"
              stroke="black"
              strokeWidth={1}
              // d={`M 100 0 C 25 50, 25 100, 100 100 ${this.getPathFromPoints()}`}
              d={`${this.getPathFromPoints()}`}
            />
            {this.props.points.map(({ x, y }, index) => {
              // const color = index % 2 ? "red" : "green";
              const color = "grey";
              return <Mark x={x} y={y} r={5} fill={color} key={index} />;
            })}
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  points: selectPoints(state),
  currentTool: selectCurrentTool(state),
  toolStage: selectToolStage(state),
  isDrawing: selectIsDrawing(state),
  tools: selectTools(state)
});
const mapDispatchToProps = {
  addPoint,
  setIsNotDrawing,
  setIsDrawing,
  resetCurrentTool,
  setNextToolStage
};

export default connect(mapStateToProps, mapDispatchToProps)(Paths);
