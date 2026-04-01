import React from 'react';
import Svg, { Circle, Path, Rect, G } from 'react-native-svg';

type IconName =
  | 'shop' | 'coin' | 'lock' | 'fire' | 'check' | 'medal'
  | 'rocket' | 'star' | 'trophy' | 'calendar' | 'lightning'
  | 'galaxy' | 'wormhole' | 'target' | 'crown' | 'diamond'
  | 'home' | 'retry' | 'earth' | 'nebula' | 'blackhole' | 'sparkle';

interface IconSvgProps {
  name: IconName;
  size?: number;
  color?: string;
}

export const IconSvg: React.FC<IconSvgProps> = ({ name, size = 24, color = '#FFFFFF' }) => {
  switch (name) {
    case 'shop':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ショップ">
          <Path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21L4.27 2H1v2h2l3.6 7.59L5.25 14c-.16.28-.25.61-.25.96C5 16.1 5.9 17 7 17h12v-2H7.42c-.13 0-.25-.11-.25-.25l.03-.12.9-1.63z" fill={color} />
        </Svg>
      );

    case 'coin':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="コイン">
          <Circle cx="12" cy="12" r="10" fill="#FFD700" />
          <Circle cx="12" cy="12" r="8" fill="#FFA000" />
          <Path d="M12 7v10M9 9h4.5c.83 0 1.5.67 1.5 1.5S14.33 12 13.5 12H10.5c-.83 0-1.5.67-1.5 1.5S9.67 15 10.5 15H15" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
        </Svg>
      );

    case 'lock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ロック">
          <Path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill={color} />
        </Svg>
      );

    case 'fire':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="炎">
          <Path d="M13.5 .67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="#FF6B35" />
        </Svg>
      );

    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="チェック">
          <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4CAF50" />
        </Svg>
      );

    case 'medal':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="実績">
          <Circle cx="12" cy="15" r="7" fill="#FFD700" />
          <Circle cx="12" cy="15" r="5" fill="#FFA000" />
          <Path d="M12 12l1.54 3.12 3.46.5-2.5 2.44.59 3.44L12 19.77l-3.09 1.73.59-3.44L7 15.62l3.46-.5L12 12z" fill="#FFD700" />
          <Path d="M8 3l-2 5h3l1-3 1 3h3l-2-5H8z" fill="#B0BEC5" />
        </Svg>
      );

    case 'rocket':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ロケット">
          <Path d="M12 2C8.5 2 5.5 5 5.5 5L3 15l3-1 1 4 2-3c1 .5 2 .5 3 0l2 3 1-4 3 1L16 5S15.5 2 12 2z" fill={color} />
          <Circle cx="12" cy="9" r="2" fill="#0A0E27" />
          <Path d="M6 15l-3 2 1 2 4-1z" fill="#FF6B35" />
          <Path d="M18 15l3 2-1 2-4-1z" fill="#FF6B35" />
        </Svg>
      );

    case 'star':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="スター">
          <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFD700" />
        </Svg>
      );

    case 'trophy':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="トロフィー">
          <Path d="M12 15c-3.31 0-6-2.69-6-6V3h12v6c0 3.31-2.69 6-6 6z" fill="#FFD700" />
          <Path d="M6 3H3v3c0 1.66 1.34 3 3 3V3z" fill="#FFB300" />
          <Path d="M18 3h3v3c0 1.66-1.34 3-3 3V3z" fill="#FFB300" />
          <Rect x="9" y="15" width="6" height="2" fill="#FFD700" />
          <Rect x="7" y="17" width="10" height="2" fill="#FFD700" />
        </Svg>
      );

    case 'calendar':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="カレンダー">
          <Path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" fill={color} />
        </Svg>
      );

    case 'lightning':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ライトニング">
          <Path d="M7 2v11h3v9l7-12h-4l4-8z" fill="#FFD700" />
        </Svg>
      );

    case 'galaxy':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="銀河">
          <Circle cx="12" cy="12" r="3" fill={color} />
          <Path d="M12 2a10 10 0 0 1 10 10c0 2-5 6-10 6S2 14 2 12A10 10 0 0 1 12 2z" fill="none" stroke={color} strokeWidth="1.5" />
          <Path d="M12 22a10 10 0 0 1-10-10c0-2 5-6 10-6s10 4 10 6A10 10 0 0 1 12 22z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
        </Svg>
      );

    case 'wormhole':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ワームホール">
          <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
          <Circle cx="12" cy="12" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
          <Circle cx="12" cy="12" r="2" fill={color} />
        </Svg>
      );

    case 'target':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ターゲット">
          <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
          <Circle cx="12" cy="12" r="6" fill="none" stroke={color} strokeWidth="2" />
          <Circle cx="12" cy="12" r="2" fill={color} />
        </Svg>
      );

    case 'crown':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="クラウン">
          <Path d="M5 16L3 5l5.5 5L12 2l3.5 8L21 5l-2 11H5zm0 2h14v2H5v-2z" fill="#FFD700" />
        </Svg>
      );

    case 'diamond':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ダイヤモンド">
          <Path d="M5 7l-2 5 9 9 9-9-2-5H5zm7 10.5L5.5 12H18.5L12 17.5z" fill="#64B5F6" />
          <Path d="M8 7l-1 5h10l-1-5H8z" fill="#90CAF9" />
        </Svg>
      );

    case 'home':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ホーム">
          <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />
        </Svg>
      );

    case 'retry':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="リトライ">
          <Path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" fill={color} />
        </Svg>
      );

    case 'earth':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="地球">
          <Circle cx="12" cy="12" r="10" fill="#4A90D9" />
          <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#2196F3" opacity="0.6" />
        </Svg>
      );

    case 'nebula':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="星雲">
          <Circle cx="12" cy="12" r="3" fill="#9B59B6" />
          <Path d="M12 2C8 2 4 6 4 10c0 2 4 5 8 5s8-3 8-5C20 6 16 2 12 2z" fill="none" stroke="#9B59B6" strokeWidth="1.5" opacity="0.8" />
          <Path d="M12 22c4 0 8-4 8-8 0-2-4-5-8-5s-8 3-8 5c0 4 4 8 8 8z" fill="none" stroke="#7C4DFF" strokeWidth="1.5" opacity="0.5" />
          <Circle cx="6" cy="7" r="1" fill="#FFFFFF" opacity="0.6" />
          <Circle cx="18" cy="9" r="1" fill="#FFFFFF" opacity="0.6" />
          <Circle cx="9" cy="18" r="1" fill="#FFFFFF" opacity="0.6" />
        </Svg>
      );

    case 'blackhole':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="ブラックホール">
          <Circle cx="12" cy="12" r="10" fill="none" stroke="#2C3E50" strokeWidth="2" />
          <Circle cx="12" cy="12" r="7" fill="none" stroke="#34495E" strokeWidth="1.5" opacity="0.7" />
          <Circle cx="12" cy="12" r="4" fill="none" stroke="#4A4A6A" strokeWidth="1" opacity="0.5" />
          <Circle cx="12" cy="12" r="2" fill="#1A1A2E" />
        </Svg>
      );

    case 'sparkle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityLabel="輝き">
          <Path d="M12 2l2 7h7l-5.7 4.1 2.2 7L12 16l-5.5 4.1 2.2-7L3 9h7z" fill="#F39C12" />
          <Circle cx="5" cy="5" r="1.5" fill="#FFD700" opacity="0.8" />
          <Circle cx="19" cy="5" r="1.5" fill="#FFD700" opacity="0.8" />
          <Circle cx="5" cy="19" r="1" fill="#FFD700" opacity="0.6" />
          <Circle cx="19" cy="19" r="1" fill="#FFD700" opacity="0.6" />
        </Svg>
      );

    default:
      return null;
  }
};

/** カテゴリに対応するアイコン名を返す */
export function getCategoryIcon(category: string): IconName {
  switch (category) {
    case 'launch': return 'rocket';
    case 'clear': return 'trophy';
    case 'star': return 'star';
    case 'daily': return 'calendar';
    case 'special': return 'wormhole';
    default: return 'medal';
  }
}

/** ワールドIDに対応するアイコン名を返す */
export function getWorldIcon(worldId: number): IconName {
  switch (worldId) {
    case 1: return 'earth';
    case 2: return 'nebula';
    case 3: return 'blackhole';
    case 4: return 'wormhole';
    case 5: return 'sparkle';
    default: return 'galaxy';
  }
}
