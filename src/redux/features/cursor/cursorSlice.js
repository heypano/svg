import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const name = "cursor";
const tools = [
  {
    stages: 1,
    toolName: "M",
    disabled: false,
    disallowDupes: true
  },
  {
    stages: 3,
    toolName: "C"
  },
  {
    stages: 1,
    toolName: "L"
  },
  {
    stages: 1,
    toolName: "Z",
    noPoints: true
  },
  // {
  //   stages: 1,
  //   toolName: "H"
  // },
  // {
  //   stages: 1,
  //   toolName: "V"
  // },
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
  }
  // {
  //   stages: 2,
  //   toolName: "A"
  // }
];

const nextTool = state => {
  let nextToolIndex = state.currentTool;
  do {
    if (nextToolIndex < state.tools.length - 1) {
      nextToolIndex++;
    } else {
      nextToolIndex = 0;
    }
  } while (state.tools[nextToolIndex].disabled);
  state.currentTool = nextToolIndex;
};
const previousTool = state => {
  let nextToolIndex = state.currentTool;
  do {
    if (nextToolIndex > 0) {
      nextToolIndex--;
    } else {
      nextToolIndex = state.tools.length - 1;
    }
  } while (state.tools[nextToolIndex].disabled);
  state.currentTool = nextToolIndex;
};

const cursorSlice = createSlice({
  name: name,
  initialState: {
    x: 0,
    y: 0,
    isDrawing: false,
    currentTool: 0,
    toolStage: 0,
    tools: tools,
    points: []
  },
  reducers: {
    setIsDrawing(state) {
      state.isDrawing = true;
    },
    setCurrentTool(state, { payload }) {
      const { stages, disabled } = state.tools[payload];
      state.currentTool = payload;
      state.toolStage = 0;
    },
    setNextTool: nextTool,
    setPreviousTool: previousTool,
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
    },
    addPoint(state, action) {
      const { type } = action.payload;
      const { currentTool } = state;
      const { stages, disallowDupes } = state.tools[type];
      // const { x, y, type, stage } = action.payload;
      // state.push({ x, y, type, stage });
      state.points.push(action.payload);
      if (state.toolStage < stages - 1) {
        state.toolStage++;
      } else {
        state.toolStage = 0;
      }
      if (disallowDupes) {
        state.tools[currentTool].disabled = true;
        nextTool(state);
      }

      // Re-enable all the other tools
      for (const tool of Object.keys(state.tools)) {
        if (tool != currentTool) {
          state.tools[tool].disabled = false;
        }
      }
    }
  }
});

export const selectPoints = createSelector(
  state => state[name],
  cursor => cursor.points
);
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
  cursor => cursor.tools[cursor.currentTool].toolName
);
export const selectTools = createSelector(
  state => state[name],
  cursor => cursor.tools
);

export const {
  setPosition,
  setPositionX,
  setPositionY,
  addPoint,
  setCurrentTool,
  setNextToolStage,
  setPreviousTool,
  setNextTool,
  setIsNotDrawing,
  setIsDrawing
} = cursorSlice.actions;

export default cursorSlice.reducer;
