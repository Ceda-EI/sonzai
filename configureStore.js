import { createStore } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import rootReducer from "./reducers";

function decode(toRehydrate) {
	return JSON.parse(toRehydrate, (_, value) => {
		if (typeof value === "string" && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/))
			return new Date(value);
		return value;
	});
}

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	transforms: [createTransform(JSON.stringify, decode)],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
	const store = createStore(persistedReducer);
	const persistor = persistStore(store);
	return { store, persistor };
};
