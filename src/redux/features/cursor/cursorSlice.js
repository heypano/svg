import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const name = "cursor";

const cursorSlice = createSlice({
  name: name,
  initialState: {
    x: 0,
    y: 0,
    isDrawing: false,
    currentTool: 0,
    toolStage: 0,
    toolName: "",
    tools: [
      {
        stages: 2,
        toolName: "M"
      },
      {
        stages: 2,
        toolName: "L"
      },
      {
        stages: 1,
        toolName: "H"
      },
      {
        stages: 1,
        toolName: "V"
      },
      {
        stages: 3,
        toolName: "C"
      },
      {
        stages: 2,
        toolName: "S"
      },
      {
        stages: 2,
        toolName: "Q"
      },
      {
        stages: 1,
        toolName: "T"
      },
      {
        stages: 2,
        toolName: "A"
      }
    ]
  },
  reducers: {
    setIsDrawing(state) {
      state.isDrawing = true;
    },
    setCurrentTool(state, { payload }) {
      state.currentTool = payload;
      state.toolStage = 0;
    },
    setCurrentToolName(state, { payload }) {
      state.toolName = payload;
    },
    setNextToolStage(state, { payload }) {
      state.toolStage++;
    },
    setIsNotDrawing(state) {
      state.isDrawing = false;
    },
    setPosition(state, { payload }) {
      const { x, y } = payload;
      state.x = x;
      state.y = y;
    },
    setPositionX(state, { payload }) {
      const x = payload;
      state.x = x;
    },
    setPositionY(state, { payload }) {
      const y = payload;
      state.y = y;
    }
  }
});

export const selectCursorPosition = createSelector(
  state => state[name],
  cursor => ({
    x: cursor.x,
    y: cursor.y
  })
);

export const selectIsDrawing = createSelector(
  state => state[name],
  cursor => cursor.isDrawing
);
export const selectCurrentTool = createSelector(
  state => state[name],
  cursor => cursor.currentTool
);
export const selectToolStage = createSelector(
  state => state[name],
  cursor => cursor.toolStage
);
export const selectToolName = createSelector(
  state => state[name],
  cursor => cursor.toolName
);
export const selectTools = createSelector(
  state => state[name],
  cursor => cursor.tools
);

export const {
  setPosition,
  setPositionX,
  setPositionY,
  setCurrentTool,
  setNextToolStage,
  setCurrentToolName,
  setIsNotDrawing,
  setIsDrawing
} = cursorSlice.actions;

export default cursorSlice.reducer;
