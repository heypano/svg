import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
import cursor from "./features/cursor/cursorSlice";
import cat from "./features/catSlice";
import undoable from "redux-undo";

const store = configureStore({
  reducer: {
    cursor: cursor,
    cat: undoable(cat),
  },
});

export default store;
