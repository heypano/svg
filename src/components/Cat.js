import Grid from "@material-ui/core/Grid";

import { getPointInSvgFromEvent } from "../util";
import React from "react";
import { connect } from "react-redux";
import { throttle } from "throttle-debounce";
import { CatPath, MaskPath } from "./cat/paths";
import { getCat, saveCat } from "../api/cat";
import CatPaintButton from "./cat/CatPaintButton";

import {
  addPoint,
  selectIsDrawing,
  selectPoints,
  setIsDrawing,
  setIsNotDrawing,
  setPoints,
  selectCurrentFillStyle,
  setPaths,
  selectPaths,
  addPath,
  removePath,
  addPointToPath,
} from "../redux/features/catSlice";
import { Button } from "@material-ui/core";
import { bindActionCreators } from "redux";

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
    const { catName } = this.props.match.params;
    // document.onmousemove = this.documentMouseMove.bind(this);
    if (catName) {
      getCat(catName).then((r) => {
        if (r.points) {
          this.props.setPoints(r.points);
        }
        if (r.paths) {
          this.props.setPaths(r.paths);
        }
      });
    }
  }

  save() {
    const { catName } = this.props.match.params;
    if (catName) {
      saveCat(catName, {
        points: this.props.points,
        paths: this.props.paths,
      })
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  /**
   * Draw while moving
   * @param event
   */
  drawMove(event) {
    if (this.props.isDrawing) {
      const svg = this.svgRef.current;
      const [x, y] = getPointInSvgFromEvent(svg, event);
      // this.drawPoint(x, y);
      this.drawPointInPath(x, y, "L");
    }
  }

  drawPoint(x, y) {
    const { addPoint, fill, fillStyle } = this.props;
    const point = {
      x,
      y,
    };

    if (Object.keys(fillStyle).length > 0) {
      point.fillStyle = fillStyle;
    } else {
      point.fill = fill;
    }

    addPoint(point);
  }

  drawPointInPath(x, y, type = "M") {
    const { addPointToPath } = this.props;
    addPointToPath(`${type} ${x} ${y} `);
  }
  addNewPath() {
    const { fillStyle } = this.props;
    this.props.addPath({ fillStyle });
  }

  mouseOrTouchDown(event) {
    const svg = this.svgRef.current;
    const [x, y] = getPointInSvgFromEvent(svg, event);
    this.props.setIsDrawing();
    this.addNewPath();
    // this.drawPoint(x, y);
    this.drawPointInPath(x, y);
  }
  mouseOrTouchUp(event) {
    this.props.setIsNotDrawing();
  }

  catStuff() {
    const { points, paths } = this.props;
    return (
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
        <g clipPath="url(#cat)" width="100%" height="100%" className="catgroup">
          {/*{points.map((point, index) => {*/}
          {/*  const size = 30;*/}
          {/*  const { x, y, fill, fillStyle = {} } = point;*/}
          {/*  return (*/}
          {/*    <circle*/}
          {/*      cx={x}*/}
          {/*      cy={y}*/}
          {/*      r={size}*/}
          {/*      key={index}*/}
          {/*      // fill="url(#GradientReflect)"*/}
          {/*      fill={fill || "transparent"}*/}
          {/*      style={fillStyle}*/}
          {/*    />*/}
          {/*    // <text*/}
          {/*    //   x={x - size / 2}*/}
          {/*    //   y={y + size / 2}*/}
          {/*    //   fontSize={`${size}px`}*/}
          {/*    //   key={index}*/}
          {/*    // >*/}
          {/*    //   😺*/}
          {/*    // </text>*/}
          {/*  );*/}
          {/*})}*/}
          {paths.map((path, index) => {
            const { fillStyle, d } = path;
            return (
              <path
                key={index}
                style={fillStyle}
                d={d}
                strokeWidth={30}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </g>
        <CatPath className="catOutline" />
      </svg>
    );
  }

  render() {
    const gridItemProps = {
      item: true,
      container: true,
      justify: "center",
      xs: 2,
      md: 12,
    };

    return (
      <Grid
        container
        justify="center"
        style={{
          height: window.innerHeight,
          width: window.innerWidth,
          overscrollBehavior: "none",
          overflow: "hidden",
        }}
      >
        <Grid
          item
          container
          justify="center"
          xs={2}
          md={12}
          style={{
            height: "10%",
            padding: "1em",
          }}
        >
          <Button color="primary" variant="contained" onClick={this.save}>
            Save
          </Button>
          {/*<input type="text" ref={this.nameInputRef} />*/}
        </Grid>
        <Grid
          item
          container
          xs={10}
          md={3}
          justify="space-around"
          alignItems="center"
        >
          <Grid {...gridItemProps}>
            <CatPaintButton
              fillStyle={{
                // fill: "#388E3C",
                fill: "transparent",
                stroke: "#388E3C",
                backgroundColor: "#388E3C",
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <CatPaintButton
              fillStyle={{
                // fill: "#FBC02D",
                fill: "transparent",
                stroke: "#FBC02D",
                backgroundColor: "#FBC02D",
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <CatPaintButton
              fillStyle={{
                // fill: "#d32f2f",
                fill: "transparent",
                stroke: "#d32f2f",
                backgroundColor: "#d32f2f",
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <CatPaintButton
              fillStyle={{
                // fill: "hsla(10, 0%, 50%, 30%)",
                fill: "transparent",
                stroke: "hsla(10, 0%, 50%, 30%)",
                backgroundColor: "hsla(10, 0%, 50%, 30%)",
                filter: "blur(60%)",
              }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <Button
              color="primary"
              variant="contained"
              fullWidth={true}
              onClick={() => {
                this.props.removePath();
              }}
            >
              Undo
            </Button>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            height: "90%",
            paddingBottom: "10px",
          }}
        >
          {this.catStuff()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  points: selectPoints(state),
  isDrawing: selectIsDrawing(state),
  fillStyle: selectCurrentFillStyle(state),
  paths: selectPaths(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(
      {
        addPoint,
        setPoints,
        setIsNotDrawing,
        setIsDrawing,
        setPaths,
        addPath,
        removePath,
        addPointToPath,
      },
      dispatch
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cat);
