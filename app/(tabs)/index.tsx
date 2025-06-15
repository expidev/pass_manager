import Item from '@/components/Item';
import { ItemProps } from '@/interface/ItemProps';
import { RootStackParamList } from '@/interface/Route';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<RootStackParamList, 'create'>;

// list the items in the pass list, have the create button on the top right corner to 
// create a new item in the pass list
export default function Index() {
  const [passList, setPassList] = useState([]);
  const navigation = useNavigation<NavigationProp>();

  const handleRemove = async (id: number) => {
    try {
      const storedPassList = await SecureStore.getItemAsync('pass-list');
      if (storedPassList) {
        const updatedList = JSON.parse(storedPassList).filter((item: ItemProps) => item.id !== id);
        await SecureStore.setItemAsync('pass-list', JSON.stringify(updatedList));
        setPassList(updatedList);
      }
    } catch (error) {
      console.error('Error removing an item:', error);
    }
  }

  useEffect(() => {
    const fetchPassList = async () => {
      try {
        const storedPassList = await SecureStore.getItemAsync('pass-list');
        if (storedPassList) {
          setPassList(JSON.parse(storedPassList));
        }
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };
    fetchPassList();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('create')}
          style={{ marginRight: 10 }}
        >
          <Ionicons name="add-circle" size={40} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={styles.container}>
        <FlatList
          data={passList}
          keyExtractor={(item: ItemProps) => item.id.toString()}
          renderItem={({ item }) => (
            <Item
              item={item}
              handleRemove={handleRemove}
            />
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
  text: {
    color: '#fff',
  }
});
