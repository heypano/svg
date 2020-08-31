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
  setNextTool,
  selectPoints
} from "../redux/features/cursor/cursorSlice";
import { debounce, throttle } from "throttle-debounce";
import msgpack from "msgpack5";

class Cursor extends React.Component {
  constructor(props) {
    super(props);
    this.throttledSetPosition = throttle(
      25,
      true,
      this.props.setPosition.bind(this)
    );
    this.throttledSetPreviousTool = debounce(
      50,
      true,
      this.props.setPreviousTool.bind(this)
    );
    this.throttledSetNextTool = debounce(
      50,
      true,
      this.props.setNextTool.bind(this)
    );
    this.save = this.save.bind(this);
    this.msgpack = msgpack();
    window.msgpack = this.msgpack;
  }

  save() {
    const a = window.msgpack.encode(this.props.points);
    const b = window.msgpack.decode(a);
    console.log(
      this.props.points,
      a.toString("base64").length,
      a.toString("hex").length,
      b
    );
  }

  componentDidMount() {
    document.onmousemove = this.onMouseMove.bind(this);
    document.onwheel = this.onWheel.bind(this);
    document.onmousedown = this.onMouseDown.bind(this);
    document.onkeyup = this.onKeyUp.bind(this);
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
  onKeyUp(event) {
    switch (event.which) {
      case 37:
        this.throttledSetPreviousTool();
        break;
      case 39:
        this.throttledSetNextTool();
        break;
    }
  }
  onWheel(event) {
    // Do not mess with non zero tool stages
    if (this.props.toolStage == 0) {
      const { deltaY } = event;

      if (deltaY > 0) {
        this.throttledSetPreviousTool();
      } else {
        this.throttledSetNextTool();
      }
    }
  }

  render() {
    const { x, y } = this.props.cursor;
    return (
      <>
        <a onClick={this.save}>Save</a>
        {this.props.debug && (
          <div
            style={{
              position: "fixed",
              transform: `translate(${x}px, ${y + 10}px)`,
              fontSize: "8rem",
              userSelect: "none"
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
  tools: selectTools(state),
  points: selectPoints(state)
});
const mapDispatchToProps = {
  setPosition,
  setCurrentTool,
  setNextToolStage,
  setPreviousTool,
  setNextTool
};

export default connect(mapStateToProps, mapDispatchToProps)(Cursor);
