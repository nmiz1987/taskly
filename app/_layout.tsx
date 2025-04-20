import { Tabs } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '../theme';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('white');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  return (
    <>
      <StatusBar style="dark" />
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
      </Tabs>
    </>
  );
}
