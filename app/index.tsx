import { StyleSheet, View } from 'react-native';
import { ShoppingListItem } from '../components/ShoppingListItem';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ShoppingListItem name="Coffee" />
      <ShoppingListItem name="Tea" />
      <ShoppingListItem name="Milk" />
      <ShoppingListItem name="Tea" isCompleted />
      <ShoppingListItem name="Milk" isCompleted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
