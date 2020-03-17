import themes from "../themes";
export default function theme(state, action) {
	if (typeof state === "undefined")
		return themes[0].theme;
	if (action.type === "SET_THEME") {
		return action.theme;
	}
	return state;
}
