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

