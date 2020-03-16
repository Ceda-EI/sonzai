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
						onChangeText={text => setText(text)}
						mode="outlined"
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => {onDismiss(); setText("");}}>Cancel</Button>
					<Button onPress={() => {onOK(text); setText("");}}>OK</Button>
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
