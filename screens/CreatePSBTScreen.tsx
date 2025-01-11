import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import Slider from '@react-native-community/slider';

export default function CreatePSBTScreen() {
  const theme = useTheme();
  const [timeLock, setTimeLock] = useState(1);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>
        Create inh. PSBT
      </Text>
      <TextInput
        placeholder="Transaction name"
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.text}
      />
      <TextInput
        placeholder="Pay to"
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.text}
      />
      <TextInput
        placeholder="Amount"
        style={[styles.input, { borderColor: theme.colors.border }]}
        placeholderTextColor={theme.colors.text}
      />
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
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Save PSBT
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Show QR PSBT
        </Text>
      </TouchableOpacity>
      <Text style={[styles.info, { color: theme.colors.text }]}>
        You will receive a notification in case this transaction will be broadcasted.
      </Text>
    </View>
  );
}

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
  sliderContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
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
});