import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	Portal,
	Dialog,
	Button,
	TextInput,
} from "react-native-paper";

export default function InputDialog({ visible, onOK, onDismiss, title, label, placeholder }) {
	const [ text, setText ] = useState("");
	const [ error, setError ] = useState(false);

	function onChangeText(text) {
		setText(text);
		setError(text === "");
	}

	function onCancel() {
		onDismiss();
		setText("");
	}

	function onDone() {
		if (text === "") {
			setError(true);
			return;
		}
		onOK(text);
		setText("");
	}
	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={() => {onDismiss(); setText("");}}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label={label}
						placeholder={placeholder}
						value={text}
						onChangeText={onChangeText}
						mode="outlined"
						error={error}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onCancel}>Cancel</Button>
					<Button onPress={onDone}>Done</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

InputDialog.propTypes = {
	visible: PropTypes.bool,
	onOK: PropTypes.func,
	onDismiss: PropTypes.func,
	title: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string,
};
