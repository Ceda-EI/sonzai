import React from "react";
import PropTypes from "prop-types";
import {
	Portal,
	Text,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./timetable/HomeScreen";
import AddEntry from "./timetable/AddEntry";

const Stack = createStackNavigator();

export default function Timetable({ addTimetableEntry, removeTimetableEntry, timetable, subjects }) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	if (subjects.length === 0) {
		return (
			<Text
				style={{
					textAlign: "center",
					marginTop: 12,
				}}
			>
				No Subjects added. Add Subjects first.
			</Text>);
	}
	return (
		<Portal.Host><Stack.Navigator headerMode="none">
			<Stack.Screen name="Timetable">
				{(props) => (
					<HomeScreen
						{...props}
						timetable={timetable}
						subjects={subjects}
						days={days}
						removeTimetableEntry={removeTimetableEntry}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="New Entry">
				{(props) => (
					<AddEntry
						{...props}
						subjects={subjects}
						days={days}
						addTimetableEntry={addTimetableEntry}
					/>
				)}
			</Stack.Screen>
		</Stack.Navigator></Portal.Host>
	);
}

Timetable.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	addTimetableEntry: PropTypes.func,
	removeTimetableEntry: PropTypes.func,
};
