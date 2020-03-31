import { connect } from "react-redux";
import Subjects from "../components/Subjects";
import { addSubject, removeSubject } from "../actions";

const mapStateToProps = state => {
	return {
		subjects: state.subjects,
		timetable: state.timetable,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addSubject: subject => dispatch(addSubject(subject)),
		removeSubject: id => dispatch(removeSubject(id))
	};
};

const SubjectsContainer = connect(mapStateToProps, mapDispatchToProps)(Subjects);

export default SubjectsContainer;
