import { connect } from "react-redux";
import App from "./App";
import { setTheme } from "./actions";

const mapStateToProps = state => {
	return {
		theme: state.theme,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setTheme: theme => dispatch(setTheme(theme))
	};
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
