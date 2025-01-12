import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Ensure import
import DrawerNavigator from './navigation/DrawerNavigator'; // Ensure import
import { ThemeProvider } from './theme/useTheme';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
