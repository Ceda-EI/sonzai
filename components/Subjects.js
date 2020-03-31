import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	IconButton,
	Card,
	FAB,
	Portal,
	Snackbar,
	Text,
	withTheme
} from "react-native-paper";

import {
	ScrollView,
	StyleSheet
} from "react-native";

import InputDialog from "./InputDialog";

function Subjects({ theme, subjects, timetable, addSubject, removeSubject }) {
	const [ showDialog, setShowDialog ] = useState(false);
	const [ snackbar, setSnackbar ] = useState(false);
	function onInput(text) {
		addSubject(text);
		setShowDialog(false);
	}
	function deleteSubject(id) {
		if (timetable.reduce((acc, val) => acc.concat(val), []).filter(i => i.sub_id === id).length){
			setSnackbar(true);
			setTimeout(() => setSnackbar(false), 2000);
			return;
		}
		removeSubject(id);
	}
	return (
		<Portal.Host><ScrollView style={{ backgroundColor: theme.colors.background }}>
			{subjects.length === 0 ?
				<Text style={style.text}>
					No Subjects added. Press + to add a subject.
				</Text>
				: null
			}
			{subjects.map((subject, idx) => (
				<Card
					key={subject.id}
					style={
						[
							style.card,
							{marginBottom: idx === subjects.length - 1 ? 80 : 0 }
						]
					}
				>
					<Card.Title title={subject.name} />
					<Card.Actions style={{justifyContent: "flex-end"}}>
						<IconButton
							onPress={() => deleteSubject(subject.id)}
							icon="delete"
							color={theme.colors.primary}
						/>
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
			<Portal>
				<FAB
					large
					icon="plus"
					onPress={() => setShowDialog(true)}
					visible={!snackbar}
					style={{
						position: "absolute",
						margin: 16,
						right: 0,
						bottom: 0,
					}}
				/>
				<Snackbar
					visible={snackbar}
					onDismiss={() => setSnackbar(false)}
					action={{
						label: "Dismiss",
						onPress: () => setSnackbar(false),
					}}
				>
					Subject is in use in TimeTable.
				</Snackbar>
			</Portal>
		</ScrollView></Portal.Host>
	);
}

Subjects.propTypes = {
	subjects: PropTypes.array,
	timetable: PropTypes.array,
	addSubject: PropTypes.func,
	removeSubject: PropTypes.func,
	theme: PropTypes.object,
};

const style = StyleSheet.create({
	card: {
		marginTop: 12,
		marginLeft: 10,
		marginRight: 10,
	},
	text: {
		marginTop: 12,
		textAlign: "center",
	}
});

export default withTheme(Subjects);
