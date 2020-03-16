export default function timetable(state) {
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
	return state;
}
