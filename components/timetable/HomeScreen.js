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
					{day.map((cls, idx) => {
						const subject = subjects.find(i => i.id === cls.sub_id);
						return (<View key={idx} style={style.class}>
							<Text>{subject.name}</Text>
							<Text>{cls.start} to {cls.end}</Text>
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
