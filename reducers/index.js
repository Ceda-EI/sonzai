import { combineReducers } from "redux";

import timetable from "./timetable";
import classes from "./classes";
import subjects from "./subjects";

const rootReducer = combineReducers({
	timetable,
	classes,
	subjects,
});

export default rootReducer;
