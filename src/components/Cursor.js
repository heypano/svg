import React from "react";
import { connect } from "react-redux";
import {
  selectCursorPosition,
  selectToolStage,
  selectCurrentTool,
  selectToolName,
  setPosition,
  setCurrentTool,
  setNextToolStage,
  selectTools,
  setPreviousTool,
  setNextTool
} from "../redux/features/cursor/cursorSlice";
import { throttle } from "throttle-debounce";

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.throttledSetPosition = throttle(25, this.props.setPosition.bind(this));
  }
  componentDidMount() {
    document.onmousemove = this.onMouseMove.bind(this);
    document.onwheel = this.onWheel.bind(this);
    document.onMouseDown = this.onMouseDown.bind(this);
  }
  onMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    this.throttledSetPosition({ x, y });
  }
  onMouseDown(event) {
    if (event.which === 2) {
      this.onMiddleClick(event);
    }
  }
  onMiddleClick(event) {}
  onWheel(event) {
    // Do not mess with non zero tool stages
    if (this.props.toolStage == 0) {
      const { deltaY } = event;

      if (deltaY > 0) {
        this.props.setPreviousTool();
      } else {
        this.props.setNextTool();
      }
    }
  }

  render() {
    const { x, y } = this.props.cursor;
    return (
      <>
        {this.props.debug && (
          <div
            style={{
              position: "fixed",
              transform: `translate(${x}px, ${y + 10}px)`,
              fontSize: "8rem"
            }}
          >
            {this.props.toolName}
            <span style={{ fontSize: "3rem" }}>{this.props.toolStage}</span>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  cursor: selectCursorPosition(state),
  currentTool: selectCurrentTool(state),
  toolStage: selectToolStage(state),
  toolName: selectToolName(state),
  tools: selectTools(state)
});
const mapDispatchToProps = {
  setPosition,
  setCurrentTool,
  setNextToolStage,
  setPreviousTool,
  setNextTool
};

export default connect(mapStateToProps, mapDispatchToProps)(Cursor);
