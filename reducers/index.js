import { combineReducers } from "redux";

import timetable from "./timetable";
import classes from "./classes";

const rootReducer = combineReducers({
	timetable,
	classes
});

export default rootReducer;
