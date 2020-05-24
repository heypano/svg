import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const name = "cursor";

const cursorSlice = createSlice({
  name: name,
  initialState: {
    x: 0,
    y: 0,
    isDrawing: false
  },
  reducers: {
    setIsDrawing(state) {
      state.isDrawing = true;
    },
    setIsNotDrawing(state) {
      state.isDrawing = false;
    },
    setPosition(state, action) {
      const { x, y } = action.payload;
      state.x = x;
      state.y = y;
    },
    setPositionX(state, action) {
      const x = action.payload;
      state.x = x;
    },
    setPositionY(state, action) {
      const y = action.payload;
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

export const {
  setPosition,
  setPositionX,
  setPositionY,
  setIsNotDrawing,
  setIsDrawing
} = cursorSlice.actions;

export default cursorSlice.reducer;
