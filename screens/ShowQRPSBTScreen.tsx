
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/useTheme';
import QRCode from 'react-native-qrcode-svg';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type ShowQRPSBTScreenRouteProp = RouteProp<any, any>;
type ShowQRPSBTScreenNavigationProp = StackNavigationProp<any, any>;

type Props = {
  route: ShowQRPSBTScreenRouteProp;
  navigation: ShowQRPSBTScreenNavigationProp;
};

export default function ShowQRPSBTScreen({ route }: Props) {
  const theme = useTheme();
  const { address, amount } = route.params;

  const qrValue = JSON.stringify({ address, amount });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.label, { color: theme.colors.text }]}>Address:</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>{address}</Text>
      
      <Text style={[styles.label, { color: theme.colors.text }]}>Amount:</Text>
      <Text style={[styles.text, { color: theme.colors.text }]}>{amount} BTC</Text>
      
      <QRCode
        value={qrValue}
        size={200}
        color={theme.colors.text}
        backgroundColor={theme.colors.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
});