import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import CheckBox from '@react-native-community/checkbox';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types'; // Changed import source
import { useNavigation } from '@react-navigation/native';

const sampleData = [
  {
    id: '1',
    txid: '61d79680-d0a2-4595-a5d1-8...',
    date: 'Thu Sep 28 14:08:36 GMT+0...',
    amount: 0.1230,
    usdValue: 0.12,
    label: '(no label)',
  },
  {
    id: '2',
    txid: '4114064f-a257-4e14-b1a7-0...',
    date: 'Thu Sep 28 14:08:36 GMT+0...',
    amount: 0.1231,
    usdValue: 1.12,
    label: '(no label)',
  },
];

type WalletTransactionScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'WalletTransactionScreen'>;

const WalletTransactionScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<WalletTransactionScreenNavigationProp>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Testwallet</Text>
      <Text style={[styles.balance, { color: theme.colors.text }]}>BTC: 1.23456789</Text>
      <FlatList
        data={sampleData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={[styles.headerText, { color: theme.colors.text }]}>Coins</Text>
            <Text style={[styles.headerText, { color: theme.colors.text }]}>Label</Text>
            <Text style={[styles.headerText, { color: theme.colors.text }]}>Amount</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>
              <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.txid}</Text>
              <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.date}</Text>
              <Text style={[styles.itemText, { color: theme.colors.text }]}>{item.label}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={[styles.amountText, { color: theme.colors.text }]}>
                {item.amount.toFixed(4)} BTC
              </Text>
              <Text style={[styles.amountText, { color: theme.colors.text }]}>
                ${item.usdValue.toFixed(2)}
              </Text>
            </View>
            <CheckBox
              value={selectedItems.includes(item.id)}
              onValueChange={() => handleSelect(item.id)}
            />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('CreatePSBTScreen')}
        style={[styles.button, { backgroundColor: theme.colors.button }]}
      >
        <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
          Create inh. PSBT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balance: {
    fontSize: 16,
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 12,
    marginBottom: 4,
  },
  amountContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 12,
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