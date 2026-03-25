import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../src/components/ui/Button';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { useProgressStore } from '../../src/stores/progressStore';
import { getStageById } from '../../src/data/stages';
import { getWorldForStage } from '../../src/data/worlds';
import { COLORS } from '../../src/constants/colors';
import { formatPercent } from '../../src/utils/math';

const STAR_DELAY_MS = 200;

interface StarItemProps {
  index: number;
  earned: boolean;
  delayMs: number;
}

function StarItem({ index, earned, delayMs }: StarItemProps) {
  const scale = useSharedValue(0);

  useEffect(() => {
    if (earned) {
      // 出現: scale 0 -> 1.3 -> 1.0
      scale.value = withDelay(
        delayMs,
        withSpring(1, { damping: 6, stiffness: 300 })
      );
    }
  }, [earned, delayMs]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value > 0 ? 1 : earned ? 0 : 1,
  }));

  return (
    <Animated.Text
      style={[
        styles.starText,
        { color: earned ? COLORS.star : COLORS.starEmpty },
        earned ? animStyle : undefined,
      ]}
    >
      {earned ? '\u2605' : '\u2606'}
    </Animated.Text>
  );
}

export default function ResultScreen() {
  const router = useRouter();
  const { stageId, stars: starsParam, fuel: fuelParam } = useLocalSearchParams<{ stageId: string; stars: string; fuel: string }>();
  const sId = parseInt(stageId ?? '1', 10);
  const stars = parseInt(starsParam ?? '1', 10) as 1 | 2 | 3;
  const fuel = parseFloat(fuelParam ?? '0');
  const stage = getStageById(sId);
  const world = getWorldForStage(sId);
  const clearStage = useProgressStore(s => s.clearStage);
  const coins = useProgressStore(s => s.coins);

  useEffect(() => {
    if (stage) {
      clearStage(sId, stars, fuel, null);
    }
  }, []);

  if (!stage || !world) return null;

  const stageInWorld = stage.id - world.stageIds[0] + 1;
  const coinReward = stars === 3 ? 30 : stars === 2 ? 20 : 10;
  const nextStageId = sId + 1;
  const hasNext = nextStageId <= 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <CoinDisplay amount={coins} />
      </View>

      <View style={styles.center}>
        <Text style={styles.clearText}>CLEAR!</Text>
        <Text style={styles.stageName}>
          Stage {world.id}-{stageInWorld} {stage.name}
        </Text>

        <View style={styles.starsRow}>
          {[0, 1, 2].map(i => (
            <StarItem
              key={i}
              index={i}
              earned={i < stars}
              delayMs={i * STAR_DELAY_MS}
            />
          ))}
        </View>

        <View style={styles.stats}>
          <Text style={styles.statText}>残り燃料: {formatPercent(fuel)}</Text>
          <Text style={styles.statText}>獲得コイン: +{coinReward}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        {hasNext && (
          <Button
            title="次のステージ"
            onPress={() => router.replace(`/game/${nextStageId}`)}
            size="large"
            icon=">"
            style={styles.nextBtn}
          />
        )}
        <View style={styles.bottomBtns}>
          <Button
            title="リトライ"
            onPress={() => router.replace(`/game/${sId}`)}
            variant="secondary"
            icon="R"
          />
          <Button
            title="ステージ選択"
            onPress={() => router.replace(`/stages/${world.id}`)}
            variant="secondary"
            icon="H"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16, paddingVertical: 8,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  clearText: { fontSize: 28, fontWeight: '900', color: COLORS.accent, marginBottom: 12 },
  stageName: { fontSize: 16, color: COLORS.text, fontWeight: '600', marginBottom: 24 },
  starsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
  starText: { fontSize: 48 },
  stats: { gap: 8 },
  statText: { color: COLORS.textSecondary, fontSize: 16, textAlign: 'center' },
  buttons: { paddingHorizontal: 32, paddingBottom: 40, gap: 12 },
  nextBtn: { width: '100%' },
  bottomBtns: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
});
