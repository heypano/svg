import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const name = "cat";

const catSlice = createSlice({
  name: name,
  initialState: {
    isDrawing: false,
    currentTool: {},
    currentFill: "",
    toolStage: 0,
    points: [],
  },
  reducers: {
    setIsDrawing(state) {
      state.isDrawing = true;
    },
    setIsNotDrawing(state) {
      state.isDrawing = false;
    },
    setCurrentFill(state, { payload }) {
      state.currentFill = payload;
    },
    setCurrentTool(state, { payload }) {
      // const { stages, disabled } = state.tools[payload];
      state.currentTool = payload;
      state.toolStage = 0;
    },
    setNextToolStage(state, { payload }) {
      state.toolStage++;
    },
    setPoints(state, action) {
      state.points = action.payload;
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
export const selectCurrentFill = createSelector(
  (state) => state[name],
  (cursor) => cursor.currentFill
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

export const {
  setIsDrawing,
  setIsNotDrawing,
  setCurrentTool,
  setCurrentFill,
  setNextToolStage,
  setPoints,
  addPoint,
} = catSlice.actions;

export default catSlice.reducer;
