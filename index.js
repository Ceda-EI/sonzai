/**
 * @format
 */

import React from "react";
import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import { DarkTheme, Provider } from "react-native-paper";

const theme = {
	...DarkTheme,
	mode: "exact",
	colors: {
		...DarkTheme.colors,
		primary: "#e91e63",
		accent: "#3f51b5",
	}
};

export default function Main() {
	return (
		<Provider theme={theme}>
			<App />
		</Provider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
