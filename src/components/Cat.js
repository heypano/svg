import { getPointInSvgFromEvent, getRandomColor } from "../util";
import React, { useEffect, useRef, useState } from "react";

const Cat = props => {
  const svg = useRef(null);
  // const [width, setWidth] = useState(window.innerWidth);
  // const [height, setHeight] = useState(window.innerHeight);
  // const padding = 10;

  useEffect(() => {
    // function handleResize() {
    //   setWidth(svg.current.width.baseVal.value - padding * 2);
    //   setHeight(svg.current.height.baseVal.value - padding * 2);
    // }
    // window.addEventListener("resize", handleResize);
    // setTimeout(handleResize, 0);
  });
  return (
    <>
      <div className="svg-container">
        {/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref={svg}>*/}
        {/*  */}
        {/*</svg>*/}
        <CatClip />
      </div>
    </>
  );
};

const CatPath = ({ className }) => (
  <path
    clipRule="evenodd"
    className={className}
    d="M54.2,141c-8.6,29.7-34.3,29.5-19.8,79.5c4.2,14.3,13,26.5,24.7,35.6c2.7,2.1,36.4,21.9,37.7,18.4
	    c-10.2,26.6-13.6,56.9-11.1,85.3c2.6,29.6-4.5,56.6-11.9,85.2c-0.9,3.5-1.7,7.5,0.2,10.5c1.4,2.3,4.1,3.6,6.6,4.5
	    c6.7,2.4,13.9,3.4,20.9,2.9c3.9-0.3,7.9-1,11-3.4c2.8-2.2,4.5-5.4,6.1-8.6c8-16.3,13.8-33.6,17.3-51.4c16.9-2.6,33.8-5.3,50.8-7.9
	    c0.7-0.1,1.4-0.2,2,0.1c0.9,0.5,1.2,1.7,1.3,2.7c3.2,24.1,7.2,48,10,72c14.8-0.2,29.6-4.7,41.8-13c-2.8-10.6-5.5-21.3-8.3-31.9
	    c-0.6-2.3-1.2-4.9,0-7c1-1.8,3.1-2.6,5.1-3.3c12.2-4.4,25-7.3,38-8.7c3.1,18.6,6.2,37.1,9.3,55.7c0.2,1.5,0.6,3.1,1.8,4
	    c1.3,0.9,3,0.8,4.6,0.5c9.3-1.4,18.5-2.7,27.8-4.1c1.4-0.2,2.8-0.4,3.8-1.4c1.1-1,1.4-2.7,1.6-4.2c1.8-15.1,0.5-30.6-3.8-45.2
	    c12.3-5,25.2-8.7,38.2-11c3.5,19,5.3,38.3,5.4,57.6c7.4-1.1,14.7-2.3,22.1-3.4c1.4-0.2,2.8-0.5,4-1.2c1.6-1.1,2.5-3,3.2-4.9
	    c6.8-18.6,5.8-38.8,1.9-57.9c-3-14.8-13.1-33.1-11.2-48.2c0.8-6.2,3-12.1,4.7-18.1c2.9-10.6,4.1-21.6,6.3-32.3
	    c3.4-16.3,9.3-32.1,13-48.3c4.2-18.3,5.4-37.2,5.5-56c0.1-13.7-0.5-27.7-4.5-40.8c-4-13.1-11.9-25.5-23.7-32.6
	    c-11.8-7.1-27.7-7.9-38.9,0.1c-9.9,7.1-14.7,19.6-16,31.7c-4.5,39.2,19.6,75.5,28.9,113.8c2.6,10.6,4,22,0.7,32.5
	    c-19.2-11.8-33.8-29.3-54-40c-20.4-10.8-43.3-17-66.4-17.4c2.3-22.6,11.9-43.9,13.9-66.9c1.9-22.3-0.3-45.5-10.6-65.7
	    c-16.4-32.4-52.6,50-52.6,50s-33.6-28.7-70.5-34.3c-3.5-0.5-19-51.9-19-51.9S66.1,99.6,54.2,141z
	    M163.9,175.7c-28.7-15.3-54.1,33.7-24.6,40.3C169.1,222.8,180.5,184.6,163.9,175.7z
	    M102.7,144c-22.3-9.4-48.5,21.3-29.9,35.8C91.5,194.4,122.1,152.2,102.7,144z"
  />
);

class CatClip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rectangles: []
    };
    this.groupRef = React.createRef();
    this.svgRef = React.createRef();
    this.onSvgClick = this.onSvgClick.bind(this);
  }
  componentDidMount() {}

  onSvgClick(event) {
    const svg = this.svgRef.current;
    const [x, y] = getPointInSvgFromEvent(svg, event);
    this.setState({
      ...this.state,
      rectangles: [...this.state.rectangles, { x, y }]
    });
    console.log(this.state.rectangles);
  }
  render() {
    return (
      <svg
        onClick={this.onSvgClick}
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        ref={this.svgRef}
        x="0px"
        y="0px"
        viewBox="0 0 514.6 516.4"
        style={
          {
            // enableBackground: "new 0 0 514.6 516.4;"
          }
        }
      >
        <clipPath id="cat">
          <CatPath />
        </clipPath>
        <g clipPath="url(#cat)" width="100%" height="100%" ref={this.groupRef}>
          {this.state.rectangles.map((position, index) => {
            const { x, y } = position;
            return (
              <rect
                x={x}
                y={y}
                width="100"
                height="100"
                key={index}
                fill="red"
              />
            );
          })}
          <CatPath className="catOutline" />
        </g>
      </svg>
    );
  }
}

export default Cat;
