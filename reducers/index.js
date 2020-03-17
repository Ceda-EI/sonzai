import { combineReducers } from "redux";

import timetable from "./timetable";
import classes from "./classes";
import subjects from "./subjects";
import theme from "./theme";

const rootReducer = combineReducers({
	timetable,
	classes,
	subjects,
	theme,
});

export default rootReducer;
