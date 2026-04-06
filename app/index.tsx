import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import ReanimatedAnimated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Button } from '../src/components/ui/Button';
import { CoinDisplay } from '../src/components/ui/CoinDisplay';
import { useProgressStore } from '../src/stores/progressStore';
import { COLORS } from '../src/constants/colors';
import { IconSvg } from '../src/components/ui/IconSvg';
import WelcomeBackModal, { checkWelcomeBack } from '../src/components/WelcomeBackModal';

export default function TitleScreen() {
  const router = useRouter();
  const coins = useProgressStore(s => s.coins);
  const loaded = useProgressStore(s => s.loaded);
  const rotation = useSharedValue(0);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [welcomeResult, setWelcomeResult] = useState<{ shouldShow: boolean; hoursAway: number; bonusCoins: number; message: string }>({ shouldShow: false, hoursAway: 0, bonusCoins: 0, message: '' });

  useEffect(() => {
    checkWelcomeBack().then((r) => { if (r.shouldShow) { setWelcomeResult(r); setWelcomeVisible(true); } });
  }, []);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      -1,
    );
  }, [rotation]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#0A0E27', '#0F0F1A', '#1A0A2E']} style={styles.gradient}>
    <SafeAreaView style={styles.container}>
      {/* Star background */}
      <View style={StyleSheet.absoluteFill}>
        {Array.from({ length: 40 }).map((_, i) => {
          const seed = (i * 16807 + 1) % 2147483647;
          return (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: `${(seed % 100)}%` as unknown as number,
                top: `${((seed * 7 + 3) % 100)}%` as unknown as number,
                width: 2 + (seed % 2),
                height: 2 + (seed % 2),
                borderRadius: 2,
                backgroundColor: `rgba(255,255,255,${0.3 + (seed % 5) / 10})`,
              }}
            />
          );
        })}
      </View>

      <View style={styles.header}>
        <CoinDisplay amount={coins} />
      </View>

      <ReanimatedAnimated.View entering={FadeInDown.delay(0).duration(500).springify()} style={styles.center}>
        <ReanimatedAnimated.View style={[styles.rocketIcon, rotateStyle]}>
          <IconSvg name="rocket" size={64} color={COLORS.primary} />
        </ReanimatedAnimated.View>
        <Text style={styles.title}>ぶっ飛びロケット</Text>
        <Text style={styles.subtitle}>Rocket Fling</Text>
      </ReanimatedAnimated.View>

      <View style={styles.buttons}>
        <Button
          title="はじめる"
          onPress={() => router.push('/stages')}
          size="large"
          style={styles.mainButton}
        />

        <Button
          title="デイリーチャレンジ"
          onPress={() => router.push('/daily')}
          variant="secondary"
          style={styles.dailyButton}
        />

        <View style={styles.bottomRow}>
          <Button
            title="設定"
            onPress={() => router.push('/settings')}
            variant="secondary"
            size="small"
          />
          <Button
            title="実績"
            onPress={() => router.push('/achievements')}
            variant="secondary"
            size="small"
          />
          <Button
            title="ショップ"
            onPress={() => router.push('/shop')}
            variant="secondary"
            size="small"
          />
        </View>
      </View>
      <WelcomeBackModal
        visible={welcomeVisible}
        result={welcomeResult}
        onClose={() => setWelcomeVisible(false)}
      />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
  },
  loading: {
    color: COLORS.text,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketIcon: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F1F5F9',
    marginBottom: 4,
    textShadowColor: 'rgba(99,102,241,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '600',
    letterSpacing: 3,
  },
  buttons: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 12,
  },
  mainButton: {
    width: '100%',
  },
  dailyButton: {
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
});
