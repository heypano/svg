import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setCurrentFillStyle } from "../../redux/features/catSlice";

const CatPaintButton = ({
  fill = "",
  fillStyle = {},
  setCurrentFillStyle,
  ...rest
}) => {
  const styleObj = {
    minHeight: "5vh",
    backgroundColor: fill,
    ...fillStyle,
  };

  return (
    <Button
      style={styleObj}
      onClick={() => {
        setCurrentFillStyle(fillStyle);
      }}
      fullWidth={true}
      {...rest}
    >
      <Grid container justify="center" alignItems="center"></Grid>
    </Button>
  );
};

const mapDispatchToProps = {
  setCurrentFillStyle,
};

export default connect(null, mapDispatchToProps)(CatPaintButton);
