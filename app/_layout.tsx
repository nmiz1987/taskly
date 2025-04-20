import { Tabs } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { theme } from '../theme';
import { Platform } from 'react-native';

export default function Layout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('white');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colorCerulean }}>
      <Tabs.Screen
        name="index"
        options={{ title: 'Shopping list', tabBarIcon: ({ color, size }) => <Feather name="list" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="counter"
        options={{
          headerShown: false,
          title: 'Counter',
          tabBarIcon: ({ color, size }) => <AntDesign name="clockcircleo" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{ title: 'My idea', tabBarIcon: ({ color, size }) => <FontAwesome5 name="lightbulb" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
