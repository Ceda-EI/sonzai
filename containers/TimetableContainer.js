import { connect } from "react-redux";
import Timetable from "../components/Timetable";
import { addTimetableEntry, removeTimetableEntry } from "../actions";

const mapStateToProps = state => {
	return {
		subjects: state.subjects,
		timetable: state.timetable,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addTimetableEntry: (day, entry) => dispatch(addTimetableEntry(day, entry)),
		removeTimetableEntry: id => dispatch(removeTimetableEntry(id))
	};
};

const TimetableContainer = connect(mapStateToProps, mapDispatchToProps)(Timetable);

export default TimetableContainer;
