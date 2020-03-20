import React from "react";
import PropTypes from "prop-types";
import {
	IconButton,
} from "react-native-paper";

function AddEntry({navigation}) {
	return (<>
		<IconButton icon="arrow-left" onPress={() => navigation.pop()}/>
	</>);
}

AddEntry.propTypes = {
	subjects: PropTypes.array,
	navigation: PropTypes.object,
};

export default AddEntry;
