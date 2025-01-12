import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import { openSignedTransaction } from '../blue_modules/fs';
import presentAlert from '../components/Alert';

export default function HomeScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image
        source={require('../assets/dms_logo.png')}
        style={styles.image}
      />
      <Text style={[styles.header, { color: theme.colors.text }]}>DMS info</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Import Wallet
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={async () => {
          const content = await openSignedTransaction();
          if (content) {
            presentAlert({ message: content });
          }
        }}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Import signed PSBT
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button, marginTop: 16 }]}
        onPress={() => navigation.navigate('ScanQRScreen')}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Import signed PSBT via QR Code
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleConnectHardwareWallet}
            >
              <Text style={styles.modalButtonText}>Connect hardware wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleQRWalletXpub}
            >
              <Text style={styles.modalButtonText}>QR wallet xpub</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleWalletFile}
            >
              <Text style={styles.modalButtonText}>Wallet file</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

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
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
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