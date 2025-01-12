import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import presentAlert from '../components/Alert';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types'; // Ensure import

type ImportWalletScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ImportWalletScreen'>; // Define navigation prop type

const ImportWalletScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<ImportWalletScreenNavigationProp>(); // Use typed navigation
  const [walletName, setWalletName] = useState('');

  const handleImportWallet = () => {
    if (walletName.trim() === '') {
      presentAlert({ message: 'Wallet name cannot be empty.' });
      return;
    }
    navigation.navigate('WalletTransactionScreen'); // Use correct screen name
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={require('../assets/dms_logo.png')} style={styles.image} />
      <Text style={[styles.text, { color: theme.colors.text }]}>xpub: xpub123TEST123</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>BTC: 1.23456789</Text>
      <TextInput
        value={walletName}
        onChangeText={setWalletName}
        placeholder="Name wallet"
        placeholderTextColor={theme.colors.text}
        style={[styles.input, { borderColor: theme.colors.border }]}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.button }]} onPress={handleImportWallet}>
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>Import Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImportWalletScreen;

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
