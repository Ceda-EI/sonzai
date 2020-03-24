import { v4 } from "react-native-uuid";

export default function timetable(state, action) {
	if (typeof state === "undefined")
		// Array of days starting with Sunday
		return [
			[],
			[],
			[],
			[],
			[],
			[],
			[],
		];
	switch (action.type) {
	case "ADD_TIMETABLE_ENTRY":
		return [
			...(state.slice(0, action.day)),
			[...state[action.day], {
				...action.entry,
				id: v4()
			}],
			...(state.slice(action.day + 1))
		];
	case "REMOVE_TIMETABLE_ENTRY":
		return state.map(i => i.filter(j => j.id !== action.id));
	default:
		return state;
	}
}
