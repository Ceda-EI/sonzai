import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Appbar,
	BottomNavigation,
	Text,
	Card,
	Dialog,
	Portal,
	Button,
	Provider,
	RadioButton,
	TouchableRipple
} from "react-native-paper";

import { View, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import SubjectsContainer from "./containers/SubjectsContainer";
import TimetableContainer from "./containers/TimetableContainer";
import themes from "./themes";


function Dummy() {
	return (
		<Card>
			<Card.Title title="Card Title" />
			<Card.Content>
				<Text>Dummy</Text>
			</Card.Content>
		</Card>
	);
}

function ThemePicker({ onPress, selectionIdx }) {
	return (
		<>
			{themes.map((t, idx) => (
				<TouchableRipple
					onPress={() => onPress(t, idx)}
					key={idx}
				>
					<View style={styles.radio}>
						<RadioButton
							status={selectionIdx === idx ? "checked": "unchecked"}
							onPress={() => onPress(t, idx)}
						/>
						<Text>{t.name}</Text>
					</View>
				</TouchableRipple>
			))}
		</>
	);
}

ThemePicker.propTypes = {
	onPress: PropTypes.func,
	selectionIdx: PropTypes.number,
};

const App = ({ theme, setTheme }) => {
	const [ pane, setPane ] = useState({
		index: 0,
		routes: [
			{ key: "add", title: "Add Classes", icon: "pencil-plus" },
			{ key: "statistics", title: "Statistics", icon: "file-chart" },
			{ key: "timetable", title: "Timetable", icon: "timetable" },
			{ key: "subjects", title: "Subjects", icon: "book-open" },
		],
	});
	const [ showDialog, setShowDialog ] = useState(false);
	const [ newTheme, setNewTheme ] = useState(themes.findIndex(
		i => JSON.stringify(i.theme) === JSON.stringify(theme)
	));
	const renderScene = BottomNavigation.SceneMap({
		add: Dummy,
		statistics: Dummy,
		timetable: TimetableContainer,
		subjects: SubjectsContainer,
	});

	function dialogSelection(theme, idx) {
		setNewTheme(idx);
		setTheme(theme.theme);
	}
	return (
		<NavigationContainer theme={theme}>
			<StatusBar
				backgroundColor={
					theme.dark && theme.mode === "adaptive" ?
						theme.colors.surface :
						theme.colors.primary
				}
			/>
			<Provider theme={theme}>
				<Appbar.Header>
					<Appbar.Content
						title="Sonzai"
					/>
					<Appbar.Action
						icon="brush"
						onPress={() => setShowDialog(true)}
					/>
				</Appbar.Header>
				<BottomNavigation
					navigationState={pane}
					onIndexChange={(index) => setPane({
						index,
						routes: pane.routes
					})}
					renderScene={renderScene}
					shifting={true}
				/>
				<Portal>
					<Dialog
						visible={showDialog}
						onDismiss={() => setShowDialog(false)}>
						<Dialog.Title>Theme</Dialog.Title>
						<Dialog.Content>
							<ThemePicker
								onPress={dialogSelection}
								selectionIdx={newTheme}
							/>
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={() => setShowDialog(false)}>Close</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>
			</Provider>
		</NavigationContainer>
	);
};

App.propTypes = {
	theme: PropTypes.object,
	setTheme: PropTypes.func,
};

const styles = StyleSheet.create({
	radio: {
		flexDirection: "row",
		alignItems: "center",
		margin: 5
	}
});

export default App;
