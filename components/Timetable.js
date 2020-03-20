import React from "react";
import PropTypes from "prop-types";
import {
	Button,
	Card,
	Text
} from "react-native-paper";

import {
	View,
	StyleSheet
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ timetable, subjects, navigation, days }) {
	return (<>
		{timetable.map((day, dayIdx) => (
			<Card key={dayIdx} style={style.card}>
				<Card.Title title={days[dayIdx]} />
				<Card.Content>
					{day.map((cls, idx) => {
						const subject = subjects.find(i => i.id === cls.sub_id);
						return (<View key={idx} style={style.class}>
							<Text>{subject.name}</Text>
							<Text>{cls.start} to {cls.end}</Text>
							<Text>{cls.count}</Text>
						</View>);
					})}
				</Card.Content>
				<Card.Actions>
					<Button
						onPress={() => navigation.navigate(`New Entry ${days[dayIdx]}`)}
					>Add</Button>
				</Card.Actions>
			</Card>
		))}
	</>);
}

HomeScreen.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	navigation: PropTypes.object,
	days: PropTypes.array,
};

const Stack = createStackNavigator();

export default function Timetable({ timetable, subjects }) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return (
		<Stack.Navigator>
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
						<Text
							{...props}
						>{idx}</Text>
					)}
				</Stack.Screen>
			))}
		</Stack.Navigator>
	);
}

Timetable.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	addTimetableEntry: PropTypes.func,
	removeTimetableEntry: PropTypes.func,
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
	}
});
