import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/useTheme';
import StackNavigator from './StackNavigator'; // Use StackNavigator for stack-based screens
import ShowQRPSBTScreen from '../screens/ShowQRPSBTScreen';
import ScanQRScreen from '../screens/ScanQRScreen';
// Remove individual screen imports that are handled by StackNavigator
// import PSBTDetailsScreen from '../screens/PSBTDetailsScreen';
// import ImportWalletScreen from '../screens/ImportWalletScreen';
// import CreateDMSScreen from '../screens/CreateDMSScreen';
// import WalletTransactionScreen from '../screens/WalletTransactionScreen';

import { DrawerParamList } from './types'; // Ensure importing from types.ts

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  const theme = useTheme();

  const CustomDrawerContent = (props: any) => {
    const { navigation } = props;

    const menuItems = [
      { label: 'Home', icon: '🏠', screen: 'HomeStack' }, // Navigate to StackNavigator
      // Remove menu items that are handled by StackNavigator
      // { label: 'Import signed PSBT', icon: '⬇️', screen: 'PSBTDetailsScreen' },
      // { label: 'Import Wallet', icon: '📥', screen: 'ImportWalletScreen' },
      // { label: 'Import/export DMS setup', icon: '🔄', screen: 'CreateDMSScreen' },
      // { label: 'Sync personal Nostr', icon: '🔗', screen: 'SyncNostr' },
      // { label: 'Create DMS', icon: '➕', screen: 'CreateDMSScreen' },
      // { label: 'Reset App', icon: '🔄', screen: 'Reset' },
      { label: 'Show QR PSBT', icon: '📸', screen: 'ShowQRPSBTScreen' },
      { label: 'Scan QR Code', icon: '📷', screen: 'ScanQRScreen' },
    ];

    return (
      <View style={[styles.drawerContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerContainer}>
          <Image source={require('../assets/dms_logo.png')} style={styles.logo} />
          <Text style={[styles.headerText, { color: theme.colors.text }]}>BitcoinDMS</Text>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={() => navigation.navigate(item.screen)}>
            <Text style={[styles.menuIcon, { color: theme.colors.text }]}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: theme.colors.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.button },
        headerTintColor: theme.colors.buttonText,
      }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={StackNavigator} // Use StackNavigator for Home
        options={{ headerShown: false }}
      />
      {/* Optionally, keep other independent screens here if necessary */}
      <Drawer.Screen name="ShowQRPSBTScreen" component={ShowQRPSBTScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="ScanQRScreen" component={ScanQRScreen} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  menuLabel: {
    fontSize: 16,
  },
});
