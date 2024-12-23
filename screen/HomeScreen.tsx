import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeScreen = () => {
  const handleImportWallet = () => {
    console.log('Import Wallet');
  };

  const handleImportPSBT = () => {
    console.log('Import signed PSBT');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/dms-icon.png' }} // Replace with the correct image URL or asset path
        style={styles.logo}
      />
      <Text style={styles.text}>DMS info</Text>
      <TouchableOpacity style={styles.button} onPress={handleImportWallet}>
        <Text style={styles.buttonText}>↕ Import Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleImportPSBT}>
        <Text style={styles.buttonText}>↕ Import signed PSBT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#6A1B9A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;