import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { connect } from "react-redux";
import {
  selectCursorPosition,
  selectCustomPosition,
  setCustomPosition
} from "../redux/features/cursor/cursorSlice";
import Cursor from "./Cursor";
import { throttle } from "throttle-debounce";

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.svgRef = React.createRef();
    this.throttledSetPosition = throttle(
      30,
      true,
      this.props.setCustomPosition.bind(this)
    );
  }

  /**
   * Draw while moving
   * @param event
   */
  onMove(event) {
    const svg = this.svgRef.current;
    const [x, y] = getPointInSvgFromEvent(svg, event);
    this.throttledSetPosition({ x, y });
  }

  render() {
    return (
      <div className="svg-container">
        <svg
          onMouseMove={this.onMove}
          onTouchMove={this.onMove}
          id="Layer_1"
          ref={this.svgRef}
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
          style={
            {
              // enableBackground: "new 0 0 514.6 516.4;"
            }
          }
        >
          <clipPath id="cat">
            <path
              transform={`translate(${this.props.position.x - 75}, ${this.props
                .position.y - 75})`}
              d="M221.09526,70.09526c-6.5-19.83338-5.5-27.33338-4-40.66669s-7.03436-21.9527-16.66669-6.66669c-7.66669,12.16669-1.33331,31.83338,4.33331,50.33338s-1.33331,29.5-18.66662,40l1.61529,3.01239c-10.26355-12.34693-26.55664-19.68579-49.61529-10.01239l-1.20014.5426a46.53582,46.53582,0,0,0,1.20014-4.5426c1.83331-8.66669-6.33338-20-6.33338-20,16.66669-16.16669,14.16669-30.66669,10.33338-33s-25.16669-1-37.66669,13.66662l-.29529.37635a39.32857,39.32857,0,0,0-15.038-8.543,93.29723,93.29723,0,0,0-16.16669-2.66669c-5.25-14.75-21.16669-21-24.83331-19.83331S37.42857,53.67857,46.92857,63.42857l.37335.26673c-3.8479,5.19549-10.76086,15.76135-15.54,20.4-5.66662,5.5-15.581,18.54663-1.33331,33.66662,8.16669,8.66669,14.33331,9.66669,14.33331,9.66669l.28327.226-2.61658-.8927c-4,4-12.33331,13.5-11,36,1.3313,22.46607,10.97083,55.23432,10.99988,55.333-.30762-1.04242-6.35193,2.18549-6.94684,2.62689-8.16833,6.06024,2.04712,12.26319,8.12421,12.90711a24.96521,24.96521,0,0,0,12.47174-2.22925,6.46677,6.46677,0,0,0,2.64783-1.78528,6.82715,6.82715,0,0,0,1.04443-2.50519,84.48265,84.48265,0,0,0,2.60333-26.12683c5.98834,2.99982,13.59332,5.10388,23.40875,5.52936a34.6258,34.6258,0,0,0,3.64667,6.91693l-.33331,15.66669s-8.83338,2.16662-7.66669,7,6.33331,9.5,16,8,12.5-3.16669,12.66669-10a71.13016,71.13016,0,0,1,1.66662-15.33338c1.1576-4.56335,3.15082-8.75378,3.971-15.91156l.19574.41156c5.32117-1.09979,11.345-2.62878,17.80988-4.54467-.58942,6.31439,1.02325,15.0437,1.02343,15.04467-.06774-.38079-4.52954,2.13794-4.87286,2.41108-3.08618,2.45526-5.17517,6.97259-1.99567,10.34021a8.51365,8.51365,0,0,0,2.56531,1.76214,15.56146,15.56146,0,0,0,5.53876,1.47144c4.537.336,8.97-1.32282,13.13171-3.16065,5.77106-2.54846,5.96259-7.48285,7.75135-13.01806,1.672-5.174,3.82476-11.31653,2.54809-16.80616l.01831-.5288a57.65255,57.65255,0,0,0,11.315,14.5288s-.99389,8.94513-1.00048,8.99994c-.01142.09516-2.72809,1.55024-3.02649,1.82416-3.73774,3.431-.50635,7.62329,3.24456,9.21326,4.76435,2.01959,9.24451.28338,13.82276-1.10138,4.61352-1.39551,6.41437-4.50043,6.62634-9.26929.33331-7.5-2.16669-20.83331-1.66669-24s18.0116-34.281,9.66669-60.33331a31.47814,31.47814,0,0,0,18.5-13.66669C224.463,110.11625,227.59526,89.92857,221.09526,70.09526Z"
            />
          </clipPath>
          <g
            clipPath="url(#cat)"
            width="100%"
            height="100%"
            className="catgroup"
          >
            <image
              href={`//placekitten.com/${window.innerWidth}/${window.innerHeight}`}
            ></image>
          </g>
        </svg>
      </div>
    );
  }
}

const mapStateToProps = state => ({ position: selectCustomPosition(state) });
const mapDispatchToProps = { setCustomPosition };

export default connect(mapStateToProps, mapDispatchToProps)(Window);
