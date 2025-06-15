import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// setting a new pin for the user
export default function SettingScreen() {
	const [newPin, setNewPin] = useState('');
	const [reenterPin, setReenterPin] = useState('');
	const router = useRouter();

	const handleSavePin = () => {
		const savePinAsync = async () => {
			if (newPin !== reenterPin) {
				alert('Pins do not match!');
				return;
			}
			try {
				await SecureStore.setItemAsync('user-pin', newPin);
				alert('Pin saved successfully!');
				router.replace('/');
			} catch (error) {
				console.error('Error saving pin:', error);
			}
		};
		savePinAsync();
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Enter new pin"
				placeholderTextColor="#fff"
				secureTextEntry
				value={newPin}
				onChangeText={setNewPin}
			/>
			<TextInput
				style={styles.input}
				placeholder="Re-enter new pin"
				placeholderTextColor="#fff"
				secureTextEntry
				value={reenterPin}
				onChangeText={setReenterPin}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSavePin}>
				<Text style={styles.buttonText}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#25292e',
	},
	input: {
		borderColor: '#ccc',
		color: '#fff',
		borderWidth: 1,
		marginVertical: 25,
		paddingHorizontal: 8,
		height: 60,
	},
	button: {
		width: '100%',
		backgroundColor: '#777',
		marginVertical: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});