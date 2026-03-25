import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { RocketState } from '../../types';

interface RocketViewProps {
  rocket: RocketState;
  screenWidth: number;
  screenHeight: number;
}

export function RocketView({ rocket, screenWidth, screenHeight }: RocketViewProps) {
  const cx = rocket.position.x * screenWidth;
  const cy = rocket.position.y * screenHeight;
  const rotation = (rocket.rotation * 180) / Math.PI + 90;

  const shakeX = useSharedValue(0);
  const bodyScale = useSharedValue(1);
  const wasLaunchedRef = useRef(false);
  const prevAliveRef = useRef(true);

  // 発射時シェイク + 圧縮
  useEffect(() => {
    if (rocket.isLaunched && !wasLaunchedRef.current) {
      wasLaunchedRef.current = true;

      // X方向シェイク: -3 -> 3 -> -2 -> 2 -> 0
      shakeX.value = withSequence(
        withTiming(-3, { duration: 40 }),
        withTiming(3, { duration: 40 }),
        withTiming(-2, { duration: 40 }),
        withTiming(2, { duration: 40 }),
        withTiming(0, { duration: 40 })
      );

      // 加速中: scale 1.0 -> 0.9 (圧縮感)
      bodyScale.value = withTiming(0.9, { duration: 150 });
    }

    if (!rocket.isLaunched) {
      wasLaunchedRef.current = false;
      bodyScale.value = withSpring(1.0, { damping: 6, stiffness: 200 });
    }
  }, [rocket.isLaunched]);

  // ゴール到達: isAlive=false かつ fuel>0 のケースは親で処理
  // ここでは isAlive 変化時に拡大演出
  useEffect(() => {
    if (prevAliveRef.current && !rocket.isAlive) {
      // ゴール到達 or 死亡: scale 1.0 -> 1.4 -> 1.0
      bodyScale.value = withSequence(
        withSpring(1.4, { damping: 4, stiffness: 200 }),
        withSpring(1.0, { damping: 8, stiffness: 200 })
      );
    }
    prevAliveRef.current = rocket.isAlive;
  }, [rocket.isAlive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: shakeX.value },
      { scale: bodyScale.value },
    ],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          left: cx - 14,
          top: cy - 14,
          transform: [{ rotate: `${rotation}deg` }],
        },
      ]}
    >
      <Animated.View style={[styles.rocketBody, animatedStyle]}>
        {/* ロケット本体: SVG代替のView描画 */}
        <View style={styles.nose} />
        <View style={styles.body} />
        <View style={styles.finRow}>
          <View style={styles.finLeft} />
          <View style={styles.engine} />
          <View style={styles.finRight} />
        </View>
        {rocket.isLaunched && (
          <View style={styles.flame} />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rocketBody: {
    alignItems: 'center',
    width: 28,
    height: 28,
  },
  nose: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E63946',
  },
  body: {
    width: 12,
    height: 10,
    backgroundColor: '#E8E8F0',
    borderRadius: 2,
  },
  finRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  finLeft: {
    width: 0,
    height: 0,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderRightColor: '#2DD4BF',
    borderTopColor: 'transparent',
  },
  engine: {
    width: 8,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 2,
  },
  finRight: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: '#2DD4BF',
    borderTopColor: 'transparent',
  },
  flame: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFD93D',
    marginTop: -2,
  },
});
