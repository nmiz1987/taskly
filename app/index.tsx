import { StyleSheet, TextInput, FlatList, View, Text, LayoutAnimation } from 'react-native';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { theme } from '../theme';
import { useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';
import * as Haptics from 'expo-haptics';

const storageKey = 'shopping-list';

type ShoppingListItemType = {
  id: string;
  name: string;
  lastUpdatedTimestamp: number;
  completedAtTimestamp?: number;
};

export default function App() {
  const [value, setValue] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShoppingList(data);
      }
    };

    fetchInitial();
  }, []);

  function orderShoppingList(shoppingList: ShoppingListItemType[]) {
    return shoppingList.sort((item1, item2) => {
      if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return item2.completedAtTimestamp - item1.completedAtTimestamp;
      }

      if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return 1;
      }

      if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
        return -1;
      }

      if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
        return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
      }

      return 0;
    });
  }

  const handleSubmit = () => {
    if (!value.trim()) return;
    const newShoppingList = [{ id: new Date().toISOString(), name: value, isCompleted: false, lastUpdatedTimestamp: Date.now() }, ...shoppingList];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
    setValue('');
  };

  const deleteHandler = (id: string) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  const toggleCompletedHandler = (id: string) => {
    const newShoppingList = shoppingList.map(item => {
      if (item.id === id) {
        if (item.completedAtTimestamp) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return { ...item, completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(), lastUpdatedTimestamp: Date.now() };
      }
      return item;
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey, newShoppingList);
  };

  return (
    <FlatList
      data={orderShoppingList(shoppingList)}
      style={styles.container}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <ShoppingListItem
          onToggleCompleted={() => toggleCompletedHandler(item.id)}
          name={item.name}
          key={item.id}
          isCompleted={!!item.completedAtTimestamp}
          onDelete={() => deleteHandler(item.id)}
        />
      )}
      ListHeaderComponent={
        <TextInput
          value={value}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
          onChangeText={setValue}
          style={styles.input}
          placeholder="E.g Coffee"
        />
      }
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  input: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: theme.colorWhite,
  },
  listEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
});
