import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker'; // Ensure import
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types'; // Ensure import

type CreateDMSScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CreateDMSScreen'>; // Define navigation prop type

const CreateDMSScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<CreateDMSScreenNavigationProp>(); // Use typed navigation
  const [releaseTime, setReleaseTime] = useState(1);
  const [selectedShards, setSelectedShards] = useState('2-of-4');
  const [payTo, setPayTo] = useState('bc1TargetAddress123'); // Add state for dropdown

  const handleCreateDMS = () => {
    // Implement DMS creation functionality
    navigation.navigate('ActiveDMSScreen'); // Navigate back to Home or another appropriate screen
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Replace Pay to Text with Picker */}
      <Picker
        selectedValue={payTo}
        onValueChange={itemValue => setPayTo(itemValue)}
        style={[styles.label, { borderColor: theme.colors.border }]}
        dropdownIconColor={theme.colors.text}
      >
        <Picker.Item label="bc1TargetAddress123" value="bc1TargetAddress123" />
        <Picker.Item label="bc1TargetAddress1234" value="bc1TargetAddress1234" />
      </Picker>
      <Text style={[styles.label, { color: theme.colors.text }]}>
        Release if unresponsive for: {releaseTime} year{releaseTime > 1 ? 's' : ''}
      </Text>
      <Slider style={styles.slider} minimumValue={1} maximumValue={5} step={1} value={releaseTime} onValueChange={setReleaseTime} />
      <Text style={[styles.label, { color: theme.colors.text }]}>Choose number of Shamir shards for the inh. PSBT:</Text>
      <View style={styles.shardOptions}>
        <TouchableOpacity
          style={[styles.shardButton, selectedShards === '2-of-2' && { backgroundColor: theme.colors.button }]}
          onPress={() => setSelectedShards('2-of-2')}
        >
          <Text style={[styles.shardText, { color: selectedShards === '2-of-2' ? theme.colors.buttonText : theme.colors.text }]}>
            2-of-2
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.shardButton, selectedShards === '2-of-4' && { backgroundColor: theme.colors.button }]}
          onPress={() => setSelectedShards('2-of-4')}
        >
          <Text style={[styles.shardText, { color: selectedShards === '2-of-4' ? theme.colors.buttonText : theme.colors.text }]}>
            2-of-4
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: theme.colors.button }]}
        onPress={handleCreateDMS} // Implement navigation action
      >
        <Text style={[styles.createButtonText, { color: theme.colors.buttonText }]}>Create DMS</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateDMSScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    borderWidth: 1, // Added border to match Picker
    borderRadius: 8,
    padding: 12,
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
