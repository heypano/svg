import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { connect } from "react-redux";
import {
  addPoint,
  selectPoints,
  setPoints
} from "../redux/features/cursor/cursorSlice";
import Cursor from "./Cursor";
import {
  selectIsDrawing,
  setIsDrawing,
  setIsNotDrawing
} from "../redux/features/cursor/cursorSlice";
import { debounce, throttle } from "throttle-debounce";
import { CatPath, MaskPath } from "./cat/paths";
import { getCat, saveCat } from "../api/cat";

class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOrTouchUp = this.mouseOrTouchUp.bind(this);
    this.mouseOrTouchDown = this.mouseOrTouchDown.bind(this);
    this.drawPoint = throttle(25, true, this.drawPoint.bind(this));
    this.drawMove = this.drawMove.bind(this);
    this.save = this.save.bind(this);
    this.svgRef = React.createRef();
    this.nameInputRef = React.createRef();
  }

  componentDidMount() {
    // document.onmousemove = this.documentMouseMove.bind(this);
    getCat().then(r => {
      this.props.setPoints(r.points);
    });
  }

  save() {
    saveCat(this.nameInputRef.current.value, {
      points: this.props.points
    })
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log(e);
      });
  }

  documentMouseMove(event) {
    const eyeBall = document.getElementById("rightEye");
    const pupil = document.getElementById("rightPupil");

    const eyeArea = eyeBall.getBoundingClientRect();
    const pupilArea = pupil.getBoundingClientRect();

    const R = eyeArea.width / 2;
    const r = pupilArea.width / 2;
    const centerX = eyeArea.left + R;
    const centerY = eyeArea.top + R;
    const x = event.clientX - centerX;
    const y = event.clientY - centerY;
    const theta = Math.atan2(y, x);
    const angle = (theta * 180) / Math.PI + 360;

    pupil.style.transform = `translateX(${R - r + "px"}) rotate(${angle +
      "deg"})`;
    pupil.style.transformOrigin = `${r + "px"} center`;
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
        <p>
          <a onClick={this.save}>Save</a>
          <input type="text" ref={this.nameInputRef} />
        </p>
        <Cursor debug={false} />
        <svg
          onMouseDown={this.mouseOrTouchDown}
          onTouchStart={this.mouseOrTouchDown}
          onMouseUp={this.mouseOrTouchUp}
          // onTouchEnd={this.mouseOrTouchUp}
          onMouseMove={this.drawMove}
          onTouchMove={this.drawMove}
          id="Layer_1"
          ref={this.svgRef}
          viewBox="0 0 202.53 230.74"
          style={
            {
              // enableBackground: "new 0 0 514.6 516.4;"
            }
          }
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
          <clipPath id="cat">
            <MaskPath />
          </clipPath>
          <g
            clipPath="url(#cat)"
            width="100%"
            height="100%"
            className="catgroup"
          >
            {this.props.points.map((position, index) => {
              const size = 50;
              const { x, y } = position;
              return (
                // <circle
                //   cx={x}
                //   cy={y}
                //   r={30}
                //   key={index}
                //   fill="url(#GradientReflect)"
                // />
                <text
                  x={x - size / 2}
                  y={y + size / 2}
                  fontSize={`${size}px`}
                  key={index}
                >
                  😺
                </text>
              );
            })}
          </g>
          <CatPath className="catOutline" />
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  points: selectPoints(state),
  isDrawing: selectIsDrawing(state)
});
const mapDispatchToProps = {
  addPoint,
  setPoints,
  setIsNotDrawing,
  setIsDrawing
};

export default connect(mapStateToProps, mapDispatchToProps)(Cat);
