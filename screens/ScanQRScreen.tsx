import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types'; // Changed import source
import { CameraScreen } from 'react-native-camera-kit';
import presentAlert from '../components/Alert';

type ScanQRScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ScanQRScreen'>; // Updated type

type Props = {
  navigation: ScanQRScreenNavigationProp;
};

const ScanQRScreen: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [scanned, setScanned] = useState(false);

  const onReadCode = (event: any) => {
    if (!scanned) {
      setScanned(true);
      try {
        const data = JSON.parse(event.nativeEvent.codeStringValue);
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
      <CameraScreen
        showFrame={true}
        scanBarcode={true}
        laserColor={theme.colors.button}
        frameColor={theme.colors.text}
        onReadCode={onReadCode}
        hideControls={false}
        offsetForScannerFrame={10}
        heightForScannerFrame={300}
        colorForScannerFrame={theme.colors.button}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanQRScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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