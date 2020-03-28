import React, { useState } from "react";
import Color from "color";
import PropTypes from "prop-types";
import {
	Appbar,
	Text,
	Card,
	Dialog,
	Portal,
	Button,
	Provider,
	RadioButton,
	TouchableRipple,
	overlay,
} from "react-native-paper";

import { View, StatusBar, StyleSheet, Text as RNText } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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

	function renderLabel({ route, focused, color }) {
		return <RNText style={{color: focused ? color : backgroundColor}}>{route.title}</RNText>;
	}

	renderLabel.propTypes = {
		route: PropTypes.object,
		focused: PropTypes.bool,
		color: PropTypes.string,
	};

	function renderIcon({ route, color }) {
		return (
			<View>
				<Icon name={route.icon} color={color} size={20}/>
			</View>
		);
	}

	renderIcon.propTypes = renderLabel.propTypes;

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
	const renderScene = SceneMap({
		add: Dummy,
		statistics: Dummy,
		timetable: TimetableContainer,
		subjects: SubjectsContainer,
	});

	const backgroundColor = theme.dark && theme.mode === "adaptive" ?
		overlay(4, theme.colors.surface):
		theme.colors.primary;

	const activeColor = Color(backgroundColor).isLight() ? "#000" : "#FFF";
	const inactiveColor = Color(backgroundColor).isLight() ? "#222" : "#AAA";
	function dialogSelection(theme, idx) {
		setNewTheme(idx);
		setTheme(theme.theme);
	}
	return (
		<NavigationContainer theme={theme}>
			<StatusBar
				backgroundColor={backgroundColor}
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
				<TabView
					navigationState={pane}
					onIndexChange={(index) => setPane({
						index,
						routes: pane.routes
					})}
					renderScene={renderScene}
					shifting={true}
					tabBarPosition="bottom"
					renderTabBar={props => (
						<TabBar
							{...props}
							style={{
								backgroundColor: backgroundColor,
							}}
							activeColor={activeColor}
							inactiveColor={inactiveColor}
							renderLabel={renderLabel}
							renderIcon={renderIcon}
							renderIndicator={() => null}
						/>)
					}
					sceneContainerStyle={{
						backgroundColor: theme.colors.background
					}}
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
