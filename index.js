import React from "react";
import {AppRegistry} from "react-native";
import App from "./App";
import {name as appName} from "./app.json";
import { DarkTheme, Provider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./configureStore";
const { store, persistor } = configureStore();
console.log(store);
console.log(persistor);

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
