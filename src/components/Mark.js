import React from "react";

export const Mark = ({ x, y, fill = "red", r = 2 }) => {
  return <circle cx={x} cy={y} r={r} fill={fill} />;
};

export default Mark;
