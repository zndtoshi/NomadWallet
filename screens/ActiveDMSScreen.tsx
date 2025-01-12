import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

const ActiveDMSScreen: React.FC = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>
        Wallets with Active DMS
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Testwallet
        </Text>
      </TouchableOpacity>
      <Text style={[styles.subHeader, { color: theme.colors.text }]}>1 year</Text>
      <TouchableOpacity
        style={[styles.goodButton, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          All Good
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveDMSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 16,
    marginTop: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  goodButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
  },
});