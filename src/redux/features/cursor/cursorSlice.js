import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const cursorSlice = createSlice({
  name: "cursor",
  initialState: {
    x: 0,
    y: 0
  },
  reducers: {
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
  state => state.cursor,
  cursor => ({
    x: cursor.x,
    y: cursor.y
  })
);

export const { setPosition, setPositionX, setPositionY } = cursorSlice.actions;

export default cursorSlice.reducer;
