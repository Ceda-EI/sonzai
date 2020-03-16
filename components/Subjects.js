import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Button,
	Card,
	FAB,
} from "react-native-paper";

import {
	StyleSheet
} from "react-native";

import InputDialog from "./InputDialog";

export default function Subjects({ subjects, addSubject, removeSubject }) {
	const [ showDialog, setShowDialog ] = useState(false);
	function onInput(text) {
		addSubject(text);
		setShowDialog(false);
	}
	return (
		<>
			{subjects.map(subject => (
				<Card key={subject.id} style={style.card}>
					<Card.Title title={subject.name} />
					<Card.Actions>
						<Button onPress={() => removeSubject(subject.id)}>
							Remove
						</Button>
					</Card.Actions>
				</Card>
			))}
			<InputDialog
				visible={showDialog}
				onDismiss={() => setShowDialog(false)}
				title="Enter Name of New Subject"
				placeholder="Subject Name"
				label="Subject Name"
				onOK={onInput}
			/>
			<FAB
				large
				icon="plus"
				onPress={() => setShowDialog(true)}
				style={{
					position: "absolute",
					margin: 16,
					right: 0,
					bottom: 0,
				}}
			/>
		</>
	);
}

Subjects.propTypes = {
	subjects: PropTypes.array,
	addSubject: PropTypes.func,
	removeSubject: PropTypes.func,
};

const style = StyleSheet.create({
	card: {
		marginTop: 12,
	}
});
