
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import presentAlert from '../components/Alert';

export default function ScanQRScreen() {
  const theme = useTheme();
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const onSuccess = (e: any) => {
    if (!scanned) {
      setScanned(true);
      try {
        const data = JSON.parse(e.data);
        const { address, amount } = data;
        navigation.navigate('ShowQRPSBTScreen', { address, amount });
      } catch (error) {
        presentAlert({ message: 'Invalid QR code data.' });
        setScanned(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
          <Text style={[styles.centerText, { color: theme.colors.text }]}>
            Scan the QR code to import signed PSBT
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    textAlign: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: '#FF4136',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});