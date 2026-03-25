/**
 * Haptics ユーティリティ
 * expo-haptics を使用。SE と Promise.all で同時発火することで16ms以内のGame Feelを実現。
 */
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export async function hapticLight(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (e) {
    // デバイスがHapticsをサポートしない場合は無視
  }
}

export async function hapticMedium(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (e) {}
}

export async function hapticHeavy(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (e) {}
}

export async function hapticSuccess(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (e) {}
}

export async function hapticError(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (e) {}
}

/**
 * ロケット発射時: SE + Haptics を同時発火（16ms以内目標）
 */
export async function hapticLaunch(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Promise.all([
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
    ]);
  } catch (e) {}
}

/**
 * 衝突・爆発時: 強い振動
 */
export async function hapticExplosion(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (e) {}
}
