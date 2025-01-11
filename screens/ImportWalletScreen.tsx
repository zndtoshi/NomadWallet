import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/useTheme';

export default function ImportWalletScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require('../assets/dms_logo.png')}
        style={styles.image}
      />
      <Text style={[styles.text, { color: theme.colors.text }]}>
        xpub: xpub123TEST123
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        BTC: 1.23456789
      </Text>
      <TextInput
        placeholder="Name wallet"
        placeholderTextColor={theme.colors.text}
        style={[styles.input, { borderColor: theme.colors.border }]}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Import Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: '80%',
    marginBottom: 16,
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});