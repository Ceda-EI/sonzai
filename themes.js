import { DefaultTheme, DarkTheme } from "react-native-paper";
export default [
	{
		"name": "Dark: Pink and Blue",
		"theme": {
			...DarkTheme,
			mode: "exact",
			colors: {
				primary: "#ff1744",
				accent: "#3949ab",
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
		}
	},
	{
		"name": "Dark: Pastel Colors",
		"theme": {
			...DarkTheme,
			mode: "exact",
			colors: {
				primary: "#ef9a9a",
				accent: "#fce4ec",
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
		}
	},
	{
		"name": "Dark: Pastel Colors 2",
		"theme": {
			...DarkTheme,
			mode: "exact",
			colors: {
				primary: "#e0f7fa",
				accent: "#ffebee",
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
		}
	},
	{
		"name": "Absolute Dark: Purple and Gray",
		"theme": DarkTheme
	},
	{
		"name": "Light: Pink and Gray",
		"theme": {
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				primary: "#ff1744",
				accent: "#e0e0e0",
			}
		}
	},
	{
		"name": "Light: Pastel Colors",
		"theme": {
			...DefaultTheme,
			mode: "exact",
			colors: {
				...DefaultTheme.colors,
				primary: "#ef9a9a",
				accent: "#fce4ec",
			}
		}
	},
	{
		"name": "Light: Purple and Green",
		"theme": DefaultTheme
	},
];
