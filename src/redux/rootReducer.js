import { combineReducers } from "redux";
import points from "./features/points/pointsSlice";
import cursor from "./features/cursor/cursorSlice";

export default combineReducers({ points, cursor });
