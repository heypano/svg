import React from "react";
import "../svg.css";

const Test = props => {
  return (
    <div className="svg-container" style={{ backgroundColor: "transparent" }}>
      <svg width={300} height={200}>
        <g>
          <path d="M 100 0 C 25 50, 25 100, 100 100 S 250 150 100 200" />
        </g>
      </svg>
    </div>
  );
};

export const UsingS = () => (
  <svg width={300} height={300}>
    <g>
      <path d="M 10 255 C 50 300, 100 300, 150 225 S 275 160, 300 225 " />
    </g>
  </svg>
);

export const Markers = () => {
  const p = [
    [10, 160],
    [40, 300],
    [110, 0],
    [150, 160]
  ];
  return (
    <svg width={300} height={300}>
      <g>
        <path
          d={`M ${p[0][0]} ${p[0][1]} C ${p[1][0]} ${p[1][1]}, ${p[2][0]} ${p[2][1]}, ${p[3][0]} ${p[3][1]}`}
        />
        {p.map((point, index) => (
          <P key={`marker_${index}`} x={point[0]} y={point[1]} />
        ))}
        {p.map((point, index) => {
          const nextIndex = index + 1 >= p.length ? 0 : index + 1;
          const [x1, y1] = point;
          const [x2, y2] = p[nextIndex];
          return <L key={`marker_${index}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
};

export const P = ({ x, y }) => (
  <circle cx={x} cy={y} r={5} className="markerdot" />
);
export const L = ({ x1, y1, x2, y2 }) => (
  <line x1={x1} x2={x2} y1={y1} y2={y2} className="markerline" />
);

export const Path = () => (
  <svg height={300} width={300}>
    <g className="green">
      <path d="M 10 10 H 150 V 150 L 10 150 " />
    </g>
    <g className="hotpink">
      <path d="M 10 160 H 150 V 300 Z" />
    </g>
  </svg>
);

export const Star = () => (
  <svg viewBox="0 0 200 200">
    <polygon
      points="100,0 50,200 200,80 0,80 150,200"
      fillRule="evenodd"
      stroke="black"
      fill="hotpink"
      strokeWidth={1}
    ></polygon>
  </svg>
);

export const One = () => (
  <svg>
    <rect width="500" height="250" fill="forestgreen" x={10} />
    <rect width="250" height="100" fill="goldenrod" y={10} />
    <circle cx={50} cy={50} r={20} fill="magenta" />
    <circle
      cx={100}
      cy={150}
      r={30}
      stroke="black"
      fill="transparent"
      strokeWidth={5}
    />
    <line
      x1="20%"
      y1="10%"
      x2="100%"
      y2="100%"
      strokeWidth={1}
      stroke="black"
    />
    <polygon
      points="500,250 250,500 50,50 500,500 500,250"
      stroke="black"
      fill="hotpink"
      strokeWidth={1}
    ></polygon>
  </svg>
);

export default Test;
