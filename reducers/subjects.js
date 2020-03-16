import { v4 } from "react-native-uuid";

export default function subjects(state, action) {
	if (typeof state === "undefined")
		return [];
	switch(action.type) {
	case "ADD_SUBJECT":
		return [ ...state, { name: action.subject, id: v4() } ];
	case "REMOVE_SUBJECT":
		return state.filter(item => item.id != action.id);
	default:
		return state;
	}
}
