import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  setCurrentFill,
  setCurrentFillStyle,
} from "../../redux/features/catSlice";

const CatPaintButton = ({
  fill = "",
  complexStyle = {},
  setCurrentFill,
  setCurrentFillStyle,
  ...rest
}) => {
  const styleObj = {
    minHeight: "5vh",
    backgroundColor: fill,
    ...complexStyle,
  };

  return (
    <Button
      style={styleObj}
      onClick={() => {
        if (Object.keys(complexStyle).length > 0) {
          setCurrentFillStyle(complexStyle);
        } else {
          setCurrentFill(fill);
        }
      }}
      fullWidth={true}
      {...rest}
    >
      <Grid container justify="center" alignItems="center"></Grid>
    </Button>
  );
};

const mapDispatchToProps = {
  setCurrentFill,
  setCurrentFillStyle,
};

export default connect(null, mapDispatchToProps)(CatPaintButton);
