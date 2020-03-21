import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	IconButton,
	Card,
	FAB,
	List,
	Menu,
	Portal,
	Snackbar,
	TextInput,
} from "react-native-paper";
import {StyleSheet} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

function AddEntry({addTimetableEntry, days, day, subjects, navigation }) {
	const [ subject, setSubject ] = useState({ id: null, name: null });
	const [ showSubjectMenu, setShowSubjectMenu ] = useState(false);
	const [ showTimePicker, setShowTimePicker ] = useState(false);
	// Set to true if date time picker should set start or not
	const [ mode, setMode ] = useState("start");
	const [ start, setStart ] = useState(null);
	const [ end, setEnd ] = useState(null);
	const [ count, setCount ] = useState(0);
	const [ snackbar, setSnackbar ] = useState({ visible: false, message: "" });
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
		if (subject.id === null) {
			setSnackbar({ visible: true, message: "Missing subject." });
			return;
		} else if (start === null) {
			setSnackbar({ visible: true, message: "Missing start time." });
			return;
		} else if (end === null) {
			setSnackbar({ visible: true, message: "Missing end time." });
			return;
		} else if (count === 0) {
			setSnackbar({ visible: true, message: "Missing count." });
			return;
		}
		addTimetableEntry(day, {
			sub_id: subject.id,
			count,
			start,
			end
		});
		navigation.pop();
	}

	const defTime = (mode == "start" ? start : end) || (new Date);
	return (<>
		<IconButton icon="arrow-left" onPress={() => navigation.pop()}/>
		<Card style={style.card}>
			<Card.Title title={`Add Class on ${days[day]}`} />
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
	navigation: PropTypes.object,
	days: PropTypes.array,
	day: PropTypes.number,
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
});

export default AddEntry;
