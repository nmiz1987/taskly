import { TouchableOpacity, View, Alert, StyleSheet, Text, Pressable, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { theme } from '../theme';
import * as Haptics from 'expo-haptics';

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleCompleted: () => void;
};

export function ShoppingListItem({ name, isCompleted, onDelete, onToggleCompleted }: Props) {
  const handleDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (Platform.OS === 'web') {
      if (confirm(`Are you sure you want to delete ${name}?`)) {
        onDelete();
      }
    } else {
      Alert.alert(`Are you sure you want to delete ${name}?`, 'It will be gone for good', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => onDelete(),
          style: 'destructive',
        },
      ]);
    }
  };

  return (
    <Pressable onPress={onToggleCompleted} style={[styles.itemContainer, isCompleted ? styles.completedContainer : undefined]}>
      <View style={styles.row}>
        <Entypo name={isCompleted ? 'check' : 'circle'} size={24} color={isCompleted ? theme.colorGrey : theme.colorCerulean} />
        <Text numberOfLines={1} style={[styles.itemText, isCompleted ? styles.completedText : undefined]}>
          {name}
        </Text>
      </View>
      <TouchableOpacity hitSlop={20} onPress={handleDelete}>
        <AntDesign name="closecircle" size={24} color={isCompleted ? theme.colorGrey : theme.colorRed} />
      </TouchableOpacity>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomColor: theme.colorCerulean,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '200',
    marginLeft: 8,
    flex: 1,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationLine: 'line-through',
    textDecorationColor: theme.colorGrey,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
});
