import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Slider, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

export default function CreateDMSScreen() {
  const theme = useTheme();
  const [releaseTime, setReleaseTime] = useState(1);
  const [selectedShards, setSelectedShards] = useState('2-of-4');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Pay to: bc1TargetAddress123
      </Text>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Release if unresponsive for: {releaseTime} year{releaseTime > 1 ? 's' : ''}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={releaseTime}
        onValueChange={setReleaseTime}
      />
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Choose no of Shamir shards for the inh. PSBT:
      </Text>
      <View style={styles.shardOptions}>
        <TouchableOpacity
          style={[
            styles.shardButton,
            selectedShards === '2-of-2' && { backgroundColor: theme.colors.button },
          ]}
          onPress={() => setSelectedShards('2-of-2')}
        >
          <Text style={[styles.shardText, { color: selectedShards === '2-of-2' ? theme.colors.buttonText : theme.colors.text }]}>
            2-of-2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.shardButton,
            selectedShards === '2-of-4' && { backgroundColor: theme.colors.button },
          ]}
          onPress={() => setSelectedShards('2-of-4')}
        >
          <Text style={[styles.shardText, { color: selectedShards === '2-of-4' ? theme.colors.buttonText : theme.colors.text }]}>
            2-of-4
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.createButtonText, { color: theme.colors.buttonText }]}>
          Create DMS
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  slider: {
    marginVertical: 16,
    width: '100%',
  },
  shardOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  shardButton: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    alignItems: 'center',
    width: '45%',
  },
  shardText: {
    fontSize: 14,
  },
  createButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});