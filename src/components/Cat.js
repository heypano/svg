import { getPointInSvgFromEvent } from "../util";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { addPoint, selectPoints } from "../redux/features/points/pointsSlice";
import Cursor from "./Cursor";
import {
  selectIsDrawing,
  setIsDrawing,
  setIsNotDrawing
} from "../redux/features/cursor/cursorSlice";
import { throttle } from "throttle-debounce";

const MaskPath = ({ className }) => (
  <path
    d="M221.09526,70.09526c-6.5-19.83338-5.5-27.33338-4-40.66669s-7.03436-21.9527-16.66669-6.66669c-7.66669,12.16669-1.33331,31.83338,4.33331,50.33338s-1.33331,29.5-18.66662,40l1.61529,3.01239c-10.26355-12.34693-26.55664-19.68579-49.61529-10.01239l-1.20014.5426a46.53582,46.53582,0,0,0,1.20014-4.5426c1.83331-8.66669-6.33338-20-6.33338-20,16.66669-16.16669,14.16669-30.66669,10.33338-33s-25.16669-1-37.66669,13.66662l-.29529.37635a39.32857,39.32857,0,0,0-15.038-8.543,93.29723,93.29723,0,0,0-16.16669-2.66669c-5.25-14.75-21.16669-21-24.83331-19.83331S37.42857,53.67857,46.92857,63.42857l.37335.26673c-3.8479,5.19549-10.76086,15.76135-15.54,20.4-5.66662,5.5-15.581,18.54663-1.33331,33.66662,8.16669,8.66669,14.33331,9.66669,14.33331,9.66669l.28327.226-2.61658-.8927c-4,4-12.33331,13.5-11,36,1.3313,22.46607,10.97083,55.23432,10.99988,55.333-.30762-1.04242-6.35193,2.18549-6.94684,2.62689-8.16833,6.06024,2.04712,12.26319,8.12421,12.90711a24.96521,24.96521,0,0,0,12.47174-2.22925,6.46677,6.46677,0,0,0,2.64783-1.78528,6.82715,6.82715,0,0,0,1.04443-2.50519,84.48265,84.48265,0,0,0,2.60333-26.12683c5.98834,2.99982,13.59332,5.10388,23.40875,5.52936a34.6258,34.6258,0,0,0,3.64667,6.91693l-.33331,15.66669s-8.83338,2.16662-7.66669,7,6.33331,9.5,16,8,12.5-3.16669,12.66669-10a71.13016,71.13016,0,0,1,1.66662-15.33338c1.1576-4.56335,3.15082-8.75378,3.971-15.91156l.19574.41156c5.32117-1.09979,11.345-2.62878,17.80988-4.54467-.58942,6.31439,1.02325,15.0437,1.02343,15.04467-.06774-.38079-4.52954,2.13794-4.87286,2.41108-3.08618,2.45526-5.17517,6.97259-1.99567,10.34021a8.51365,8.51365,0,0,0,2.56531,1.76214,15.56146,15.56146,0,0,0,5.53876,1.47144c4.537.336,8.97-1.32282,13.13171-3.16065,5.77106-2.54846,5.96259-7.48285,7.75135-13.01806,1.672-5.174,3.82476-11.31653,2.54809-16.80616l.01831-.5288a57.65255,57.65255,0,0,0,11.315,14.5288s-.99389,8.94513-1.00048,8.99994c-.01142.09516-2.72809,1.55024-3.02649,1.82416-3.73774,3.431-.50635,7.62329,3.24456,9.21326,4.76435,2.01959,9.24451.28338,13.82276-1.10138,4.61352-1.39551,6.41437-4.50043,6.62634-9.26929.33331-7.5-2.16669-20.83331-1.66669-24s18.0116-34.281,9.66669-60.33331a31.47814,31.47814,0,0,0,18.5-13.66669C224.463,110.11625,227.59526,89.92857,221.09526,70.09526Z"
    transform="translate(-22.5943 -14.13802)"
  />
);

const CatPath = ({ className }) => (
  <>
    <path
      className="catPath"
      d="M46.93,63.43c-9.5-9.75-2.5-30.17,1.17-31.33s19.58,5.08,24.83,19.83"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M68.26,52.6a58.58,58.58,0,0,1,20.84,2,39.06,39.06,0,0,1,17.33,10.83"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M104.43,62.76c12.5-14.66,33.83-16,37.67-13.66s6.33,16.83-10.34,33c0,0,8.17,11.33,6.34,20-3.73,17.62-15,23.33-15,23.33"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M49.1,61.43c-3,3.33-11.67,17.17-17.34,22.67s-15.58,18.54-1.33,33.66c8.17,8.67,14.33,9.67,14.33,9.67"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M218.1,15.43"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M42.43,126.76c-4,4-12.33,13.5-11,36s11,55.24,11,55.33c-.31-1-6.35,2.19-7,2.63-8.17,6.06,2.05,12.26,8.13,12.91a25,25,0,0,0,12.47-2.23,6.47,6.47,0,0,0,2.65-1.79,6.91,6.91,0,0,0,1-2.5,84.5,84.5,0,0,0,2.6-26.21"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M115.93,203.26a271.25,271.25,0,0,0,40.67-12.33"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M38.76,174.1c5.46,9.21,12.94,31.06,47.3,32.43"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M78.76,178.43c.17,9.5,6.17,29,10.67,35L89.1,229.1s-8.84,2.16-7.67,7,6.33,9.5,16,8,12.5-3.17,12.67-10a70.74,70.74,0,0,1,1.66-15.34c1.44-5.66,4.17-10.75,4.34-21.66.15-10.33-3-14-3-14"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M153.76,179.43c-.66,6.67,7.67,23.17,17,31.33,0,0-1,9-1,9s-2.73,1.55-3,1.83c-3.73,3.43-.5,7.62,3.25,9.21,4.76,2,9.24.28,13.82-1.1s6.42-4.5,6.63-9.27c.33-7.5-2.17-20.83-1.67-24s18-34.28,9.67-60.33c-6.83-21.34-26.17-44.34-60.33-30"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M186.1,113.1c17.33-10.5,24.33-21.5,18.66-40s-12-38.17-4.33-50.34c9.63-15.28,18.17-6.66,16.67,6.67s-2.5,20.83,4,40.67,3.36,40-4.17,52.33a31.47,31.47,0,0,1-18.5,13.67"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M133.76,198.43c-.66,6.33,1,15.33,1,15.33-.07-.38-4.53,2.14-4.87,2.41-3.09,2.46-5.18,7-2,10.34a8.61,8.61,0,0,0,2.57,1.77,15.86,15.86,0,0,0,5.54,1.47c4.53.33,9-1.33,13.13-3.16,5.77-2.55,6-7.49,7.75-13,1.67-5.18,3.83-11.32,2.55-16.81"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M41.39,232.74a4,4,0,0,1,1.28-3.82,8,8,0,0,1,3.78-1.76"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M35.16,229.94a4.61,4.61,0,0,1,4-6.48"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M135.8,229.49a4.29,4.29,0,0,1,4.12-6.25"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M174.43,230.93a3.13,3.13,0,0,1,2.23-5.52"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M166.89,227.91a5.25,5.25,0,0,1,4.79-5.52"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M128.1,225.91a5.46,5.46,0,0,1,5.08-5.72"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M89.52,242.89c-1-.69-.65-2.4.36-3.09a5.72,5.72,0,0,1,3.55-.59"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M83.77,239.89a3.68,3.68,0,0,1,4.6-4.79"
      transform="translate(-22.59 -14.14)"
    />
    <path
      d="M71.17,92.54A24,24,0,0,1,67,93.92a2.7,2.7,0,0,1-2.1.07A2.66,2.66,0,0,1,64,93c-.56-.84-2.76-3.14-2.6-4.16a1.91,1.91,0,0,1,3-1.16,6.12,6.12,0,0,1,1.92,2.06,6.21,6.21,0,0,1,5.45-1.16,2.14,2.14,0,0,1,1,.51,1.72,1.72,0,0,1,.06,2A4,4,0,0,1,71.17,92.54Z"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M59.44,99.42a12,12,0,0,0,2.34,2.27,41.5,41.5,0,0,1,3.09-3,6.51,6.51,0,0,0,4.79,5.07"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M52.43,135.93l.53,4a19.89,19.89,0,0,0-5.79-3.07A46.72,46.72,0,0,0,50,148.67"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M80.68,82.72A13.52,13.52,0,0,1,90.21,78c3.65-.06,7.4,2,8.7,5.46"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M78.33,88.63A9.5,9.5,0,0,0,82.82,94a13.48,13.48,0,0,0,6.63,1.36,10.19,10.19,0,0,0,6.28-1.88"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M64.84,77.68a8.73,8.73,0,0,0-7.66-8.56"
      transform="translate(-22.59 -14.14)"
    />
    <path
      className="catPath"
      d="M46.62,77.16a7.78,7.78,0,0,0,10.54,9.49"
      transform="translate(-22.59 -14.14)"
    />
    <path
      d="M94.79,78.83a18.34,18.34,0,0,0-4.48-.67c-.35.06-.7.14-1,.23,1.24,1.32.68,4.1-1.66,4.1a2.29,2.29,0,0,1-2.29-2.67l-.19.09a5.26,5.26,0,0,1-2.05.55,14,14,0,0,0-.14,2c0,5.15,2.76,9.33,6.17,9.33s6.16-4.18,6.16-9.33A13.8,13.8,0,0,0,94.79,78.83Z"
      transform="translate(-22.59 -14.14)"
    />
    <path
      d="M64.78,75.12v0a2.18,2.18,0,0,1-2.17,1.55c-3.06,0-3.08-4.7-.07-4.77l-.46-.48-.1-.1c-.26-.16-.52-.33-.78-.48l-.26-.07a5,5,0,0,1-2.26-1.41,11.62,11.62,0,0,0-3.11,2.24c-3.09,3.08-4,7.2-2,9.18s6.1,1.1,9.18-2a11.4,11.4,0,0,0,2.31-3.27A2.66,2.66,0,0,1,64.78,75.12Z"
      className="leftEye"
      transform="translate(-22.59 -14.14)"
    />
  </>
);

class Cat extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOrTouchUp = this.mouseOrTouchUp.bind(this);
    this.mouseOrTouchDown = this.mouseOrTouchDown.bind(this);
    this.drawPoint = throttle(25, this.drawPoint.bind(this));
    this.drawMove = this.drawMove.bind(this);
    this.svgRef = React.createRef();
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
            <CatPath className="catOutline" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Cat);
