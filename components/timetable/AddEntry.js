import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Card,
	FAB,
	IconButton,
	List,
	Menu,
	Portal,
	Snackbar,
	TextInput,
	ToggleButton,
} from "react-native-paper";
import {
	StyleSheet,
	View
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

function AddEntry({addTimetableEntry, days, subjects, navigation }) {
	const [ subject, setSubject ] = useState({ id: null, name: null });
	const [ showSubjectMenu, setShowSubjectMenu ] = useState(false);
	const [ showTimePicker, setShowTimePicker ] = useState(false);
	// Set to true if date time picker should set start or not
	const [ mode, setMode ] = useState("start");
	const [ start, setStart ] = useState(null);
	const [ end, setEnd ] = useState(null);
	const [ count, setCount ] = useState(0);
	const [ snackbar, setSnackbar ] = useState({ visible: false, message: "" });
	const [ dayStates, setDayStates ] = useState([ true, false, false, false, false, false, false ]);
	function parseCount(text) {
		const num = parseInt(text);
		if (isNaN(num))
			setCount(0);
		else
			setCount(num);
	}

	function onChange(_, selectedDate) {
		setShowTimePicker(false);
		if (selectedDate) {
			switch (mode) {
			case "start":
				setStart(selectedDate);
				return;
			case "end":
				setEnd(selectedDate);
				return;
			}
		}
	}

	function submit() {
		let message = "";
		if (subject.id === null)
			message = "Missing Subject";
		else if (start === null)
			message =  "Missing start time.";
		else if (end === null)
			message =  "Missing end time.";
		else if (count === 0)
			message =  "Missing count.";
		if (! dayStates.filter(i => i).length)
			message = "No day selected.";

		if (message !== "") {
			setSnackbar({visible: true, message: message});
			setTimeout(() => setSnackbar({ visible: false, message: null }), 2000);
			return;
		}


		dayStates.forEach((i, idx) => {
			if (i) {
				addTimetableEntry(idx, {
					sub_id: subject.id,
					count,
					start,
					end
				});
			}
		});
		navigation.pop();
	}

	const defTime = (mode == "start" ? start : end) || (new Date);
	return (<>
		<IconButton icon="arrow-left" onPress={() => navigation.pop()}/>
		<Card style={style.card}>
			<Card.Title title="Add Class" />
			<Card.Content>
				<List.Section>
					<Menu
						visible={showSubjectMenu}
						onDismiss={() => setShowSubjectMenu(false)}
						anchor={
							<List.Item
								title="Subject"
								description={subject.name}
								onPress={() => setShowSubjectMenu(true)}
								right={props => <List.Icon {...props} icon="chevron-down" />}
							/>
						}
					>
						{subjects.map(subject => (
							<Menu.Item
								title={subject.name}
								description={subject.id}
								onPress={() => {
									setSubject(subject);
									setShowSubjectMenu(false);
								}}
								key={subject.id}
							/>
						))}
					</Menu>
					<List.Item
						title="Start"
						description={start && format(start, "HH:mm")}
						onPress={() => {
							setShowTimePicker(true);
							setMode("start");
						}}
					/>
					<List.Item
						title="End"
						description={end && format(end, "HH:mm")}
						onPress={() => {
							setShowTimePicker(true);
							setMode("end");
						}}
					/>
					<TextInput
						keyboardType="numeric"
						label="Count"
						placeholder="How Many Classes does this count for?"
						mode="outlined"
						value={count === 0 ? "" : count.toString()}
						onChangeText={parseCount}
					/>
					<View
						style={style.daysContainer}
					>
						{dayStates.map( (i, idx) => (
							<ToggleButton
								key={idx}
								icon={`alpha-${days[idx][0].toLowerCase()}`}
								status={i ? "checked": "unchecked"}
								onPress={
									() =>
										setDayStates([
											...dayStates.slice(0, idx),
											!i,
											...dayStates.slice(idx + 1)
										])
								}
							/>
						)
						)}
					</View>
				</List.Section>
			</Card.Content>
		</Card>
		<Portal>
			<FAB
				visible={!snackbar.visible}
				large
				icon="check"
				onPress={submit}
				style={{
					position: "absolute",
					margin: 16,
					right: 0,
					bottom: 0,
				}}
			/>
		</Portal>
		{showTimePicker && (
			<DateTimePicker
				testID="dateTimePicker"
				timeZoneOffsetInMinutes={0}
				value={defTime}
				mode="time"
				is24Hour={true}
				display="default"
				onChange={onChange}
			/>
		)}
		<Snackbar
			visible={snackbar.visible}
			onDismiss={() => setSnackbar({ ...snackbar, visible: false })}
			action={{
				label: "Dismiss",
				onPress: () => setSnackbar({ ...snackbar, visible: false }),
			}}
		>
			{snackbar.message}
		</Snackbar>
	</>);
}

AddEntry.propTypes = {
	addTimetableEntry: PropTypes.func,
	subjects: PropTypes.array,
	days: PropTypes.array,
	navigation: PropTypes.object,
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
	},
	class: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	daysContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 10
	},
});

export default AddEntry;
