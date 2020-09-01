import { getPointInSvgFromEvent } from "../util";
import React from "react";
import {
  addPoint,
  selectCurrentTool,
  selectIsDrawing,
  selectPoints,
  selectTools,
  selectToolStage,
  setIsDrawing,
  setIsNotDrawing,
  setNextToolStage
} from "../redux/features/cursor/cursorSlice";
import Cursor from "./Cursor";
import { connect } from "react-redux";

class Paths extends React.Component {
  constructor(props) {
    super(props);
    this.mouseOrTouchUp = this.mouseOrTouchUp.bind(this);
    this.mouseOrTouchDown = this.mouseOrTouchDown.bind(this);
    // this.drawPoint = throttle(25, this.drawPoint.bind(this));
    this.drawPoint = this.drawPoint.bind(this);
    this.drawMove = this.drawMove.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.saveSVG = this.saveSVG.bind(this);
    this.savePMG = this.savePMG.bind(this);
    this.svgRef = React.createRef();
  }

  getPathFromPoints() {
    let result = "";
    const filteredPoints = [...this.props.points];

    // Remove incomplete paths
    for (let i = filteredPoints.length - 1; i > 0; i--) {
      const point = filteredPoints[i];
      const { type, stage } = point;
      const { stages } = this.props.tools[type];
      if (stage < stages - 1) {
        filteredPoints.splice(i);
      }
      if (stage === stages - 1) {
        break;
      }
    }

    for (const point of filteredPoints) {
      const { x, y, type, stage } = point;
      const { toolName, noPoints } = this.props.tools[type];
      if (stage === 0) {
        if (noPoints) {
          result += `${toolName} `;
        } else {
          result += `${toolName} ${x} ${y}, `;
        }
      } else {
        result += `${x} ${y}, `;
      }
      // const { x: x2, y: y2, type: t2, stage: s2 } = points[i + 1];
      // result += `S ${x1} ${y1}, ${x2} ${y2} `;
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

  savePMG(e) {
    e.preventDefault();
    this.saveImage("png");
  }
  saveSVG(e) {
    e.preventDefault();
    this.saveImage("svg");
  }

  saveImage(format) {
    const name = "some-abstract-shit";
    const sizedSVG = this.getOuterHTML(format);
    const svgBlob = new Blob([sizedSVG], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    if (format === "png") {
      this.convertToPNG(svgUrl).then(href => {
        console.log(svgUrl, href, format, name);
        return this.downloadImg(href, format, name);
      });
    } else {
      this.downloadImg(svgUrl, format, name);
    }
  }

  getOuterHTML(format) {
    if (format !== "png") {
      return this.svgRef.current.outerHTML;
    } else {
      const svgCopy = this.svgRef.current.cloneNode(true);
      svgCopy.setAttributeNS(null, "width", `${window.innerWidth}px`);
      svgCopy.setAttributeNS(null, "height", `${window.innerHeight}px`);
      return svgCopy.outerHTML;
    }
  }

  convertToPNG(svgUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", ev => {
        console.log("www");
      });
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        const href = canvas.toDataURL("image/png");
        resolve(href);
      };
      img.src = svgUrl;
      console.log(svgUrl);
    });
  }

  downloadImg(href, format, name) {
    const downloadLink = document.createElement("a");
    downloadLink.download = `${name}.${format}`;
    downloadLink.href = href;
    document.body.appendChild(downloadLink);
    downloadLink.onclick = function(e) {
      setTimeout(() => {
        console.log("revoke");
        URL.revokeObjectURL(this.href);
      }, 1500);
    };
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  render() {
    return (
      <div className="svg-container">
        <div
          style={{
            position: "fixed"
          }}
        >
          <button onClick={this.savePMG} className="m-4">
            Save PNG
          </button>
          <button onClick={this.saveSVG} className="m-4">
            Save SVG
          </button>
        </div>
        <Cursor debug={true} />
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
          onMouseDown={this.mouseOrTouchDown}
          onTouchStart={this.mouseOrTouchDown}
          onMouseUp={this.mouseOrTouchUp}
          // onTouchEnd={this.mouseOrTouchUp}
          // onMouseMove={this.drawMove}
          // onTouchMove={this.drawMove}
          ref={this.svgRef}
        >
          <g width="100%" height="100%" ref={this.groupRef}>
            <path
              fillRule="evenodd"
              fill="hsla(150,50%,50%,50%)"
              stroke="black"
              strokeWidth={1}
              // d={`M 100 0 C 25 50, 25 100, 100 100 ${this.getPathFromPoints()}`}
              d={`${this.getPathFromPoints()}`}
            />
            {/*{this.props.points.map(({ x, y }, index) => {*/}
            {/*  // const color = index % 2 ? "red" : "green";*/}
            {/*  const color = "grey";*/}
            {/*  return <Mark x={x} y={y} r={5} fill={color} key={index} />;*/}
            {/*})}*/}
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
  setNextToolStage
};

export default connect(mapStateToProps, mapDispatchToProps)(Paths);
