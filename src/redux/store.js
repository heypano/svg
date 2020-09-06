import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./rootReducer";
import cursor from "./features/cursorSlice";
import cat from "./features/catSlice";

const store = configureStore({
  reducer: {
    cursor: cursor,
    cat: cat,
  },
});

export default store;
