import { ItemProps } from '@/interface/ItemProps';
import { useNavigation, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// create the password lists
// platform is the name of the platform we enter the credentials
// key is the key we use to identify the credentials
// value is the password or credential we want to store
export default function CreateScreen() {
	const [platformName, setPlatformName] = useState('');
	const [passKey, setPassKey] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerStyle: {
				backgroundColor: '#25292e',
			},
			headerTintColor: '#fff',
			headerTitle: 'Create',
		});
	});

	const handleCreate = () => {
		const handleCreateAsync = async () => {
			try {
				const storedList = await SecureStore.getItemAsync('pass-list');
				const list = storedList ? JSON.parse(storedList) : [];
				const newItem: ItemProps = {
					id: Date.now(),
					platform: platformName,
					item_key: passKey,
					value: password
				};
				list.push(newItem);
				await SecureStore.setItemAsync('pass-list', JSON.stringify(list));
				router.replace('/');
			} catch (error) {
				console.error('Error saving item:', error);
			}
		};
		handleCreateAsync();
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Item</Text>
			<TextInput
				style={styles.input}
				placeholder="Enter the platform ..."
				placeholderTextColor='#fff'
				value={platformName}
				onChangeText={setPlatformName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Enter the key ..."
				placeholderTextColor='#fff'
				value={passKey}
				onChangeText={setPassKey}
			/>
			<TextInput
				style={styles.input}
				placeholder="Enter the value ..."
				placeholderTextColor='#fff'
				value={password}
				onChangeText={setPassword}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={handleCreate}
			>
				<Text style={styles.buttonText}>
					Create
				</Text>
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
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
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
		textAlign: 'center'
	},
});