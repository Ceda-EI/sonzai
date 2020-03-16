import React from "react";
import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import { DarkTheme, Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./configureStore";
const { store, persistor } = configureStore();

const theme = {
	...DarkTheme,
	mode: "exact",
	colors: {
		primary: "#ededed",
		accent: "#1a237e",
		backdrop: "rgba(0, 0, 0, 0.5)",
		background: "#000000",
		disabled: "rgba(255, 255, 255, 0.38)",
		error: "#CF6679",
		notification: "#ff80ab",
		onBackground: "#FFFFFF",
		onSurface: "#FFFFFF",
		placeholder: "rgba(255, 255, 255, 0.54)",
		surface: "#121212",
		text: "#ffffff"
	}
};

export default function Main() {
	return (
		<ReduxProvider store={store}>
			<PersistGate persistor={persistor}>
				<Provider theme={theme}>
					<App />
				</Provider>
			</PersistGate>
		</ReduxProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
