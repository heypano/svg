import { combineReducers } from "redux";
import cursor from "./features/cursor/cursorSlice";
import cat from "./features/catSlice";

export default combineReducers({ cursor, cat });
