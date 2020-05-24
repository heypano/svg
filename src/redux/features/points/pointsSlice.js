import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const pointsSlice = createSlice({
  name: "points",
  initialState: [],
  reducers: {
    addPoint(state, action) {
      const { x, y, type } = action.payload;
      state.push({ x, y, type });
    }
  }
});

export const selectPoints = createSelector(
  state => state.points,
  points => points
);

export const { addPoint } = pointsSlice.actions;

export default pointsSlice.reducer;
