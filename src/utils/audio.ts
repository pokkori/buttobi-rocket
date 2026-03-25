/**
 * BGM + SE ユーティリティ
 * expo-av を使用。BGMはループ再生、SEは16ms以内発火を目標とする。
 */
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

let bgmSound: Audio.Sound | null = null;
let bgmEnabled = true;
let seEnabled = true;

export async function initAudio(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  } catch (e) {
    console.warn('[audio] initAudio failed:', e);
  }
}

export async function playBgm(assetModule: number): Promise<void> {
  if (Platform.OS === 'web' || !bgmEnabled) return;
  try {
    await stopBgm();
    const { sound } = await Audio.Sound.createAsync(assetModule, {
      isLooping: true,
      volume: 0.4,
      shouldPlay: true,
    });
    bgmSound = sound;
  } catch (e) {
    console.warn('[audio] playBgm failed:', e);
  }
}

export async function stopBgm(): Promise<void> {
  if (!bgmSound) return;
  try {
    await bgmSound.stopAsync();
    await bgmSound.unloadAsync();
    bgmSound = null;
  } catch (e) {
    console.warn('[audio] stopBgm failed:', e);
  }
}

export async function playSe(assetModule: number): Promise<void> {
  if (Platform.OS === 'web' || !seEnabled) return;
  try {
    const { sound } = await Audio.Sound.createAsync(assetModule, {
      shouldPlay: true,
      volume: 0.8,
    });
    // 再生完了後にアンロード（メモリリーク防止）
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync().catch(() => {});
      }
    });
  } catch (e) {
    console.warn('[audio] playSe failed:', e);
  }
}

export function setBgmEnabled(enabled: boolean): void {
  bgmEnabled = enabled;
  if (!enabled) stopBgm().catch(() => {});
}

export function setSeEnabled(enabled: boolean): void {
  seEnabled = enabled;
}
