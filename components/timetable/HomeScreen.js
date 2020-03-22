import React from "react";
import PropTypes from "prop-types";

import {
	IconButton,
	Card,
	Text,
	withTheme,
} from "react-native-paper";

import {
	View,
	StyleSheet,
	ScrollView
} from "react-native";
import { format } from "date-fns";

function sortTimes(t1, t2) {
	if (t1.getHours() > t2.getHours())
		return 1;
	if (t1.getHours() < t2.getHours())
		return -1;
	if (t1.getMinute() > t2.getMinute())
		return 1;
	if (t1.getMinute() < t2.getMinute())
		return -1;
	return 0;
}

function HomeScreen({ theme, timetable, subjects, navigation, days }) {
	return (<ScrollView>
		{timetable.map((day, dayIdx) => (
			<Card
				key={dayIdx}
				style={
					[
						style.card,
						{marginBottom: dayIdx === 6 ? 80 : 0 }
					]
				}
			>
				<Card.Title title={days[dayIdx]} />
				<Card.Content>
					{[...day].sort((i, j) => sortTimes(i.start, j.start)).map((cls, idx) => {
						const subject = subjects.find(i => i.id === cls.sub_id);
						return (<View key={idx} style={style.class}>
							<Text>{format(cls.start, "HH:mm")} to {format(cls.end, "HH:mm")}</Text>
							<Text>{subject.name}</Text>
							<Text>{cls.count}</Text>
						</View>);
					})}
				</Card.Content>
				<Card.Actions style={{justifyContent: "flex-end"}}>
					<IconButton
						onPress={() => navigation.navigate(`New Entry ${days[dayIdx]}`)}
						icon="plus"
						color={theme.colors.primary}
					/>
				</Card.Actions>
			</Card>
		))}
	</ScrollView>);
}

HomeScreen.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	navigation: PropTypes.object,
	days: PropTypes.array,
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
	},
	class: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
});

export default withTheme(HomeScreen);
