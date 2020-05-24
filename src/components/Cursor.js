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
  setCurrentToolName,
  selectTools
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
  }
  onMouseMove(event) {
    const { clientX: x, clientY: y } = event;
    this.throttledSetPosition({ x, y });
  }
  onWheel(event) {
    const { deltaY } = event;
    let nextToolIndex;

    if (deltaY > 0) {
      // Previous tool
      if (this.props.currentTool > 1) {
        nextToolIndex = this.props.currentTool - 1;
      } else {
        nextToolIndex = this.props.tools.length - 1;
      }
    } else {
      // Next tool
      if (this.props.currentTool < this.props.tools.length - 1) {
        nextToolIndex = this.props.currentTool + 1;
      } else {
        nextToolIndex = 0;
      }
    }
    this.props.setCurrentTool(nextToolIndex);
    this.props.setCurrentToolName(this.props.tools[nextToolIndex].toolName);
  }

  render() {
    const { x, y } = this.props.cursor;
    return (
      <div
        style={{
          position: "fixed",
          transform: `translate(${x}px, ${y + 10}px)`,
          fontSize: "8rem"
        }}
      >
        {this.props.toolName}
      </div>
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
  setCurrentToolName
};

export default connect(mapStateToProps, mapDispatchToProps)(Cursor);
