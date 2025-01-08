import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../theme/useTheme';
import HomeScreen from '../screens/HomeScreen';
import PSBTDetailsScreen from '../screens/PSBTDetailsScreen';
import ImportWalletScreen from '../screens/ImportWalletScreen';
import CreateDMSScreen from '../screens/CreateDMSScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const theme = useTheme();

  const CustomDrawerContent = (props: any) => {
    const { navigation } = props;

    const menuItems = [
      { label: 'Home', icon: '🏠', screen: 'Home' },
      { label: 'Import signed PSBT', icon: '⬇️', screen: 'PSBTDetails' },
      { label: 'Import Wallet', icon: '📥', screen: 'ImportWallet' },
      { label: 'Import/export DMS setup', icon: '🔄', screen: 'DMSSetup' },
      { label: 'Sync personal Nostr', icon: '🔗', screen: 'SyncNostr' },
      { label: 'Create DMS', icon: '➕', screen: 'CreateDMS' },
      { label: 'Reset App', icon: '🔄', screen: 'Reset' },
    ];

    return (
      <View style={[styles.drawerContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/dms_logo.png')}
            style={styles.logo}
          />
          <Text style={[styles.headerText, { color: theme.colors.text }]}>
            BitcoinDMS
          </Text>
        </View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={[styles.menuIcon, { color: theme.colors.text }]}>{item.icon}</Text>
            <Text style={[styles.menuLabel, { color: theme.colors.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.button },
          headerTintColor: theme.colors.buttonText,
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="PSBTDetails" component={PSBTDetailsScreen} />
        <Drawer.Screen name="ImportWallet" component={ImportWalletScreen} />
        <Drawer.Screen name="CreateDMS" component={CreateDMSScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
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