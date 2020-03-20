export function addSubject(subject) {
	return {
		type: "ADD_SUBJECT",
		subject: subject
	};
}


export function removeSubject(id) {
	return {
		type: "REMOVE_SUBJECT",
		id: id
	};
}


export function setTheme(theme) {
	return {
		type: "SET_THEME",
		theme: theme,
	};
}


export function addTimetableEntry(day, entry) {
	return {
		type: "ADD_TIMETABLE_ENTRY",
		day,
		entry,
	};
}


export function removeTimetableEntry(id) {
	return {
		type: "REMOVE_TIMETABLE_ENTRY",
		id: id
	};
}
