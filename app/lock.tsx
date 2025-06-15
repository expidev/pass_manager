import { ImageBackground } from 'expo-image';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LockScreenProps {
	setIsLocked: (isLocked: boolean) => void;
}

// the lock screen render. we cannot go to the main app until we enter the correct pin
export default function LockScreen({ setIsLocked }: LockScreenProps) {
	const [pin, setPin] = useState('');
	const [storedPin, setStoredPin] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		const loadStoredPin = async () => {
			const savedPin = await SecureStore.getItemAsync('user-pin');
			if (savedPin) {
				setStoredPin(savedPin);
			}
		};
		loadStoredPin();
	}, []);

	const handleUnlock = () => {
		setError('');
		if (pin === storedPin) {
			setIsLocked(false);
		} else {
			setError('Incorrect PIN. Try again.');
		}
	};

	const handleSetPin = async () => {
		if (pin.length < 4) {
			setError('PIN must be at least 4 digits.');
			return;
		}
		await SecureStore.setItemAsync('user-pin', pin);
		setStoredPin(pin);
		setPin('');
		setError('');
		alert('PIN set successfully!');
	}

	return (
		<ImageBackground
			source={require('../assets/images/wallpaper.jpeg')}
			style={{ flex: 1, justifyContent: 'center' }}
		>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					secureTextEntry
					value={pin}
					onChangeText={(text) => {
						setPin(text);
					}}
					placeholder="Enter your PIN ..."
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={storedPin ? handleUnlock : handleSetPin}
				>
					<Text style={styles.buttonText}>
						{storedPin ? 'Unlock' : 'Set PIN'}
					</Text>
				</TouchableOpacity>
				{error ? <Text style={styles.error}>{error}</Text> : null}
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '80%',
		height: 60,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		paddingHorizontal: 10,
		marginBottom: 10,
		backgroundColor: '#fff',
		textAlign: 'center'
	},
	error: {
		backgroundColor: '#f8d7da',
		borderColor: 'none',
		color: 'red',
		paddingRight: 10,
		paddingLeft: 10,
		width: '80%',
		paddingVertical: 5,
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
	},
	button: {
		width: '80%',
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
		textAlign: 'center'
	},
});