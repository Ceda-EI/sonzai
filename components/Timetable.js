import React from "react";
import PropTypes from "prop-types";
import {
	Portal,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./timetable/HomeScreen";
import AddEntry from "./timetable/AddEntry";

const Stack = createStackNavigator();

export default function Timetable({ addTimetableEntry, timetable, subjects }) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return (
		<Portal.Host><Stack.Navigator headerMode="none">
			<Stack.Screen name="Timetable">
				{(props) => (
					<HomeScreen
						{...props}
						timetable={timetable}
						subjects={subjects}
						days={days}
					/>
				)}
			</Stack.Screen>
			{days.map((day, idx) => (
				<Stack.Screen name={`New Entry ${day}`} key={idx}>
					{(props) => (
						<AddEntry
							{...props}
							subjects={subjects}
							day={idx}
							days={days}
							addTimetableEntry={addTimetableEntry}
						/>
					)}
				</Stack.Screen>
			))}
		</Stack.Navigator></Portal.Host>
	);
}

Timetable.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	addTimetableEntry: PropTypes.func,
	removeTimetableEntry: PropTypes.func,
};
