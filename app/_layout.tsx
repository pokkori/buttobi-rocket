import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useProgressStore } from '../src/stores/progressStore';
import { useSettingsStore } from '../src/stores/settingsStore';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function scheduleDailyReminder(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'ぶっ飛びロケット',
        body: '今日もロケットを打ち上げよう！',
        sound: true,
      },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.CALENDAR, hour: 20, minute: 0, repeats: true },
    });
  } catch (e) {
    console.warn('[notifications] schedule failed:', e);
  }
}

export default function RootLayout() {
  const loadProgress = useProgressStore(s => s.load);
  const loadSettings = useSettingsStore(s => s.load);

  useEffect(() => {
    loadProgress();
    loadSettings();
    scheduleDailyReminder().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0E27' },
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0E27',
  },
});
