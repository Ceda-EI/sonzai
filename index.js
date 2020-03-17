import React from "react";
import {AppRegistry} from "react-native";
import AppContainer from "./AppContainer";
import {name as appName} from "./app.json";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./configureStore";
const { store, persistor } = configureStore();

export default function Main() {
	return (
		<ReduxProvider store={store}>
			<PersistGate persistor={persistor}>
				<AppContainer />
			</PersistGate>
		</ReduxProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
