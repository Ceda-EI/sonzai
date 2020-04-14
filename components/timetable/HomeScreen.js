import React, { useState } from "react";
import PropTypes from "prop-types";

import {
	Button,
	Card,
	DataTable,
	Dialog,
	FAB,
	Portal,
	Modal,
} from "react-native-paper";

import {
	StyleSheet,
	ScrollView
} from "react-native";
import { format } from "date-fns";

import BottomSheet from "reanimated-bottom-sheet";

function sortTimes(t1, t2) {
	if (t1.getHours() > t2.getHours())
		return 1;
	if (t1.getHours() < t2.getHours())
		return -1;
	if (t1.getMinutes() > t2.getMinutes())
		return 1;
	if (t1.getMinutes() < t2.getMinutes())
		return -1;
	return 0;
}

function HomeScreen({ days, navigation, removeTimetableEntry, subjects, timetable }) {
	const [ dialog, setDialog ] = useState({ show: false, id: null });
	const [ currentBottomSheet, setCurrentBottomSheet ] = useState(null);

	this.bs = React.createRef();
	const openBottomSheet = () => {this.bs.current.snapTo(0);this.bs.current.snapTo(0);};
	const closeBottomSheet = () => {this.bs.current.snapTo(2);this.bs.current.snapTo(2);};

	function CardContents() {
		if (!currentBottomSheet) {
			return <></>;
		}
		const subject = subjects.find(i => i.id === currentBottomSheet.sub_id);
		return (
			<Card>
				<Card.Title title={subject.name} />
				<Card.Content style={style.bottomNavigation}>
					<Button mode="contained">Change Subject</Button>
					<Button mode="contained">Change Start Time</Button>
					<Button mode="contained">Change End Time</Button>
					<Button mode="contained" onPress={() => {
						closeBottomSheet();
						setDialog({ show: true, id: currentBottomSheet.name });
					}}>Remove</Button>
				</Card.Content>
			</Card>
		);
	}
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
									onPress={() => {
										setCurrentBottomSheet(cls);
										openBottomSheet();
									}}
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
			<FAB
				visible={currentBottomSheet == null}
				large
				icon="plus"
				onPress={() => navigation.navigate("New Entry")}
				style={{
					position: "absolute",
					margin: 16,
					right: 0,
					bottom: 0,
				}}
			/>
			<Modal
				visible={currentBottomSheet != null}
				onDismiss={closeBottomSheet}
				dismissable={false}
			>
			</Modal>
			<BottomSheet
				ref={this.bs}
				snapPoints={[300, 150, 0]}
				initialSnap={1}
				renderContent={CardContents}
				enabledInnerScrolling={false}
				onCloseStart={() => setCurrentBottomSheet(null)}
				onCloseEnd={() => {}}
			/>
		</Portal>
	</ScrollView></Portal.Host>);
}

HomeScreen.propTypes = {
	timetable: PropTypes.array,
	subjects: PropTypes.array,
	navigation: PropTypes.object,
	days: PropTypes.array,
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
	bottomNavigation: {
		height: 250,
		flexDirection: "column",
		justifyContent: "space-evenly",
	},
});

export default HomeScreen;
