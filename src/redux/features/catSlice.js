import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const name = "cat";

const catSlice = createSlice({
  name: name,
  initialState: {
    isDrawing: false,
    currentTool: {},
    currentFillStyle: {
      fill: "transparent",
      stroke: "#FBC02D",
      backgroundColor: "#FBC02D",
    },
    toolStage: 0,
    points: [],
    paths: [],
  },
  reducers: {
    setIsDrawing(state) {
      state.isDrawing = true;
    },
    setIsNotDrawing(state) {
      state.isDrawing = false;
    },
    setCurrentFillStyle(state, { payload }) {
      state.currentFillStyle = payload;
    },
    setCurrentTool(state, { payload }) {
      // const { stages, disabled } = state.tools[payload];
      state.currentTool = payload;
      state.toolStage = 0;
    },
    setNextToolStage(state, { payload }) {
      state.toolStage++;
    },
    setPaths(state, { payload }) {
      state.paths = payload;
    },
    addPath(state, { payload }) {
      const { fillStyle } = payload;
      state.paths.push({
        fillStyle,
        d: "",
      });
    },
    addPointToPath(state, { payload }) {
      state.paths[state.paths.length - 1].d += payload;
    },
    setPoints(state, { payload }) {
      state.points = payload;
    },
    addPoint(state, action) {
      const point = action.payload;
      state.points.push(point);

      if (point.stages) {
        if (state.toolStage < point.stages - 1) {
          state.toolStage++;
        } else {
          state.toolStage = 0;
        }
      }
    },
  },
});

export const selectIsDrawing = createSelector(
  (state) => state[name],
  (cursor) => cursor.isDrawing
);
export const selectCurrentFillStyle = createSelector(
  (state) => state[name],
  (cursor) => cursor.currentFillStyle
);
export const selectCurrentTool = createSelector(
  (state) => state[name],
  (cursor) => cursor.currentTool
);
export const selectToolStage = createSelector(
  (state) => state[name],
  (cursor) => cursor.toolStage
);
export const selectPoints = createSelector(
  (state) => state[name],
  (cursor) => cursor.points
);
export const selectPaths = createSelector(
  (state) => state[name],
  (cursor) => cursor.paths
);

export const {
  setIsDrawing,
  setIsNotDrawing,
  setCurrentTool,
  setCurrentFillStyle,
  setNextToolStage,
  setPoints,
  addPoint,
  setPaths,
  addPath,
  addPointToPath,
} = catSlice.actions;

export default catSlice.reducer;
