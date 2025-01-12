import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import presentAlert from '../components/Alert';

export default function ImportWalletScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [walletName, setWalletName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleConnectHardwareWallet = () => {
    // Implement connect hardware wallet functionality
    setModalVisible(false);
  };

  const handleQRWalletXpub = () => {
    // Implement QR wallet xpub functionality
    setModalVisible(false);
  };

  const handleWalletFile = () => {
    // Implement wallet file functionality
    setModalVisible(false);
  };

  const handleImportWallet = () => {
    if (walletName.trim() === '') {
      presentAlert({ message: 'Wallet name cannot be empty.' });
      return;
    }
    navigation.navigate('WalletTransactionScreen');
  };

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
        value={walletName}
        onChangeText={setWalletName}
        placeholder="Name wallet"
        placeholderTextColor={theme.colors.text}
        style={[styles.input, { borderColor: theme.colors.border }]}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={handleImportWallet}
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
  openModalButton: {
    padding: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333333',
  },
  closeButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#FF4136',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});