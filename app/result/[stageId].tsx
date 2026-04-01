import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Share, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
import { useRewardedAd } from '../../src/hooks/useRewardedAd';
import { GameBackground } from '../../src/components/GameBackground';

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
  const { stageId, stars: starsParam, fuel: fuelParam, nm: nmParam } = useLocalSearchParams<{ stageId: string; stars: string; fuel: string; nm: string }>();
  const sId = parseInt(stageId ?? '1', 10);
  const stars = parseInt(starsParam ?? '1', 10) as 1 | 2 | 3;
  const fuel = parseFloat(fuelParam ?? '0');

  // ニアミス統計をパース
  const nmParts = (nmParam ?? '0,0,0,0').split(',').map(Number);
  const nmClose = nmParts[0] ?? 0;
  const nmDanger = nmParts[1] ?? 0;
  const nmMiracle = nmParts[2] ?? 0;
  const nmTotalBonus = nmParts[3] ?? 0;
  const hasNearMiss = nmClose + nmDanger + nmMiracle > 0;
  const stage = getStageById(sId);
  const world = getWorldForStage(sId);
  const clearStage = useProgressStore(s => s.clearStage);
  const coins = useProgressStore(s => s.coins);

  useEffect(() => {
    if (stage) {
      clearStage(sId, stars, fuel, null);
    }
  }, []);

  const { isLoaded: adLoaded, showAd } = useRewardedAd();

  const handleShare = useCallback(async () => {
    const msg = `ぶっ飛びロケット Stage ${sId}を${stars}つ星でクリア！残り燃料${formatPercent(fuel)} #ぶっ飛びロケット`;
    try { await Share.share({ message: msg }); } catch (_) {}
  }, [sId, stars, fuel]);

  const handleShareX = useCallback(async () => {
    const msg = encodeURIComponent(`ぶっ飛びロケット Stage ${sId}を${stars}つ星でクリア！残り燃料${formatPercent(fuel)} #ぶっ飛びロケット`);
    await Linking.openURL(`https://twitter.com/intent/tweet?text=${msg}`);
  }, [sId, stars, fuel]);

  const handleWatchAd = useCallback(() => {
    showAd(() => {
      const store = useProgressStore.getState();
      store.addCoins?.(50);
    });
  }, [showAd]);

  if (!stage || !world) return null;

  const stageInWorld = stage.id - world.stageIds[0] + 1;
  const coinReward = stars === 3 ? 30 : stars === 2 ? 20 : 10;
  const nextStageId = sId + 1;
  const hasNext = nextStageId <= 100;

  return (
    <SafeAreaView style={styles.container}>
      <GameBackground altitude={0.8} fever={stars === 3} />
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

        {/* ニアミス統計 */}
        {hasNearMiss && (
          <View style={styles.nearMissSection}>
            <Text style={styles.nearMissTitle}>NEAR MISS BONUS</Text>
            <View style={styles.nearMissRow}>
              {nmMiracle > 0 && (
                <Text style={[styles.nearMissItem, { color: '#FF2E63' }]}>
                  MIRACLE x{nmMiracle}
                </Text>
              )}
              {nmDanger > 0 && (
                <Text style={[styles.nearMissItem, { color: '#FF6B35' }]}>
                  DANGER x{nmDanger}
                </Text>
              )}
              {nmClose > 0 && (
                <Text style={[styles.nearMissItem, { color: '#FFFFFF' }]}>
                  CLOSE x{nmClose}
                </Text>
              )}
            </View>
            <Text style={styles.nearMissBonus}>+{nmTotalBonus} pts</Text>
          </View>
        )}
      </View>

      {/* Share & Ad */}
      <View style={styles.shareRow}>
        <Pressable style={styles.shareBtn} onPress={handleShare} accessibilityRole="button" accessibilityLabel="スコアをシェアする">
          <Text style={styles.shareBtnText}>シェア</Text>
        </Pressable>
        <Pressable style={styles.xBtn} onPress={handleShareX} accessibilityRole="button" accessibilityLabel="Xに投稿する">
          <Text style={styles.xBtnText}>Xに投稿</Text>
        </Pressable>
        {adLoaded && (
          <Pressable style={styles.adBtn} onPress={handleWatchAd} accessibilityRole="button" accessibilityLabel="広告を見てコインを獲得する">
            <Text style={styles.adBtnText}>広告でコインGET</Text>
          </Pressable>
        )}
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
  nearMissSection: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,217,61,0.08)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,217,61,0.2)',
  },
  nearMissTitle: {
    color: '#FFD93D',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  nearMissRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  nearMissItem: {
    fontSize: 16,
    fontWeight: '700',
  },
  nearMissBonus: {
    color: '#FFD93D',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  shareBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, minHeight: 44, justifyContent: 'center' },
  shareBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  xBtn: { backgroundColor: '#000', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, minHeight: 44, justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
  xBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },
  adBtn: { backgroundColor: '#FFB300', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, minHeight: 44, justifyContent: 'center' },
  adBtnText: { color: '#1A1A2E', fontSize: 13, fontWeight: '700' },
});
