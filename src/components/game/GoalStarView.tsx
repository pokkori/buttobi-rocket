import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { GoalStar } from '../../types';

interface GoalStarViewProps {
  goal: GoalStar;
  screenWidth: number;
  screenHeight: number;
}

export function GoalStarView({ goal, screenWidth, screenHeight }: GoalStarViewProps) {
  const cx = goal.position.nx * screenWidth;
  const cy = goal.position.ny * screenHeight;
  const r = goal.radius * Math.min(screenWidth, screenHeight);

  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.6);
  const rotation = useSharedValue(0);

  useEffect(() => {
    const duration = 1000 / goal.pulseSpeed;

    // キラキラ: scale 1.0 -> 1.3 -> 1.0 を無限ループ
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // 透明度パルス
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // 回転: 2000ms で 360度を無限ループ
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, [goal.pulseSpeed]);

  const glowStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const starStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.container, { left: cx - r * 2, top: cy - r * 2, width: r * 4, height: r * 4 }]}>
      <Animated.View
        style={[
          styles.glow,
          {
            width: r * 4,
            height: r * 4,
            borderRadius: r * 2,
          },
          glowStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.star,
          { width: r * 2, height: r * 2, borderRadius: r, left: r, top: r },
          starStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  glow: {
    position: 'absolute',
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  star: {
    position: 'absolute',
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
