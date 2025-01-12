import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../theme/useTheme';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types'; // Ensure import
import { Picker } from '@react-native-picker/picker'; // Ensure import

type CreatePSBTScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CreatePSBTScreen'>; // Define navigation prop type

const CreatePSBTScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<CreatePSBTScreenNavigationProp>(); // Use typed navigation
  const [timeLock, setTimeLock] = useState(1);
  const [payTo, setPayTo] = useState('bc1TargetAddress123'); // Add state for dropdown
  const [amount, setAmount] = useState(''); // Add state for amount
  const maxAmount = '10.000'; // Define max amount

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>
        Create inh. PSBT
      </Text>
      <TextInput
        placeholder="Transaction name"
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.text}
      />
      {/* Replace Pay to Text with Picker */}
      <Picker
        selectedValue={payTo}
        onValueChange={(itemValue) => setPayTo(itemValue)}
        style={[styles.label, { borderColor: theme.colors.border }]}
        dropdownIconColor={theme.colors.text}
      >
        <Picker.Item label="bc1TargetAddress123" value="bc1TargetAddress123" />
        <Picker.Item label="bc1TargetAddress1234" value="bc1TargetAddress1234" />
      </Picker>
      {/* Add Amount TextInput with Max Button */}
      <View style={styles.amountContainer}>
        <TextInput
          placeholder="Amount"
          style={[styles.input, { borderColor: theme.colors.border, flex: 1 }]}
          placeholderTextColor={theme.colors.text}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.maxButton, { backgroundColor: theme.colors.button }]}
          onPress={() => setAmount(maxAmount)}
        >
          <Text style={[styles.maxButtonText, { color: theme.colors.buttonText }]}>
            Max
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Mining Fee (e.g., 1 sat/vbyte)"
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.text}
      />
      <View style={styles.sliderContainer}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Add relative timelock from broadcast moment
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={12}
          step={1}
          value={timeLock}
          onValueChange={(value) => setTimeLock(value)}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Timelock period: {timeLock} month{timeLock > 1 ? 's' : ''}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={() => navigation.navigate('PSBTDetailsScreen')} // Use correct screen name
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Save PSBT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
        onPress={() => navigation.navigate('ShowQRPSBTScreen', { address: '1BoatSLRHtKNngkdXEeobR76b53LETtpyT', amount: 0.1234 })} // Use correct screen name and params
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Show QR PSBT
        </Text>
      </TouchableOpacity>
      <Text style={[styles.info, { color: theme.colors.text }]}>
        You will receive a notification in case this transaction will be broadcasted.
      </Text>
    </ScrollView>
  );
};

export default CreatePSBTScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: 'black',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    borderWidth: 1, // Added border to match TextInput
    borderRadius: 8,
    padding: 12,
  },
  sliderContainer: {
    marginBottom: 24,
  },
  slider: {
    marginVertical: 16,
    width: '100%',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  maxButton: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 8,
  },
  maxButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});