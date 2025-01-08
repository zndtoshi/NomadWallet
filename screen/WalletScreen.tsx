import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';

const sampleData = [
  {
    id: '1',
    label: 'Alice',
    coins: [
      {
        id: 'coin1',
        txid: '79444d80-6ca4-4ed2-9c9d-5...',
        time: 'Mon Oct 02 10:53:12 GMT+0...',
        amount: 0.123,
        usdValue: 0.12,
      },
      {
        id: 'coin2',
        txid: 'e7ed694f-2293-4eaf-a265-79...',
        time: 'Mon Oct 02 10:53:12 GMT+0...',
        amount: 0.1231,
        usdValue: 1.12,
      },
    ],
  },
  {
    id: '2',
    label: 'Bob',
    coins: [
      {
        id: 'coin1',
        txid: 'bdab009f-6761-49dc-9b39-9...',
        time: 'Mon Oct 02 11:26:12 GMT+0...',
        amount: 0.1237,
        usdValue: 70.12,
      },
      {
        id: 'coin2',
        txid: 'b9ddd4d7-ecc7-462b-ba30-7...',
        time: 'Mon Oct 02 11:26:34 GMT+0...',
        amount: 0.12322,
        usdValue: 32.12,
      },
      {
        id: 'coin3',
        txid: 'c899c82d-4f87-44e5-923a-c...',
        time: 'Mon Oct 02 11:27:45 GMT+0...',
        amount: 0.1235,
        usdValue: 5.12,
      },
    ],
  },
];

export default function WalletScreen() {
  const theme = useTheme();

  const renderCoins = (coins) => (
    <FlatList
      data={coins}
      keyExtractor={(coin) => coin.id}
      renderItem={({ item }) => (
        <View style={[styles.coinContainer, { borderColor: theme.colors.border }]}>
          <Text style={[styles.coinText, { color: theme.colors.text }]}>
            {item.txid}
          </Text>
          <Text style={[styles.coinText, { color: theme.colors.text }]}>
            {item.time}
          </Text>
          <Text style={[styles.coinText, { color: theme.colors.text }]}>
            {item.amount.toFixed(4)} BTC (${item.usdValue.toFixed(2)})
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>testwallet</Text>
      <FlatList
        data={sampleData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={[styles.sectionHeader, { backgroundColor: theme.colors.button }]}
            >
              <Text style={[styles.sectionHeaderText, { color: theme.colors.buttonText }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
            {renderCoins(item.coins)}
          </View>
        )}
      />
      <TouchableOpacity
        style={[styles.createButton, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.createButtonText, { color: theme.colors.buttonText }]}>
          Create inh. PSBT
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  coinContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  coinText: {
    fontSize: 14,
    marginBottom: 4,
  },
  createButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});