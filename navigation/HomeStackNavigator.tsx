import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Changed import
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack'; // Added for type definitions
import { useTheme } from '../theme/useTheme';
import HomeScreen from '../screens/HomeScreen';
import CreatePSBTScreen from '../screens/CreatePSBTScreen';
import WalletTransactionScreen from '../screens/WalletTransactionScreen';
import ShowQRPSBTScreen from '../screens/ShowQRPSBTScreen'; // Ensure this is included
import { HomeStackParamList } from './types'; // Ensure importing from types.ts

const Stack = createNativeStackNavigator<HomeStackParamList>(); // Updated navigator

export default function HomeStackNavigator() {
  const theme = useTheme(); // Access theme if needed

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.button },
        headerTintColor: theme.colors.buttonText,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreatePSBTScreen" component={CreatePSBTScreen} />
      <Stack.Screen name="WalletTransactionScreen" component={WalletTransactionScreen} />
      <Stack.Screen name="ShowQRPSBTScreen" component={ShowQRPSBTScreen} />
      {/* Add other nested screens here */}
    </Stack.Navigator>
  );
}