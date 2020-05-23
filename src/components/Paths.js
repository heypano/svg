import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { throttle } from "throttle-debounce";
import { getRandomColor } from "../util";
import Mark from "./Mark";

class Draw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: [],
      drawing: false
    };
    this.groupRef = React.createRef();
    this.svgRef = React.createRef();
    this.drawMove = this.drawMove.bind(this);
    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.drawPoint = throttle(25, this.drawPoint.bind(this));
  }

  /**
   * Draw while moving
   * @param event
   */
  drawMove(event) {
    if (this.state.drawing) {
      const svg = this.svgRef.current;
      const [x, y] = getPointInSvgFromEvent(svg, event);
      this.drawPoint(x, y);
    }
  }

  /**
   * Draw a single point
   * @param x
   * @param y
   */
  drawPoint(x, y) {
    this.setState({
      ...this.state,
      points: [...this.state.points, [x, y]]
    });
  }

  /**
   * Start Drawing
   * @param event
   */
  startDrawing(event) {
    console.log(event.nativeEvent);
    const svg = this.svgRef.current;
    const [x, y] = getPointInSvgFromEvent(svg, event);
    this.setState({ ...this.state, drawing: true }, () => {
      this.drawPoint(x, y);
    });
  }

  /**
   * Stop Drawing
   * @param event
   */
  stopDrawing(event) {
    this.setState({ ...this.state, drawing: false });
  }

  getPathFromPoints() {
    let result = "";
    for (let i = 0; i < this.state.points.length - 1; i += 2) {
      const [x1, y1] = this.state.points[i];
      const [x2, y2] = this.state.points[i + 1];
      result += `S ${x1} ${y1}, ${x2} ${y2} `;
    }
    return result;
  }

  render() {
    return (
      <div className="svg-container">
        <svg
          // onClick={this.onSvgClick}
          onMouseDown={this.startDrawing}
          onTouchStart={this.startDrawing}
          onMouseUp={this.stopDrawing}
          onTouchEnd={this.stopDrawing}
          onMouseMove={this.drawMove}
          onTouchMove={this.drawMove}
          ref={this.svgRef}
        >
          <g width="100%" height="100%" ref={this.groupRef}>
            <path
              fillRule="evenodd"
              d={`M 100 0 C 25 50, 25 100, 100 100 ${this.getPathFromPoints()}`}
            />
            {this.state.points.map(([x, y], index) => {
              const color = index % 2 ? "red" : "green";
              return <Mark x={x} y={y} r={5} fill={color} />;
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Draw;
