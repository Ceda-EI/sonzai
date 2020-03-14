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
			{ key: "update", title: "Update", icon: "plus-circle" },
			{ key: "statistics", title: "Statistics", icon: "file-chart" },
			{ key: "timetable", title: "Time Table", icon: "calendar-clock" },
		],
	});
	const renderScene = BottomNavigation.SceneMap({
		update: Dummy,
		statistics: Dummy,
		timetable: Dummy,
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
