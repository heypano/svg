import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { throttle } from "throttle-debounce";
import { getRandomColor } from "../util";

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
            {this.state.points.map((position, index) => {
              const [x, y] = position;
              return (
                <circle
                  cx={x}
                  cy={y}
                  r={25}
                  key={index}
                  fill={getRandomColor()}
                />
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Draw;
