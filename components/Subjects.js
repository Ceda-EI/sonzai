import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	IconButton,
	Card,
	FAB,
	Portal,
	Text,
	withTheme
} from "react-native-paper";

import {
	ScrollView,
	StyleSheet
} from "react-native";

import InputDialog from "./InputDialog";

function Subjects({ theme, subjects, addSubject, removeSubject }) {
	const [ showDialog, setShowDialog ] = useState(false);
	function onInput(text) {
		addSubject(text);
		setShowDialog(false);
	}
	return (
		<Portal.Host><ScrollView>
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
							onPress={() => removeSubject(subject.id)}
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
					style={{
						position: "absolute",
						margin: 16,
						right: 0,
						bottom: 0,
					}}
				/>
			</Portal>
		</ScrollView></Portal.Host>
	);
}

Subjects.propTypes = {
	subjects: PropTypes.array,
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
