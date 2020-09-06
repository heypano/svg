import { combineReducers } from "redux";
import cursor from "./features/cursor/cursorSlice";
import cat from "./features/catSlice";
import undoable from "redux-undo";

export default combineReducers({ cursor, cat: undoable(cat) });
