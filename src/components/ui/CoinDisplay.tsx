import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { IconSvg } from './IconSvg';

interface CoinDisplayProps {
  amount: number;
  size?: number;
}

export function CoinDisplay({ amount, size = 16 }: CoinDisplayProps) {
  return (
    <View style={styles.container}>
      <IconSvg name="coin" size={size} />
      <Text style={[styles.text, { fontSize: size }]}>{amount.toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,215,0,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  text: {
    color: COLORS.accent,
    fontWeight: '700',
  },
});
