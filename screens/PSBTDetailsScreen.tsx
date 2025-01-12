import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import { openSignedTransaction } from '../blue_modules/fs';
import presentAlert from '../components/Alert';

export default function PSBTDetailsScreen() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        Once the PSBT has been signed, feel free to share it with your heirs. This transaction
        will be monitored by the DMS app, and you will receive a notification in case it has been
        broadcasted. At that point, you will be able to cancel it, if you so desire, by creating a
        new transaction that spends back to the original wallet.
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        You can also import the signed PSBT back to the app to verify that it has been correctly
        signed.
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        You will also have the option to create a DMS switch that will share encrypted shards of
        the signed transaction with Bitcoin companies, shards which will be combined in case the
        switch was not pressed for a long period of time.
      </Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>
        To do that, go on the home page to the top left corner button and select "Import signed
        PSBT" or click the button below:
      </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});