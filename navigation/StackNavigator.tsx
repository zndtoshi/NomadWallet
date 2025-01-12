import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
// ...existing imports...
import CreateDMSScreen from '../screens/CreateDMSScreen'; // Ensure import
import PSBTDetailsScreen from '../screens/PSBTDetailsScreen'; // Ensure import
import WalletTransactionScreen from '../screens/WalletTransactionScreen'; // Ensure import
import ShowQRPSBTScreen from '../screens/ShowQRPSBTScreen'; // Ensure import
import ImportWalletScreen from '../screens/ImportWalletScreen'; // Add import
import HomeScreen from '../screens/HomeScreen'; // Add import
import CreatePSBTScreen from '../screens/CreatePSBTScreen';
import ActiveDMSScreen from '../screens/ActiveDMSScreen'; // Add import

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      {/* ...existing screens... */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="CreatePSBTScreen"
        component={CreatePSBTScreen}
        options={{ headerShown: false }}
        />
      <Stack.Screen
        name="PSBTDetailsScreen"
        component={PSBTDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateDMSScreen"
        component={CreateDMSScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletTransactionScreen"
        component={WalletTransactionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ShowQRPSBTScreen"
        component={ShowQRPSBTScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ImportWalletScreen"
        component={ImportWalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActiveDMSScreen"
        component={ActiveDMSScreen} // Changed from HomeScreen to ActiveDMSScreen
        options={{ headerShown: false }}
        />
      {/* ...existing screens... */}
    </Stack.Navigator>
  );
}
