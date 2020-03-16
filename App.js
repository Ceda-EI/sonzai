/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from "react";
import {
	Appbar,
	BottomNavigation,
	Text,
	Card,
} from "react-native-paper";

import SubjectsContainer from "./containers/SubjectsContainer";


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

const App = () => {
	const [ pane, setPane ] = useState({
		index: 0,
		routes: [
			{ key: "add", title: "Add Classes", icon: "pencil-plus" },
			{ key: "statistics", title: "Statistics", icon: "file-chart" },
			{ key: "timetable", title: "Time Table", icon: "calendar-clock" },
			{ key: "subjects", title: "Subjects", icon: "book-open" },
		],
	});
	const renderScene = BottomNavigation.SceneMap({
		add: Dummy,
		statistics: Dummy,
		timetable: Dummy,
		subjects: SubjectsContainer,
	});
	return (
		<>
			<Appbar.Header>
				<Appbar.Content
					title="Sonzai"
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
		</>
	);
};

export default App;
