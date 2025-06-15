import { ItemProps } from '@/interface/ItemProps';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type handleRemove = (id: number) => void;

// a single render of an item in the list
export default function Item({ item, handleRemove }
	: { item: ItemProps, handleRemove: handleRemove }) {
	return (
		<View style={styles.container}>
			<View style={styles.valueContainer}>
				<Text style={styles.platformText}>{item.platform} - {item.item_key}</Text>
				<Text style={styles.valueText}>Memo - {item.value}</Text>
			</View>
			<View>
				<Ionicons
					name="remove-circle"
					size={24}
					color="orange"
					onPress={() => handleRemove(item.id)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: 'lightgray',
		alignItems: 'center',
		padding: 10,
		paddingRight: 20,
		paddingVertical: 5,
		borderRadius: 5,
		marginTop: 25,
		marginVertical: 10,
		shadowOpacity: 0.5,
	},
	valueContainer: {
		marginVertical: 10,
		opacity: 0.8,
	},

	valueText: {
		fontSize: 14,
		marginVertical: 8,
		color: '#000',
	},

	platformText: {
		fontWeight: 'bold',
		marginTop: 5,
		fontSize: 14,
		color: '#000',
		marginVertical: 8
	},
});