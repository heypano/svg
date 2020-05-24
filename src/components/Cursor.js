import React from "react";
import { connect } from "react-redux";
import {
  selectCursorPosition,
  setPosition
} from "../redux/features/cursor/cursorSlice";

class TrackMouse extends React.Component {
  componentDidMount() {
    document.onmousemove = this.onMouseMove.bind(this);
  }
  onMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    this.props.setPosition({ x, y });
  }

  render() {
    const { x, y } = this.props.cursor;
    return (
      <div
        style={{
          position: "fixed",
          transform: `translate(${x}px, ${y + 10}px)`
        }}
      >
        🐁
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cursor: selectCursorPosition(state)
});
const mapDispatchToProps = { setPosition };

export default connect(mapStateToProps, mapDispatchToProps)(TrackMouse);
