import React from "react";
import { connect } from "react-redux";
import {
  selectCursorPosition,
  setPosition
} from "../redux/features/cursor/cursorSlice";
import { throttle } from "throttle-debounce";

class TrackMouse extends React.Component {
  constructor(props) {
    super(props);
    this.throttledSetPosition = throttle(25, this.props.setPosition.bind(this));
  }
  componentDidMount() {
    document.onmousemove = this.onMouseMove.bind(this);
  }
  onMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    this.throttledSetPosition({ x, y });
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
