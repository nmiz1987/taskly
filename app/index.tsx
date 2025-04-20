import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { theme } from '../theme';
import { useState } from 'react';

type ShoppingListItemType = {
  id: string;
  name: string;
  isCompleted: boolean;
};

export default function App() {
  const [value, setValue] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    setShoppingList(prev => [{ id: new Date().toISOString(), name: value, isCompleted: false }, ...prev]);
    setValue('');
  };

  const removeItemHandler = (id: string) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <FlatList
      data={shoppingList}
      style={styles.container}
      ListEmptyComponent={() => (
        <View style={styles.listEmptyContainer}>
          <Text>Your shopping list is empty</Text>
        </View>
      )}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <ShoppingListItem id={item.id} name={item.name} key={item.id} isCompleted={item.isCompleted} removeItem={removeItemHandler} />
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
    padding: 12,
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
