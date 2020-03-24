import React, { useState } from "react";
import PropTypes from "prop-types";

import {
	Button,
	IconButton,
	Card,
	DataTable,
	Dialog,
	Portal,
	withTheme,
} from "react-native-paper";

import {
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

function HomeScreen({ days, navigation, removeTimetableEntry, subjects, theme, timetable }) {
	const [ dialog, setDialog ] = useState({ show: false, id: null });
	return (<Portal.Host><ScrollView>
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
					<DataTable>
						<DataTable.Header>
							<DataTable.Title
								style={{ flexGrow: 2 }}
							>
								Course
							</DataTable.Title>
							<DataTable.Title
								style={{ flexGrow: 1 }}
							>
								From
							</DataTable.Title>
							<DataTable.Title
								style={{ flexGrow: 1 }}
							>
								To
							</DataTable.Title>
							<DataTable.Title
								style={{ flexGrow: 1 }}
							>
								Count
							</DataTable.Title>
						</DataTable.Header>
						{[...day].sort((i, j) => sortTimes(i.start, j.start)).map((cls, idx) => {
							const subject = subjects.find(i => i.id === cls.sub_id);
							return (
								<DataTable.Row
									key={idx}
									onPress={() => setDialog({ show: true, id: cls.id })}
								>
									<DataTable.Cell
										style={{ flexGrow: 2 }}
									>
										{subject.name}
									</DataTable.Cell>
									<DataTable.Cell
										style={{ flexGrow: 1 }}
									>
										{format(cls.start, "HH:mm")}
									</DataTable.Cell>
									<DataTable.Cell
										style={{ flexGrow: 1 }}
									>
										{format(cls.end, "HH:mm")}
									</DataTable.Cell>
									<DataTable.Cell
										style={{ flexGrow: 1 }}
									>
										{cls.count}
									</DataTable.Cell>
								</DataTable.Row>
							);
						})}
					</DataTable>
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
		<Portal>
			<Dialog
				visible={dialog.show}
				onDismiss={() => setDialog({ show: false, id: null })}>
				<Dialog.Title>Remove Entry?</Dialog.Title>
				<Dialog.Actions>
					<Button onPress={() => setDialog({ show: false, id: null })}>Cancel</Button>
					<Button
						onPress={() => {
							setDialog({ show: false, id: null });
							removeTimetableEntry(dialog.id);
						}}
					>
						Remove
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	</ScrollView></Portal.Host>);
}

HomeScreen.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	navigation: PropTypes.object,
	days: PropTypes.array,
	theme: PropTypes.object,
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
	},
});

export default withTheme(HomeScreen);
