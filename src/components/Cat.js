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
      d="M87.59524,78.09524c-4.32932-.382-2.91667,8.91666,1,7.5s6.18164-.7308,4.84082-3.15707S90.42857,78.34524,87.59524,78.09524Z"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M46.92857,63.42857c-9.5-9.75-2.5-30.16667,1.16667-31.33333s19.58333,5.08333,24.83333,19.83333"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M68.2619,52.59524a58.63039,58.63039,0,0,1,20.83334,2,39.11108,39.11108,0,0,1,17.33333,10.83333"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M104.42857,62.7619c12.5-14.66666,33.83333-16,37.66667-13.66666s6.33333,16.83333-10.33334,33c0,0,8.16667,11.33333,6.33334,20-3.72733,17.6201-15,23.33333-15,23.33333"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M49.09524,61.42857c-3,3.33333-11.66667,17.16667-17.33334,22.66667s-15.581,18.54667-1.33333,33.66666c8.16667,8.66667,14.33333,9.66667,14.33333,9.66667"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M218.09524,15.42857"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M42.42857,126.7619c-4,4-12.33333,13.5-11,36,1.33132,22.46606,10.97085,55.23429,10.99988,55.33293-.30764-1.04242-6.35194,2.18551-6.94686,2.62689-8.16832,6.06023,2.04717,12.2632,8.12425,12.90711a24.96545,24.96545,0,0,0,12.47171-2.22927,6.46711,6.46711,0,0,0,2.64785-1.78524,6.82805,6.82805,0,0,0,1.04444-2.5052,84.48232,84.48232,0,0,0,2.60032-26.20555"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M115.92857,203.2619a271.24425,271.24425,0,0,0,40.66667-12.33333"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M38.7619,174.09524c5.45807,9.21049,12.93321,31.06643,47.30216,32.43411"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M78.7619,178.42857c.16667,9.5,6.16667,29,10.66667,35l-.33333,15.66667s-8.83334,2.16666-7.66667,7,6.33333,9.5,16,8,12.5-3.16667,12.66667-10a71.13218,71.13218,0,0,1,1.66666-15.33334c1.43751-5.66666,4.16667-10.75,4.33334-21.66666.1577-10.32944-3-14-3-14"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M153.7619,179.42857c-.66666,6.66667,7.66667,23.16667,17,31.33333,0,0-.99389,8.9451-1.00048,8.99993-.01144.09516-2.72808,1.5502-3.02653,1.82416-3.73771,3.431-.50635,7.62326,3.2446,9.21327,4.76432,2.01954,9.24447.28339,13.82272-1.10141,4.61354-1.39548,6.41441-4.50041,6.62636-9.26928.33333-7.5-2.16667-20.83333-1.66667-24s18.01156-34.281,9.66667-60.33333c-6.83333-21.33334-26.16667-44.33334-60.33333-30"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M186.09524,113.09524c17.33333-10.5,24.33333-21.5,18.66666-40s-12-38.16667-4.33333-50.33334c9.6323-15.286,18.16667-6.66666,16.66667,6.66667s-2.5,20.83333,4,40.66667,3.36775,40.021-4.16667,52.33333a31.47822,31.47822,0,0,1-18.5,13.66667"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M133.7619,198.42857c-.66662,6.333.99982,15.33232,1,15.33334-.06775-.3808-4.52957,2.13792-4.87289,2.411-3.08615,2.45524-5.17515,6.9726-1.99567,10.34023a8.515,8.515,0,0,0,2.56535,1.7621,15.56036,15.56036,0,0,0,5.53872,1.47144c4.537.33605,8.97-1.32279,13.13174-3.16063,5.771-2.54849,5.96257-7.48287,7.75133-13.01806,1.672-5.174,3.82474-11.31655,2.54809-16.80614"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M41.386,232.73745a3.99706,3.99706,0,0,1,1.28346-3.81291,7.855,7.855,0,0,1,3.78437-1.76159"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M35.157,229.9381a4.61883,4.61883,0,0,1,4.02271-6.48306"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M135.80087,229.49435a4.29961,4.29961,0,0,1,4.12364-6.258"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M174.4282,230.929a3.13637,3.13637,0,0,1,2.2352-5.52374"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M166.89253,227.90774a5.24376,5.24376,0,0,1,4.78415-5.52051"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M128.09971,225.91258a5.45009,5.45009,0,0,1,5.07926-5.718"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M89.52335,242.891c-1.00808-.68914-.64924-2.40126.35932-3.08969a5.72127,5.72127,0,0,1,3.54588-.59551"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M83.77289,239.89322a3.68438,3.68438,0,0,1,4.59952-4.79363"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      d="M71.1738,92.54472a24.89813,24.89813,0,0,1-4.18688,1.38021,2.05387,2.05387,0,0,1-2.97091-.88072c-.55958-.83976-2.75774-3.14214-2.60015-4.16108a1.91805,1.91805,0,0,1,2.9516-1.164,6.05359,6.05359,0,0,1,1.92038,2.06533,6.19755,6.19755,0,0,1,5.4558-1.16146,2.071,2.071,0,0,1,.98266.5087,1.70022,1.70022,0,0,1,.0596,2.009A4.01676,4.01676,0,0,1,71.1738,92.54472Z"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M59.4375,99.42145a12.00168,12.00168,0,0,0,2.34383,2.26664,39.59762,39.59762,0,0,1,3.088-2.99032,6.526,6.526,0,0,0,4.7879,5.07288"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M52.42857,135.92859l.53187,4.04617a19.86079,19.86079,0,0,0-5.793-3.07481,46.40022,46.40022,0,0,0,2.78735,11.76835"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M80.68488,82.71714a13.515,13.515,0,0,1,9.52906-4.7085c3.64412-.05558,7.39146,2.05633,8.69386,5.46023"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M78.3283,88.63019a9.53287,9.53287,0,0,0,4.4913,5.37258,13.3843,13.3843,0,0,0,6.62857,1.35362,10.14059,10.14059,0,0,0,6.27831-1.87705"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M64.84443,77.677a8.7399,8.7399,0,0,0-7.66039-8.558"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      className="catPath"
      d="M46.61957,77.15978A7.78157,7.78157,0,0,0,57.16426,86.646"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      d="M94.7863,78.83287a18.39366,18.39366,0,0,0-4.47571-.67523c-.35272.06573-.701.14715-1.04877.23065,1.23493,1.32019.68109,4.09845-1.66656,4.09845a2.28613,2.28613,0,0,1-2.28809-2.66236c-.06256.03144-.12585.05591-.18835.0882a5.18916,5.18916,0,0,1-2.04962.545,13.99811,13.99811,0,0,0-.14063,1.971c0,5.15466,2.76093,9.33331,6.16669,9.33331s6.16662-4.17865,6.16662-9.33331A13.54347,13.54347,0,0,0,94.7863,78.83287Z"
      transform="translate(-22.59429 -14.13801)"
    />
    <path
      d="M64.77788,75.11882l-.00849-.014a2.17865,2.17865,0,0,1-2.17413,1.54852c-3.05945,0-3.07379-4.70538-.06531-4.77649-.15509-.15618-.30786-.31463-.46222-.47412-.04651-.048-.06726-.07281-.09692-.10571-.2627-.15662-.51984-.32544-.78394-.48108-.05981-.01233-.13782-.03155-.25415-.066a5.014,5.014,0,0,1-2.26416-1.40887,11.47861,11.47861,0,0,0-3.10864,2.23511c-3.08807,3.08813-3.98114,7.2019-1.99457,9.18841s6.10028,1.09357,9.18842-1.99457a11.38485,11.38485,0,0,0,2.30389-3.26556A4.36569,4.36569,0,0,1,64.77788,75.11882Z"
      transform="translate(-22.59429 -14.13801)"
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
                <text x={x - size / 2} y={y + size / 2} fontSize={`${size}px`}>
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
const mapDispatchToProps = { addPoint, setIsNotDrawing, setIsDrawing };

export default connect(mapStateToProps, mapDispatchToProps)(Cat);
