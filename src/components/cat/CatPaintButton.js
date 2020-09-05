import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { setCurrentFill } from "../../redux/features/catSlice";

const CatPaintButton = ({ fill = "", style = {}, setCurrentFill, ...rest }) => (
  <Button
    style={{
      minHeight: "5vh",
      backgroundColor: fill,
      ...style,
    }}
    onClick={() => {
      setCurrentFill(fill);
    }}
    fullWidth={true}
    {...rest}
  >
    <Grid container justify="center" alignItems="center"></Grid>
  </Button>
);

const mapDispatchToProps = {
  setCurrentFill,
};

export default connect(null, mapDispatchToProps)(CatPaintButton);
