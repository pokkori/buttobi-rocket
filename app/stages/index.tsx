import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { WORLDS } from '../../src/data/worlds';
import { useProgressStore } from '../../src/stores/progressStore';
import { CoinDisplay } from '../../src/components/ui/CoinDisplay';
import { IconSvg, getWorldIcon } from '../../src/components/ui/IconSvg';
import { GameBackground } from '../../src/components/GameBackground';
import { COLORS } from '../../src/constants/colors';

interface WorldCardProps {
  world: typeof WORLDS[number];
  isUnlocked: boolean;
  clearedCount: number;
  index: number;
  onPress: () => void;
}

function WorldCard({ world, isUnlocked, clearedCount, index, onPress }: WorldCardProps) {
  const scale = useSharedValue(0.96);
  const entryTranslateY = useSharedValue(20);
  const entryOpacity = useSharedValue(0);

  useEffect(() => {
    // スクロール入場アニメーション: translateY 20 -> 0 + opacity 0 -> 1
    entryTranslateY.value = withDelay(
      index * 80,
      withSpring(0, { damping: 14, stiffness: 180 })
    );
    entryOpacity.value = withDelay(
      index * 80,
      withTiming(1, { duration: 300 })
    );
  }, [index]);

  const handlePressIn = () => {
    if (!isUnlocked) return;
    scale.value = withSpring(0.96, { damping: 10, stiffness: 400 });
  };

  const handlePressOut = () => {
    if (!isUnlocked) return;
    scale.value = withSpring(1.0, { damping: 8, stiffness: 300 });
  };

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: entryTranslateY.value },
    ],
    opacity: entryOpacity.value,
  }));

  return (
    <Animated.View style={cardStyle}>
      <Pressable
        style={[
          styles.worldCard,
          {
            borderColor: isUnlocked ? world.themeColor : COLORS.locked,
            opacity: isUnlocked ? 1 : 0.5,
          },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={!isUnlocked}
        accessibilityRole="button"
        accessibilityLabel={`ワールド${world.id}: ${world.name}`}
        accessibilityState={{ disabled: !isUnlocked }}
      >
        <View style={[styles.cardGradient, { backgroundColor: world.bgGradient[0] + '88' }]}>
          <View style={styles.worldIconWrapper}>
            <IconSvg name={getWorldIcon(world.id)} size={40} color={world.themeColor} />
          </View>
          <View style={styles.worldInfo}>
            <Text style={styles.worldName}>W{world.id}: {world.name}</Text>
            {isUnlocked ? (
              <Text style={styles.worldProgress}>{clearedCount}/20 クリア</Text>
            ) : (
              <Text style={styles.worldLocked}>星{world.requiredStars}個でアンロック</Text>
            )}
            <Text style={styles.worldDesc}>{world.description}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function WorldSelectScreen() {
  const router = useRouter();
  const totalStars = useProgressStore(s => s.totalStars);
  const unlockedWorlds = useProgressStore(s => s.unlockedWorlds);
  const clearedStages = useProgressStore(s => s.clearedStages);
  const coins = useProgressStore(s => s.coins);

  return (
    <SafeAreaView style={styles.container}>
      <GameBackground altitude={0.7} />
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="前の画面に戻る"
          style={styles.backButton}
        >
          <Text style={styles.back}>← 戻る</Text>
        </Pressable>
        <CoinDisplay amount={coins} />
      </View>

      <Text style={styles.title}>ワールド選択</Text>
      <Text style={styles.starCount}>総獲得星: {totalStars}/300</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {WORLDS.map((world, index) => {
          const isUnlocked = unlockedWorlds.includes(world.id);
          const clearedCount = world.stageIds.filter(id => clearedStages[id]?.stars > 0).length;

          return (
            <WorldCard
              key={world.id}
              world={world}
              isUnlocked={isUnlocked}
              clearedCount={clearedCount}
              index={index}
              onPress={() => isUnlocked && router.push(`/stages/${world.id}`)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E27' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8,
  },
  backButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  back: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  title: { color: COLORS.text, fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  starCount: { color: COLORS.accent, fontSize: 14, textAlign: 'center', marginTop: 4, marginBottom: 16 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40, gap: 12 },
  worldCard: {
    borderRadius: 16, borderWidth: 2, overflow: 'hidden',
  },
  cardGradient: {
    flexDirection: 'row', padding: 16, alignItems: 'center', gap: 16,
  },
  worldIconWrapper: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  worldInfo: { flex: 1 },
  worldName: { color: COLORS.text, fontSize: 18, fontWeight: '700' },
  worldProgress: { color: COLORS.textSecondary, fontSize: 13, marginTop: 2 },
  worldLocked: { color: COLORS.locked, fontSize: 13, marginTop: 2 },
  worldDesc: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
});
