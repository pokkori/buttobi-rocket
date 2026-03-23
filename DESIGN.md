# ぶっ飛びロケット (Rocket Fling) 詳細設計書 v1.0

---

## 1. プロジェクト構成

```
rocket-fling/
├── app/
│   ├── _layout.tsx                   # Root layout (expo-router)
│   ├── index.tsx                     # ホーム画面（タイトル）
│   ├── stages/
│   │   ├── _layout.tsx               # Stages layout
│   │   ├── index.tsx                 # ワールド選択画面
│   │   └── [worldId].tsx             # ステージ選択画面
│   ├── game/
│   │   └── [stageId].tsx             # ゲーム画面
│   ├── result/
│   │   └── [stageId].tsx             # リザルト画面
│   ├── shop/
│   │   └── index.tsx                 # ショップ画面
│   ├── daily/
│   │   └── index.tsx                 # デイリーチャレンジ画面
│   ├── achievements/
│   │   └── index.tsx                 # 実績画面
│   └── settings/
│       └── index.tsx                 # 設定画面
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── GameCanvas.tsx        # Skiaメインキャンバス
│   │   │   ├── Rocket.tsx            # ロケット描画
│   │   │   ├── Planet.tsx            # 惑星描画
│   │   │   ├── GoalStar.tsx          # ゴール星描画
│   │   │   ├── TrailRenderer.tsx     # 軌跡描画（ネオンライン）
│   │   │   ├── SlingshotUI.tsx       # スリングショット操作UI
│   │   │   ├── FuelGauge.tsx         # 燃料ゲージ
│   │   │   ├── BlackHole.tsx         # ブラックホール描画
│   │   │   ├── Wormhole.tsx          # ワームホール描画
│   │   │   ├── AsteroidBelt.tsx      # 小惑星帯描画
│   │   │   ├── Booster.tsx           # ブースター描画
│   │   │   └── StarField.tsx         # 背景星描画
│   │   ├── ui/
│   │   │   ├── Button.tsx            # 共通ボタン
│   │   │   ├── StarRating.tsx        # 星3評価表示
│   │   │   ├── WorldCard.tsx         # ワールドカード
│   │   │   ├── StageButton.tsx       # ステージボタン
│   │   │   ├── SkinCard.tsx          # スキンカード
│   │   │   ├── AchievementCard.tsx   # 実績カード
│   │   │   ├── CoinDisplay.tsx       # コイン表示
│   │   │   └── Modal.tsx             # 共通モーダル
│   │   └── share/
│   │       ├── TrajectoryCapture.tsx  # 軌跡キャプチャ
│   │       └── ClearCard.tsx          # クリアOGPカード
│   ├── engine/
│   │   ├── PhysicsEngine.ts          # 重力シミュレーション
│   │   ├── CollisionDetector.ts      # 衝突判定
│   │   ├── TrajectoryCalculator.ts   # 軌跡計算
│   │   └── SlingshotCalculator.ts    # スリングショット計算
│   ├── data/
│   │   ├── stages/
│   │   │   ├── world1.ts             # 太陽系（ステージ1-20）
│   │   │   ├── world2.ts             # 星雲帯（ステージ21-40）
│   │   │   ├── world3.ts             # ブラックホール地帯（ステージ41-60）
│   │   │   ├── world4.ts             # ワームホール回廊（ステージ61-80）
│   │   │   └── world5.ts             # 銀河の果て（ステージ81-100）
│   │   ├── skins.ts                  # ロケットスキンデータ
│   │   ├── achievements.ts           # 実績データ
│   │   └── dailyChallenges.ts        # デイリーチャレンジデータ
│   ├── hooks/
│   │   ├── useGameLoop.ts            # ゲームループ管理
│   │   ├── useSlingshot.ts           # スリングショット操作
│   │   ├── usePhysics.ts             # 物理演算フック
│   │   ├── useSound.ts              # サウンド管理
│   │   ├── useHaptics.ts            # ハプティクス管理
│   │   ├── useStorage.ts            # AsyncStorage操作
│   │   ├── useAds.ts                # 広告管理
│   │   └── useShare.ts              # シェア機能
│   ├── stores/
│   │   ├── gameStore.ts              # ゲーム状態（zustand）
│   │   ├── progressStore.ts          # 進行状況
│   │   └── settingsStore.ts          # 設定
│   ├── types/
│   │   └── index.ts                  # 全型定義
│   ├── constants/
│   │   ├── physics.ts                # 物理定数
│   │   ├── layout.ts                 # レイアウト定数
│   │   ├── colors.ts                 # カラーパレット
│   │   └── storage.ts               # AsyncStorageキー
│   └── utils/
│       ├── vector.ts                 # ベクトル演算ユーティリティ
│       ├── math.ts                   # 数学ユーティリティ
│       ├── share.ts                  # シェアユーティリティ
│       └── format.ts                 # フォーマットユーティリティ
├── assets/
│   ├── images/
│   │   ├── rockets/                  # ロケットスキン画像（10種）
│   │   ├── planets/                  # 惑星画像
│   │   ├── effects/                  # エフェクト画像
│   │   └── ui/                       # UI画像
│   ├── sounds/
│   │   ├── launch.mp3               # 発射音
│   │   ├── boost.mp3                # ブースト音
│   │   ├── goal.mp3                 # ゴール音
│   │   ├── crash.mp3                # 衝突音
│   │   ├── wormhole.mp3             # ワームホール音
│   │   ├── blackhole.mp3            # ブラックホール音
│   │   ├── star1.mp3                # 星1獲得音
│   │   ├── star2.mp3                # 星2獲得音
│   │   ├── star3.mp3                # 星3獲得音
│   │   ├── button.mp3               # ボタンタップ音
│   │   ├── coin.mp3                 # コイン獲得音
│   │   └── bgm/
│   │       ├── title.mp3            # タイトルBGM
│   │       ├── world1.mp3           # ワールド1 BGM
│   │       ├── world2.mp3           # ワールド2 BGM
│   │       ├── world3.mp3           # ワールド3 BGM
│   │       ├── world4.mp3           # ワールド4 BGM
│   │       └── world5.mp3           # ワールド5 BGM
│   └── fonts/
│       └── SpaceMono-Bold.ttf       # ゲームフォント
├── app.json                          # Expo設定
├── package.json
├── tsconfig.json
├── babel.config.js
├── eas.json                          # EAS Build設定
└── DESIGN.md                         # 本ファイル
```

---

## 2. package.json

```json
{
  "name": "rocket-fling",
  "version": "1.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "build:android": "eas build --platform android",
    "build:ios": "eas build --platform ios",
    "lint": "eslint . --ext .ts,.tsx"
  },
  "dependencies": {
    "expo": "~53.0.0",
    "expo-router": "~4.0.0",
    "expo-status-bar": "~2.0.0",
    "expo-haptics": "~14.0.0",
    "expo-av": "~15.0.0",
    "expo-sharing": "~13.0.0",
    "expo-file-system": "~18.0.0",
    "expo-image-manipulator": "~13.0.0",
    "react": "18.3.1",
    "react-native": "0.76.7",
    "@shopify/react-native-skia": "1.11.0",
    "react-native-gesture-handler": "~2.21.0",
    "react-native-reanimated": "~3.17.0",
    "@react-native-async-storage/async-storage": "2.1.0",
    "zustand": "5.0.2",
    "react-native-google-mobile-ads": "14.6.0",
    "react-native-iap": "12.15.0",
    "expo-font": "~13.0.0",
    "expo-splash-screen": "~0.29.0",
    "react-native-safe-area-context": "4.14.1",
    "react-native-screens": "~4.5.0"
  },
  "devDependencies": {
    "@babel/core": "^7.26.0",
    "@types/react": "~18.3.12",
    "typescript": "~5.3.3",
    "eslint": "^8.57.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0"
  }
}
```

---

## 3. TypeScript型定義 (src/types/index.ts)

```typescript
// ========================================
// ベクトル・座標系
// ========================================

/** 2Dベクトル */
export interface Vector2D {
  x: number;
  y: number;
}

/** 正規化された座標（0-1の範囲、画面サイズ非依存） */
export interface NormalizedPosition {
  nx: number; // 0.0 ~ 1.0（左端〜右端）
  ny: number; // 0.0 ~ 1.0（上端〜下端）
}

// ========================================
// ゲームオブジェクト
// ========================================

/** ロケット状態 */
export interface RocketState {
  position: Vector2D;
  velocity: Vector2D;
  rotation: number;       // ラジアン（進行方向）
  fuel: number;           // 0.0 ~ 1.0
  isLaunched: boolean;
  isAlive: boolean;
  skinId: string;
  trail: Vector2D[];      // 軌跡ポイント（最大300点）
}

/** 惑星 */
export interface Planet {
  id: string;
  position: NormalizedPosition;
  mass: number;           // 1 ~ 100（重力強度に影響）
  radius: number;         // 正規化された半径 0.02 ~ 0.08
  color: string;          // hex色
  hasRing: boolean;       // 輪っかの有無
  type: 'rocky' | 'gas' | 'ice' | 'lava';
}

/** ゴール星 */
export interface GoalStar {
  position: NormalizedPosition;
  radius: number;         // 当たり判定半径（正規化）0.015 ~ 0.03
  pulseSpeed: number;     // 点滅速度 0.5 ~ 2.0
}

/** ブラックホール */
export interface BlackHole {
  id: string;
  position: NormalizedPosition;
  mass: number;           // 200 ~ 500（超強力引力）
  eventHorizonRadius: number; // 吸い込み判定半径 0.03 ~ 0.06
  visualRadius: number;   // 見た目の半径 0.05 ~ 0.10
}

/** ワームホール */
export interface Wormhole {
  id: string;
  entryPosition: NormalizedPosition;
  exitPosition: NormalizedPosition;
  entryRadius: number;    // 0.025
  exitRadius: number;     // 0.025
  exitAngle: number;      // 射出角度（ラジアン）
  speedMultiplier: number; // 射出時の速度倍率 0.8 ~ 1.5
}

/** 小惑星帯 */
export interface AsteroidBelt {
  id: string;
  points: NormalizedPosition[]; // ベルトの中心線ポイント（3~6点）
  width: number;          // ベルト幅（正規化）0.03 ~ 0.06
  density: number;        // 小惑石密度 1 ~ 5（描画個数に影響）
  speed: number;          // 流れる速度 0.0 ~ 2.0（0=静止）
}

/** ブースター */
export interface Booster {
  id: string;
  position: NormalizedPosition;
  radius: number;         // 取得判定半径 0.02
  direction: number;      // 加速方向（ラジアン）
  power: number;          // 加速力 50 ~ 200
}

/** 特殊オブジェクトの統合型 */
export type SpecialObject =
  | { type: 'blackhole'; data: BlackHole }
  | { type: 'wormhole'; data: Wormhole }
  | { type: 'asteroidBelt'; data: AsteroidBelt }
  | { type: 'booster'; data: Booster };

// ========================================
// ステージ
// ========================================

/** ステージデータ */
export interface StageData {
  id: number;             // 1 ~ 100
  worldId: number;        // 1 ~ 5
  name: string;           // ステージ名（日本語）
  rocketStart: NormalizedPosition;   // ロケット初期位置
  rocketAngle: number;    // ロケット初期角度（ラジアン）
  goalStar: GoalStar;
  planets: Planet[];
  specialObjects: SpecialObject[];
  initialFuel: number;    // 初期燃料 0.5 ~ 1.0
  starThresholds: StarThresholds;
  maxTrailLength: number; // 軌跡最大長 200 ~ 400
  bgColor: string;        // 背景色
  difficulty: 1 | 2 | 3 | 4 | 5;
}

/** 星3評価の燃料閾値 */
export interface StarThresholds {
  star3: number; // 残り燃料がこれ以上 → 星3（例: 0.6）
  star2: number; // 残り燃料がこれ以上 → 星2（例: 0.3）
  star1: number; // ゴールすれば最低星1（常に0.0）
}

/** ワールドデータ */
export interface WorldData {
  id: number;             // 1 ~ 5
  name: string;           // ワールド名
  description: string;    // 説明
  themeColor: string;     // テーマカラー hex
  bgGradient: [string, string]; // 背景グラデーション
  requiredStars: number;  // アンロックに必要な総星数
  stageIds: number[];     // 含まれるステージID配列
  icon: string;           // アイコン絵文字
}

// ========================================
// プレイヤーデータ
// ========================================

/** ステージクリア結果 */
export interface StageResult {
  stageId: number;
  stars: 0 | 1 | 2 | 3;
  bestFuelRemaining: number; // 最高残燃料
  clearCount: number;
  bestTrajectory: Vector2D[] | null; // 最高評価時の軌跡（シェア用）
}

/** プレイヤー進行データ */
export interface PlayerProgress {
  totalStars: number;
  clearedStages: Record<number, StageResult>; // stageId -> result
  unlockedWorlds: number[];  // アンロック済みワールドID
  coins: number;
  unlockedSkins: string[];   // アンロック済みスキンID
  equippedSkinId: string;
  achievements: Record<string, AchievementProgress>;
  dailyChallenge: DailyChallengeProgress;
  totalLaunches: number;
  totalPlayTimeMs: number;
}

/** 実績進行 */
export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  isUnlocked: boolean;
  unlockedAt: number | null; // timestamp
}

/** デイリーチャレンジ進行 */
export interface DailyChallengeProgress {
  lastPlayedDate: string;    // "YYYY-MM-DD"
  streak: number;            // 連続日数
  todayCleared: boolean;
  todayStars: 0 | 1 | 2 | 3;
}

// ========================================
// スキン
// ========================================

/** ロケットスキン */
export interface RocketSkin {
  id: string;
  name: string;
  description: string;
  price: number;          // コイン価格（0 = デフォルト）
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  trailColor: string;     // 軌跡の色 hex
  trailWidth: number;     // 軌跡の太さ 2 ~ 6
  glowColor: string;      // グロー色
  unlockCondition: 'default' | 'purchase' | 'achievement' | 'daily';
  achievementId?: string;  // achievement解放の場合
}

// ========================================
// 実績
// ========================================

/** 実績定義 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;           // 絵文字
  targetValue: number;    // 達成に必要な値
  rewardCoins: number;    // 報酬コイン
  rewardSkinId?: string;  // 報酬スキン（任意）
  category: 'launch' | 'clear' | 'star' | 'special' | 'daily';
}

// ========================================
// デイリーチャレンジ
// ========================================

/** デイリーチャレンジ定義 */
export interface DailyChallenge {
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0=日曜
  name: string;
  description: string;
  stageConfig: Omit<StageData, 'id' | 'worldId' | 'name' | 'difficulty'>;
  bonusCoins: number;
}

// ========================================
// ゲームステート
// ========================================

/** ゲーム全体の状態 */
export interface GameState {
  phase: GamePhase;
  rocket: RocketState;
  currentStage: StageData | null;
  slingshotState: SlingshotState;
  elapsedMs: number;      // 経過時間
  isPaused: boolean;
}

/** ゲームフェーズ */
export type GamePhase =
  | 'aiming'      // スリングショット操作中
  | 'flying'      // ロケット飛行中
  | 'goal'        // ゴール到達
  | 'crashed'     // 衝突/画面外
  | 'absorbed';   // ブラックホール吸収

/** スリングショット状態 */
export interface SlingshotState {
  isDragging: boolean;
  dragStart: Vector2D | null;  // ドラッグ開始点
  dragCurrent: Vector2D | null; // 現在のドラッグ位置
  angle: number;               // 発射角度（ラジアン）
  power: number;               // 発射力 0.0 ~ 1.0
  predictedTrajectory: Vector2D[]; // 予測軌道（20点）
}

// ========================================
// 広告・課金
// ========================================

/** IAP商品 */
export interface IAPProduct {
  id: string;
  name: string;
  price: string;
  coins: number;
  isPopular: boolean;
}

/** 広告タイプ */
export type AdType = 'banner' | 'interstitial' | 'rewarded';

// ========================================
// 設定
// ========================================

/** アプリ設定 */
export interface AppSettings {
  bgmVolume: number;      // 0.0 ~ 1.0
  sfxVolume: number;      // 0.0 ~ 1.0
  hapticsEnabled: boolean;
  showTrajectoryPreview: boolean; // 予測軌道表示
  language: 'ja' | 'en';
}
```

---

## 4. 画面設計

### 4.1 タイトル画面 (app/index.tsx)

```
┌──────────────────────────────┐
│          [宇宙背景・星]        │
│                              │
│                              │
│      🚀                      │
│    ぶっ飛びロケット            │
│     Rocket Fling             │
│                              │
│   ┌────────────────────┐     │
│   │    ▶ はじめる       │     │
│   └────────────────────┘     │
│                              │
│   ┌────────────────────┐     │
│   │   🏆 デイリー       │     │
│   └────────────────────┘     │
│                              │
│   [⚙設定]   [🏅実績]   [🛒]  │
│                              │
│        💰 1,250 coins        │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

**仕様**:
- 背景: Skiaで描画する星空アニメーション（星50個、ランダムに明滅）
- ロケットアイコン: 装備中のスキンで表示、ゆっくり回転アニメーション
- 「はじめる」タップ → ワールド選択画面へ遷移
- 「デイリー」タップ → デイリーチャレンジ画面へ遷移
- 設定・実績・ショップは画面下部に横並び
- コイン表示は常に右上に固定
- Banner広告: 画面最下部に320x50

### 4.2 ワールド選択画面 (app/stages/index.tsx)

```
┌──────────────────────────────┐
│ ← 戻る          💰 1,250    │
│                              │
│     ワールド選択              │
│     ⭐ 総獲得星: 87/300      │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌍 W1: 太陽系             │ │
│ │ ★★★★☆ 15/20クリア       │ │
│ │ 「最初の冒険」             │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌌 W2: 星雲帯             │ │
│ │ ★★★☆☆ 12/20クリア       │ │
│ │ 「輝くガスの海」           │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🕳 W3: ブラックホール地帯  │ │
│ │ 🔒 星45個でアンロック       │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌀 W4: ワームホール回廊    │ │
│ │ 🔒 星100個でアンロック      │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🌟 W5: 銀河の果て          │ │
│ │ 🔒 星180個でアンロック      │ │
│ └──────────────────────────┘ │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

**仕様**:
- 縦スクロールリスト
- アンロック条件を満たしていないワールドはグレーアウト+🔒表示
- 各ワールドカードにクリア数/20とテーマカラーのグラデーション背景
- タップでステージ選択画面へ遷移

### 4.3 ステージ選択画面 (app/stages/[worldId].tsx)

```
┌──────────────────────────────┐
│ ← 戻る    W1:太陽系   💰    │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │   │
│  │⭐⭐⭐│ │⭐⭐⭐│ │⭐⭐☆│ │⭐☆☆│   │
│  └───┘ └───┘ └───┘ └───┘   │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │ 5 │ │ 6 │ │ 7 │ │ 8 │   │
│  │⭐☆☆│ │ - │ │🔒 │ │🔒 │   │
│  └───┘ └───┘ └───┘ └───┘   │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │ 9 │ │10 │ │11 │ │12 │   │
│  │🔒 │ │🔒 │ │🔒 │ │🔒 │   │
│  └───┘ └───┘ └───┘ └───┘   │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │13 │ │14 │ │15 │ │16 │   │
│  │🔒 │ │🔒 │ │🔒 │ │🔒 │   │
│  └───┘ └───┘ └───┘ └───┘   │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐   │
│  │17 │ │18 │ │19 │ │20 │   │
│  │🔒 │ │🔒 │ │🔒 │ │🔒 │   │
│  └───┘ └───┘ └───┘ └───┘   │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

**仕様**:
- 4列x5行のグリッド
- 各ステージボタン: 番号 + 星3つ評価 + 難易度カラーリング
- アンロック条件: 前のステージをクリア（星1以上）
- 未クリア: 番号+「-」表示、タップでゲーム画面へ
- ロック: 🔒表示、タップ不可

### 4.4 ゲーム画面 (app/game/[stageId].tsx)

```
┌──────────────────────────────┐
│ [⏸]  Stage 1-3   [燃料ゲージ]│
│                              │
│            ★(ゴール)         │
│           ·                  │
│          ·                   │
│    ·····                     │
│   ·     🪐(惑星B)            │
│  · (予測軌道・点線)            │
│                              │
│       🪐(惑星A)              │
│                              │
│                              │
│                              │
│                              │
│  ─────┐                     │
│       │                     │
│  🚀←──┘ (スリングショット)    │
│  (ドラッグで引っ張る)          │
│                              │
│                              │
│                              │
└──────────────────────────────┘

※ 飛行中:
┌──────────────────────────────┐
│ [⏸]  Stage 1-3   [燃料ゲージ]│
│                              │
│            ★(ゴール)         │
│                              │
│                ╭─🚀          │
│               ╱              │
│              ╱               │
│    ╭────────╯                │
│   ╱     🪐(惑星B)            │
│  ╱  (ネオン軌跡)              │
│ ╱                            │
│╯     🪐(惑星A)               │
│                              │
│                              │
│                              │
│  ⊙ (発射地点)                │
│                              │
│                              │
│     [🔄 リトライ] ← 飛行中も │
│                    タップ可能 │
└──────────────────────────────┘
```

**仕様**:
- 全画面Skiaキャンバス（SafeAreaの外まで）
- HUD: 左上=一時停止ボタン、中央=ステージ名、右上=燃料ゲージ（横バー）
- スリングショット: ロケットから反対方向にドラッグ、発射方向の予測点線を表示
- 飛行中: ネオン軌跡をSkia Pathで描画（最新部分が最も明るい）
- リトライボタン: 右下に常時表示、飛行中でもタップ可能（即リスタート）
- 衝突時: 画面を0.2秒赤フラッシュ + 自動で1秒後にリトライ可能状態
- ゴール時: 星が光る演出 → 0.5秒後にリザルト画面へ

### 4.5 リザルト画面 (app/result/[stageId].tsx)

```
┌──────────────────────────────┐
│                              │
│         ✨ CLEAR! ✨         │
│                              │
│      Stage 1-3 「月面散歩」   │
│                              │
│         ⭐ ⭐ ⭐             │
│    (星が1個ずつ回転して出現)   │
│                              │
│    残り燃料: 72%              │
│    発射回数: 1回              │
│    獲得コイン: +30            │
│                              │
│ ┌──────────────────────────┐ │
│ │ [軌跡プレビュー(Skia)]     │ │
│ │  美しい軌跡のミニマップ     │ │
│ └──────────────────────────┘ │
│                              │
│  [📤シェア]   [🎬広告で2倍]   │
│                              │
│ ┌────────────────────────┐   │
│ │      ▶ 次のステージ     │   │
│ └────────────────────────┘   │
│                              │
│ [🔄 リトライ]  [🏠 ステージ選択]│
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

**仕様**:
- 星演出: 0.3秒間隔で1個ずつ回転しながらスケールイン
- 軌跡プレビュー: Skiaキャンバスにミニマップとして軌跡を再描画
- シェアボタン: 軌跡画像を生成してOS標準シェア
- 広告で2倍: リワード広告視聴でコイン2倍
- 次のステージ: 最大ボタン、即遷移
- Interstitial広告: 3ステージクリアごとに表示（result画面遷移前）

### 4.6 ショップ画面 (app/shop/index.tsx)

```
┌──────────────────────────────┐
│ ← 戻る     🛒 ショップ  💰  │
│                              │
│  ─── ロケットスキン ───       │
│                              │
│ ┌───────────┐ ┌───────────┐  │
│ │ 🚀 ノーマル │ │ 🔥 ファイア │  │
│ │ [装備中]   │ │  500コイン  │  │
│ │  Common    │ │   Rare     │  │
│ └───────────┘ └───────────┘  │
│                              │
│ ┌───────────┐ ┌───────────┐  │
│ │ ❄ アイス  │ │ ⚡ サンダー │  │
│ │  500コイン │ │  800コイン  │  │
│ │   Rare    │ │   Epic     │  │
│ └───────────┘ └───────────┘  │
│                              │
│ ┌───────────┐ ┌───────────┐  │
│ │ 🌈 レインボー│ │ 🔒 ゴールド │  │
│ │ 1200コイン  │ │ 実績で解放  │  │
│ │ Legendary  │ │ Legendary  │  │
│ └───────────┘ └───────────┘  │
│                              │
│  ─── コイン購入 ───           │
│                              │
│ [500💰 ¥120] [2000💰 ¥370]   │
│ [5000💰 ¥860 🔥人気]         │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

**仕様**:
- 上半分: スキン一覧（2列グリッド、スクロール）
- 下半分: コインパック（IAP）
- 所持コインで購入可能なスキンは「購入」ボタン表示
- 装備中スキンは「装備中」バッジ
- 実績解放スキンは🔒+条件表示

### 4.7 デイリーチャレンジ画面 (app/daily/index.tsx)

```
┌──────────────────────────────┐
│ ← 戻る    デイリーチャレンジ  │
│                              │
│      🔥 連続 7日目! 🔥       │
│                              │
│    今日のチャレンジ:          │
│  ┌──────────────────────────┐│
│  │  「重力迷宮」              ││
│  │                           ││
│  │  惑星4つの間を             ││
│  │  縫うようにゴールへ        ││
│  │                           ││
│  │  報酬: 50コイン            ││
│  │  ⭐3: +30コイン ボーナス   ││
│  └──────────────────────────┘│
│                              │
│   ┌────────────────────┐     │
│   │   ▶ チャレンジ開始  │     │
│   └────────────────────┘     │
│                              │
│  ── 連続ボーナス ──           │
│  3日: +20💰  7日: +50💰      │
│  14日: +100💰 30日: スキン🚀  │
│                              │
│  [今日: ✅] [昨日: ✅]        │
│  [一昨日: ✅] ...             │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

### 4.8 実績画面 (app/achievements/index.tsx)

```
┌──────────────────────────────┐
│ ← 戻る     🏅 実績          │
│                              │
│  達成: 8/25                   │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🚀 はじめの一歩   ✅       │ │
│ │ 初めてステージをクリア      │ │
│ │ 報酬: 10コイン (受取済み)   │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ ⭐ スターコレクター  7/50   │ │
│ │ 星を50個集める              │ │
│ │ [██████░░░░░░] 14%         │ │
│ │ 報酬: 100コイン             │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ 🕳 ブラックホール生還者 🔒 │ │
│ │ ブラックホールの横をかすめる │ │
│ │ 報酬: 200コイン+スキン      │ │
│ └──────────────────────────┘ │
│                              │
│ ... (スクロール)              │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

### 4.9 設定画面 (app/settings/index.tsx)

```
┌──────────────────────────────┐
│ ← 戻る       ⚙ 設定         │
│                              │
│  ─── サウンド ───             │
│                              │
│  BGM    [━━━━━━━━━○━] 80%   │
│  効果音  [━━━━━━━━━━━○] 100% │
│                              │
│  ─── ゲーム ───               │
│                              │
│  振動    [ON ○──── OFF]      │
│  予測軌道 [ON ○──── OFF]     │
│                              │
│  ─── その他 ───               │
│                              │
│  [利用規約]                   │
│  [プライバシーポリシー]       │
│  [ライセンス]                 │
│  [購入を復元]                 │
│                              │
│  Version 1.0.0               │
│                              │
│  ──────── Banner Ad ──────── │
└──────────────────────────────┘
```

---

## 5. 重力シミュレーション仕様

### 5.1 ベクトル演算ユーティリティ (src/utils/vector.ts)

```typescript
// ベクトル加算
function add(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x + b.x, y: a.y + b.y };
}

// ベクトル減算
function sub(a: Vector2D, b: Vector2D): Vector2D {
  return { x: a.x - b.x, y: a.y - b.y };
}

// スカラー倍
function scale(v: Vector2D, s: number): Vector2D {
  return { x: v.x * s, y: v.y * s };
}

// ベクトルの大きさ
function magnitude(v: Vector2D): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

// 正規化（単位ベクトル）
function normalize(v: Vector2D): Vector2D {
  const mag = magnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

// 2点間の距離
function distance(a: Vector2D, b: Vector2D): number {
  return magnitude(sub(b, a));
}

// 角度からベクトル生成
function fromAngle(radians: number, length: number): Vector2D {
  return { x: Math.cos(radians) * length, y: Math.sin(radians) * length };
}

// ベクトルの角度
function toAngle(v: Vector2D): number {
  return Math.atan2(v.y, v.x);
}
```

### 5.2 物理定数 (src/constants/physics.ts)

```typescript
export const PHYSICS = {
  /** 重力定数（ゲーム内スケール） */
  GRAVITY_CONSTANT: 800,

  /** シミュレーションのタイムステップ（秒） */
  TIME_STEP: 1 / 60,

  /** 1フレームあたりのサブステップ数（精度向上） */
  SUB_STEPS: 4,

  /** ロケットの最大速度（正規化座標/秒） */
  MAX_VELOCITY: 2.0,

  /** ロケットの最小速度（これ以下は停止判定） */
  MIN_VELOCITY: 0.001,

  /** 燃料消費率（毎秒） */
  FUEL_CONSUMPTION_RATE: 0.05,

  /** 惑星衝突時の反発係数（0=完全吸収、1=完全反射） */
  COLLISION_RESTITUTION: 0.0, // 衝突=ミス（反射なし）

  /** 画面外判定のマージン（正規化座標） */
  OUT_OF_BOUNDS_MARGIN: 0.15,

  /** 軌跡ポイント保存間隔（フレーム数） */
  TRAIL_SAVE_INTERVAL: 2,

  /** 最大軌跡ポイント数 */
  MAX_TRAIL_POINTS: 300,

  /** 予測軌道の計算ステップ数 */
  PREDICTION_STEPS: 80,

  /** 予測軌道の表示ポイント数 */
  PREDICTION_DISPLAY_POINTS: 20,

  /** ブラックホール吸収速度（倍率） */
  BLACKHOLE_PULL_MULTIPLIER: 3.0,

  /** ワームホール通過時のクールダウン（フレーム数） */
  WORMHOLE_COOLDOWN_FRAMES: 30,

  /** ブースター加速力 */
  BOOSTER_FORCE: 0.3,
} as const;
```

### 5.3 重力演算エンジン (src/engine/PhysicsEngine.ts)

```
擬似コード: updatePhysics(rocket, stage, dt)

入力:
  rocket: RocketState（現在の位置・速度）
  stage: StageData（惑星・特殊オブジェクト配列）
  dt: number（タイムステップ、通常 1/60）

処理:
  subDt = dt / SUB_STEPS

  FOR i = 0 TO SUB_STEPS - 1:

    // 1. 全惑星からの重力を合算
    totalForce = { x: 0, y: 0 }

    FOR EACH planet IN stage.planets:
      // ロケットから惑星への方向ベクトル
      direction = sub(planet.position, rocket.position)
      dist = magnitude(direction)

      // 最小距離制限（ゼロ除算防止・引力上限）
      dist = max(dist, 0.02)

      // 重力の大きさ = G * M / d^2
      forceMagnitude = GRAVITY_CONSTANT * planet.mass / (dist * dist)

      // 方向ベクトルに力を適用
      forceVector = scale(normalize(direction), forceMagnitude)
      totalForce = add(totalForce, forceVector)

    END FOR

    // 2. ブラックホールの超重力
    FOR EACH obj IN stage.specialObjects WHERE type == 'blackhole':
      direction = sub(obj.data.position, rocket.position)
      dist = magnitude(direction)
      dist = max(dist, 0.01)
      forceMagnitude = GRAVITY_CONSTANT * obj.data.mass * BLACKHOLE_PULL_MULTIPLIER / (dist * dist)
      forceVector = scale(normalize(direction), forceMagnitude)
      totalForce = add(totalForce, forceVector)
    END FOR

    // 3. 速度を更新（加速度 = 力 / 質量、ロケット質量=1固定）
    rocket.velocity = add(rocket.velocity, scale(totalForce, subDt))

    // 4. 最大速度制限
    speed = magnitude(rocket.velocity)
    IF speed > MAX_VELOCITY:
      rocket.velocity = scale(normalize(rocket.velocity), MAX_VELOCITY)

    // 5. 位置を更新
    rocket.position = add(rocket.position, scale(rocket.velocity, subDt))

    // 6. ロケットの回転角度を進行方向に合わせる
    rocket.rotation = toAngle(rocket.velocity)

  END FOR

  // 7. 燃料消費
  rocket.fuel = max(0, rocket.fuel - FUEL_CONSUMPTION_RATE * dt)

  // 8. 軌跡を記録
  IF frameCount % TRAIL_SAVE_INTERVAL == 0:
    rocket.trail.push(copy(rocket.position))
    IF rocket.trail.length > MAX_TRAIL_POINTS:
      rocket.trail.shift()

  RETURN rocket
```

### 5.4 衝突判定 (src/engine/CollisionDetector.ts)

```
擬似コード: checkCollisions(rocket, stage) → CollisionResult

CollisionResult = 'none' | 'goal' | 'planet' | 'blackhole' | 'outOfBounds'
                | { type: 'wormhole', wormhole: Wormhole }
                | { type: 'booster', booster: Booster }

処理:

  // 1. ゴール判定
  goalDist = distance(rocket.position, stage.goalStar.position)
  IF goalDist < stage.goalStar.radius:
    RETURN 'goal'

  // 2. 惑星衝突判定
  FOR EACH planet IN stage.planets:
    planetDist = distance(rocket.position, planet.position)
    IF planetDist < planet.radius:
      RETURN 'planet'

  // 3. ブラックホール吸収判定
  FOR EACH obj IN stage.specialObjects WHERE type == 'blackhole':
    bhDist = distance(rocket.position, obj.data.position)
    IF bhDist < obj.data.eventHorizonRadius:
      RETURN 'blackhole'

  // 4. ワームホール突入判定
  FOR EACH obj IN stage.specialObjects WHERE type == 'wormhole':
    IF NOT wormholeCooldown:
      entryDist = distance(rocket.position, obj.data.entryPosition)
      IF entryDist < obj.data.entryRadius:
        RETURN { type: 'wormhole', wormhole: obj.data }

  // 5. 小惑星帯衝突判定
  FOR EACH obj IN stage.specialObjects WHERE type == 'asteroidBelt':
    FOR EACH segment IN consecutive_pairs(obj.data.points):
      pointDist = distanceToLineSegment(rocket.position, segment[0], segment[1])
      IF pointDist < obj.data.width / 2:
        RETURN 'planet'  // 小惑星帯に当たると破壊

  // 6. ブースター取得判定
  FOR EACH obj IN stage.specialObjects WHERE type == 'booster':
    boostDist = distance(rocket.position, obj.data.position)
    IF boostDist < obj.data.radius:
      RETURN { type: 'booster', booster: obj.data }

  // 7. 画面外判定
  IF rocket.position.x < -OUT_OF_BOUNDS_MARGIN
    OR rocket.position.x > 1.0 + OUT_OF_BOUNDS_MARGIN
    OR rocket.position.y < -OUT_OF_BOUNDS_MARGIN
    OR rocket.position.y > 1.0 + OUT_OF_BOUNDS_MARGIN:
    RETURN 'outOfBounds'

  RETURN 'none'
```

### 5.5 衝突時の処理

| 衝突タイプ | 処理 |
|---|---|
| goal | `phase='goal'`、星評価計算、コイン付与、リザルト遷移 |
| planet | `phase='crashed'`、爆発パーティクル、0.8秒後リトライ可能 |
| blackhole | `phase='absorbed'`、渦巻き吸い込みアニメ（0.5秒）、リトライ |
| outOfBounds | `phase='crashed'`、フェードアウト、即リトライ可能 |
| wormhole | ロケット位置を`exitPosition`に移動、速度方向を`exitAngle`に、速度を`speedMultiplier`倍 |
| booster | 速度に`direction`方向の`power`を加算、ブースター消滅（1ステージ1回のみ） |
| asteroidBelt | `planet`と同じ処理 |

---

## 6. スリングショット操作仕様

### 6.1 操作フロー

```
1. ユーザーがロケットに指を置く（ロケット中心から半径0.08以内）
   → isDragging = true
   → dragStart = タッチ座標

2. 指をドラッグ（引っ張る）
   → dragCurrent = 現在のタッチ座標
   → angle（発射角度）= ロケット位置からdragCurrentへの方向の逆方向
   → power（発射力）= ドラッグ距離 / MAX_DRAG_DISTANCE（clamp 0.0~1.0）
   → 予測軌道を毎フレーム計算して点線表示

3. 指を離す
   → isDragging = false
   → IF power > MIN_POWER_THRESHOLD (0.05):
       ロケット発射（velocity = fromAngle(angle, power * MAX_LAUNCH_SPEED)）
       phase = 'flying'
     ELSE:
       キャンセル（何も起きない）
```

### 6.2 スリングショット計算 (src/engine/SlingshotCalculator.ts)

```
擬似コード: calculateSlingshot(rocketPos, dragStart, dragCurrent)

定数:
  MAX_DRAG_DISTANCE = 0.25   // 正規化座標での最大ドラッグ距離
  MAX_LAUNCH_SPEED = 0.8     // 最大初速（正規化座標/秒）
  MIN_POWER_THRESHOLD = 0.05 // 最小発射力

入力:
  rocketPos: Vector2D  // ロケット位置
  dragCurrent: Vector2D // 現在のドラッグ位置

処理:
  // ドラッグベクトル（ロケットからドラッグ位置への方向）
  dragVector = sub(dragCurrent, rocketPos)
  dragDistance = magnitude(dragVector)

  // 発射方向 = ドラッグの逆方向（引っ張った反対に飛ぶ）
  launchDirection = scale(normalize(dragVector), -1)

  // 発射力 = ドラッグ距離を0~1にマップ
  power = clamp(dragDistance / MAX_DRAG_DISTANCE, 0, 1)

  // 発射角度
  angle = toAngle(launchDirection)

  // 発射速度ベクトル
  launchVelocity = scale(launchDirection, power * MAX_LAUNCH_SPEED)

  RETURN { angle, power, launchVelocity }
```

### 6.3 予測軌道計算 (src/engine/TrajectoryCalculator.ts)

```
擬似コード: predictTrajectory(rocketPos, launchVelocity, stage, steps)

入力:
  rocketPos: Vector2D
  launchVelocity: Vector2D
  stage: StageData
  steps: number = PREDICTION_STEPS (80)

処理:
  points = []
  simPos = copy(rocketPos)
  simVel = copy(launchVelocity)
  simDt = TIME_STEP * 2  // 予測は低精度で高速化

  FOR i = 0 TO steps - 1:
    // 重力計算（updatePhysicsと同じロジック、ただしサブステップなし）
    totalForce = { x: 0, y: 0 }
    FOR EACH planet IN stage.planets:
      direction = sub(planet.position, simPos)
      dist = max(magnitude(direction), 0.02)
      forceMag = GRAVITY_CONSTANT * planet.mass / (dist * dist)
      totalForce = add(totalForce, scale(normalize(direction), forceMag))

    simVel = add(simVel, scale(totalForce, simDt))
    simPos = add(simPos, scale(simVel, simDt))

    // 間引き（PREDICTION_DISPLAY_POINTS個だけ表示）
    IF i % (steps / PREDICTION_DISPLAY_POINTS) == 0:
      points.push(copy(simPos))

    // 衝突したら打ち切り
    IF isOutOfBounds(simPos) OR hitsPlanet(simPos, stage):
      BREAK

  RETURN points  // 点線として描画
```

### 6.4 スリングショットUI描画仕様

| 要素 | 描画方法 |
|---|---|
| ドラッグライン | ロケット位置→ドラッグ位置への白半透明ライン（太さ2px） |
| パワーインジケーター | ドラッグラインの根元に半円弧、power値で弧の長さ変化（緑→黄→赤） |
| 方向矢印 | 発射方向にロケットから伸びる矢印（長さ=power*60px） |
| 予測軌道 | 等間隔のドット（白、α=0.5→0.1のフェードアウト） |

---

## 7. ステージデータ（100ステージ全定義）

### 7.1 ワールド定義

```typescript
export const WORLDS: WorldData[] = [
  {
    id: 1,
    name: '太陽系',
    description: '最初の冒険。基本操作を覚えよう',
    themeColor: '#4A90D9',
    bgGradient: ['#0A0E27', '#1A2151'],
    requiredStars: 0,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 1),
    icon: '🌍',
  },
  {
    id: 2,
    name: '星雲帯',
    description: '輝くガスの海を越えて',
    themeColor: '#9B59B6',
    bgGradient: ['#1A0A2E', '#2D1B69'],
    requiredStars: 25,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 21),
    icon: '🌌',
  },
  {
    id: 3,
    name: 'ブラックホール地帯',
    description: '暗黒の重力に飲み込まれるな',
    themeColor: '#2C3E50',
    bgGradient: ['#000000', '#1A1A2E'],
    requiredStars: 60,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 41),
    icon: '🕳',
  },
  {
    id: 4,
    name: 'ワームホール回廊',
    description: '空間のねじれを利用せよ',
    themeColor: '#1ABC9C',
    bgGradient: ['#0A2E2E', '#162D50'],
    requiredStars: 110,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 61),
    icon: '🌀',
  },
  {
    id: 5,
    name: '銀河の果て',
    description: '全ての要素が牙をむく最終領域',
    themeColor: '#F39C12',
    bgGradient: ['#1A0A00', '#2E1A0A'],
    requiredStars: 180,
    stageIds: Array.from({ length: 20 }, (_, i) => i + 81),
    icon: '🌟',
  },
];
```

### 7.2 全100ステージデータ

座標系: NormalizedPosition（nx: 0.0~1.0 = 左端~右端, ny: 0.0~1.0 = 上端~下端）

#### World 1: 太陽系（ステージ 1-20）

**コンセプト**: 惑星0~2個。特殊オブジェクトなし。基本操作の習得。

```
Stage 1「発射!」 難易度1
  ロケット: (0.2, 0.8) 角度: -π/4
  ゴール: (0.8, 0.2) 半径: 0.04
  惑星: なし
  特殊: なし
  燃料: 1.0
  星閾値: star3=0.7, star2=0.4
  → 直線で飛ばすだけのチュートリアル

Stage 2「ななめ撃ち」 難易度1
  ロケット: (0.15, 0.85) 角度: -π/3
  ゴール: (0.85, 0.15) 半径: 0.035
  惑星: なし
  特殊: なし
  燃料: 1.0
  星閾値: star3=0.7, star2=0.4
  → やや遠い位置へ正確に飛ばす

Stage 3「月面散歩」 難易度1
  ロケット: (0.15, 0.7) 角度: 0
  ゴール: (0.85, 0.3) 半径: 0.035
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:8, radius:0.04, color:"#C0C0C0", ring:false, type:rocky}]
  特殊: なし
  燃料: 1.0
  星閾値: star3=0.6, star2=0.3
  → 初めての惑星。軽い重力で軌道が少し曲がる

Stage 4「引力を感じろ」 難易度1
  ロケット: (0.1, 0.9) 角度: -π/6
  ゴール: (0.9, 0.1) 半径: 0.035
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:15, radius:0.05, color:"#E8A87C", ring:false, type:rocky}]
  特殊: なし
  燃料: 1.0
  星閾値: star3=0.6, star2=0.3
  → 惑星の引力で軌道を曲げてゴールに到達する必要あり

Stage 5「スイングバイ」 難易度2
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.03
  惑星: [{id:"p1", pos:(0.5, 0.35), mass:20, radius:0.05, color:"#D35400", ring:false, type:rocky}]
  特殊: なし
  燃料: 0.9
  星閾値: star3=0.6, star2=0.3
  → 惑星の上を通過するスイングバイを学ぶ

Stage 6「二つの衛星」 難易度2
  ロケット: (0.1, 0.85) 角度: -π/4
  ゴール: (0.9, 0.15) 半径: 0.03
  惑星: [
    {id:"p1", pos:(0.35, 0.55), mass:12, radius:0.04, color:"#3498DB", ring:false, type:ice},
    {id:"p2", pos:(0.65, 0.35), mass:12, radius:0.04, color:"#E74C3C", ring:false, type:lava}
  ]
  特殊: なし
  燃料: 0.9
  星閾値: star3=0.55, star2=0.25
  → 2つの惑星の間を通す

Stage 7「重い星」 難易度2
  ロケット: (0.15, 0.75) 角度: -π/6
  ゴール: (0.5, 0.1) 半径: 0.03
  惑星: [{id:"p1", pos:(0.4, 0.45), mass:30, radius:0.06, color:"#F39C12", ring:true, type:gas}]
  特殊: なし
  燃料: 0.9
  星閾値: star3=0.55, star2=0.25
  → 重い惑星の引力が強い。大きく回り込む必要

Stage 8「Uターン」 難易度2
  ロケット: (0.5, 0.85) 角度: -π/2
  ゴール: (0.5, 0.15) 半径: 0.03
  惑星: [{id:"p1", pos:(0.75, 0.5), mass:25, radius:0.05, color:"#9B59B6", ring:false, type:gas}]
  特殊: なし
  燃料: 0.9
  星閾値: star3=0.5, star2=0.25
  → 真上に打って惑星でUターンさせる

Stage 9「ジグザグ」 難易度2
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.9) 半径: 0.03
  惑星: [
    {id:"p1", pos:(0.35, 0.5), mass:15, radius:0.04, color:"#2ECC71", ring:false, type:rocky},
    {id:"p2", pos:(0.65, 0.5), mass:15, radius:0.04, color:"#E67E22", ring:false, type:lava}
  ]
  特殊: なし
  燃料: 0.85
  星閾値: star3=0.5, star2=0.2
  → 2惑星の間をジグザグに抜ける

Stage 10「土星リング」 難易度2
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.03
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:35, radius:0.07, color:"#F1C40F", ring:true, type:gas}]
  特殊: なし
  燃料: 0.85
  星閾値: star3=0.5, star2=0.2
  → 巨大ガス惑星を大きく迂回するか、近くを高速で通過

Stage 11「二連星」 難易度2
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.03
  惑星: [
    {id:"p1", pos:(0.35, 0.5), mass:20, radius:0.045, color:"#E74C3C", ring:false, type:lava},
    {id:"p2", pos:(0.65, 0.5), mass:20, radius:0.045, color:"#3498DB", ring:false, type:ice}
  ]
  特殊: なし
  燃料: 0.85
  星閾値: star3=0.5, star2=0.2
  → 近接する2惑星の間を真っすぐ抜ける（引力が左右で相殺）

Stage 12「三角形」 難易度3
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.3), mass:15, radius:0.04, color:"#1ABC9C", ring:false, type:ice},
    {id:"p2", pos:(0.7, 0.3), mass:15, radius:0.04, color:"#E74C3C", ring:false, type:lava},
    {id:"p3", pos:(0.5, 0.65), mass:15, radius:0.04, color:"#9B59B6", ring:false, type:gas}
  ]
  特殊: なし
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 三角配置の惑星の間を縫う

Stage 13「重力アシスト」 難易度3
  ロケット: (0.1, 0.5) 角度: π/6
  ゴール: (0.1, 0.1) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:30, radius:0.06, color:"#D35400", ring:true, type:gas}]
  特殊: なし
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 惑星で180度ターンしてスタート付近のゴールへ戻す

Stage 14「大小二つ」 難易度3
  ロケット: (0.15, 0.85) 角度: -π/4
  ゴール: (0.85, 0.15) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.35, 0.6), mass:10, radius:0.035, color:"#BDC3C7", ring:false, type:rocky},
    {id:"p2", pos:(0.65, 0.35), mass:40, radius:0.07, color:"#F39C12", ring:true, type:gas}
  ]
  特殊: なし
  燃料: 0.8
  星閾値: star3=0.4, star2=0.2
  → 小さい惑星で微調整、大きい惑星で大回転

Stage 15「狭い隙間」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.5, 0.4), mass:20, radius:0.05, color:"#E74C3C", ring:false, type:lava},
    {id:"p2", pos:(0.5, 0.6), mass:20, radius:0.05, color:"#3498DB", ring:false, type:ice}
  ]
  特殊: なし
  燃料: 0.8
  星閾値: star3=0.4, star2=0.2
  → 上下の惑星の狭い隙間を力加減で通す

Stage 16「四つ角」 難易度3
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.3), mass:12, radius:0.035, color:"#E74C3C", ring:false, type:lava},
    {id:"p2", pos:(0.7, 0.3), mass:12, radius:0.035, color:"#3498DB", ring:false, type:ice},
    {id:"p3", pos:(0.3, 0.7), mass:12, radius:0.035, color:"#2ECC71", ring:false, type:rocky},
    {id:"p4", pos:(0.7, 0.7), mass:12, radius:0.035, color:"#F39C12", ring:false, type:gas}
  ]
  特殊: なし
  燃料: 0.8
  星閾値: star3=0.4, star2=0.15
  → 4惑星の重力場の中心を突き抜ける

Stage 17「カーブショット」 難易度3
  ロケット: (0.1, 0.1) 角度: π/4
  ゴール: (0.1, 0.9) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.6, 0.3), mass:25, radius:0.05, color:"#8E44AD", ring:false, type:gas},
    {id:"p2", pos:(0.6, 0.7), mass:25, radius:0.05, color:"#16A085", ring:false, type:ice}
  ]
  特殊: なし
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 右に飛ばして2惑星で大カーブさせて戻す

Stage 18「巨大木星」 難易度3
  ロケット: (0.1, 0.85) 角度: -π/6
  ゴール: (0.85, 0.85) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.4), mass:50, radius:0.08, color:"#D4A76A", ring:true, type:gas}]
  特殊: なし
  燃料: 0.75
  星閾値: star3=0.35, star2=0.15
  → 超巨大惑星の引力を利用して大きくカーブ

Stage 19「ピンボール」 難易度3
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.7), mass:10, radius:0.035, color:"#E74C3C", ring:false, type:lava},
    {id:"p2", pos:(0.7, 0.55), mass:10, radius:0.035, color:"#3498DB", ring:false, type:ice},
    {id:"p3", pos:(0.3, 0.4), mass:10, radius:0.035, color:"#2ECC71", ring:false, type:rocky},
    {id:"p4", pos:(0.7, 0.25), mass:10, radius:0.035, color:"#F1C40F", ring:false, type:gas}
  ]
  特殊: なし
  燃料: 0.75
  星閾値: star3=0.35, star2=0.15
  → ジグザグ配置の4惑星の間を縫う

Stage 20「太陽系マスター」 難易度4
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.25, 0.7), mass:18, radius:0.04, color:"#BDC3C7", ring:false, type:rocky},
    {id:"p2", pos:(0.5, 0.5), mass:35, radius:0.06, color:"#F39C12", ring:true, type:gas},
    {id:"p3", pos:(0.75, 0.3), mass:18, radius:0.04, color:"#E74C3C", ring:false, type:lava}
  ]
  特殊: なし
  燃料: 0.7
  星閾値: star3=0.35, star2=0.1
  → ワールド1ボス。3惑星を連続スイングバイ
```

#### World 2: 星雲帯（ステージ 21-40）

**コンセプト**: 惑星2~4個。ブースター登場。小惑星帯が障害物として登場。

```
Stage 21「星雲の入り口」 難易度2
  ロケット: (0.15, 0.8) 角度: -π/4
  ゴール: (0.85, 0.2) 半径: 0.03
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:18, radius:0.045, color:"#9B59B6", ring:false, type:gas}]
  特殊: [{type:'booster', data:{id:"b1", pos:(0.7, 0.4), radius:0.02, direction:-π/4, power:80}}]
  燃料: 0.9
  星閾値: star3=0.6, star2=0.3
  → ブースターの使い方を覚える

Stage 22「最初の小惑星帯」 難易度2
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.03
  惑星: [{id:"p1", pos:(0.5, 0.35), mass:15, radius:0.04, color:"#8E44AD", ring:false, type:gas}]
  特殊: [{type:'asteroidBelt', data:{id:"a1", points:[(0.5,0.6),(0.5,0.8)], width:0.04, density:3, speed:0}}]
  燃料: 0.9
  星閾値: star3=0.6, star2=0.3
  → 小惑星帯を避けて上を通る

Stage 23「ブーストカーブ」 難易度2
  ロケット: (0.1, 0.9) 角度: -π/6
  ゴール: (0.1, 0.1) 半径: 0.03
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:22, radius:0.05, color:"#6C3483", ring:false, type:gas}]
  特殊: [{type:'booster', data:{id:"b1", pos:(0.75, 0.35), radius:0.02, direction:π, power:100}}]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → 惑星で回ってブースターで加速して戻る

Stage 24「小惑星回廊」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: []
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.3,0.0),(0.3,0.35)], width:0.04, density:3, speed:0}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.6,0.65),(0.6,1.0)], width:0.04, density:3, speed:0}}
  ]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → 2本の小惑星帯の隙間を通す（S字飛行）

Stage 25「ガスジャイアント」 難易度3
  ロケット: (0.15, 0.85) 角度: -π/4
  ゴール: (0.85, 0.85) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.5, 0.4), mass:40, radius:0.07, color:"#A569BD", ring:true, type:gas},
    {id:"p2", pos:(0.3, 0.7), mass:10, radius:0.03, color:"#5DADE2", ring:false, type:ice}
  ]
  特殊: []
  燃料: 0.85
  星閾値: star3=0.5, star2=0.2
  → 巨大ガス惑星+小惑星のコンビネーション

Stage 26「ダブルブースト」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.1) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.6), mass:20, radius:0.045, color:"#AF7AC5", ring:false, type:gas}]
  特殊: [
    {type:'booster', data:{id:"b1", pos:(0.35, 0.35), radius:0.02, direction:-π/3, power:80}},
    {type:'booster', data:{id:"b2", pos:(0.7, 0.2), radius:0.02, direction:-π/6, power:80}}
  ]
  燃料: 0.8
  星閾値: star3=0.5, star2=0.2
  → 2つのブースターを連続で取る

Stage 27「渦巻き星雲」 難易度3
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.6), mass:18, radius:0.04, color:"#BB8FCE", ring:false, type:gas},
    {id:"p2", pos:(0.7, 0.4), mass:18, radius:0.04, color:"#85C1E9", ring:false, type:ice}
  ]
  特殊: [{type:'asteroidBelt', data:{id:"a1", points:[(0.2,0.5),(0.5,0.45),(0.8,0.5)], width:0.035, density:4, speed:0.5}}]
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 流れる小惑星帯を避けながら惑星でカーブ

Stage 28「壁越え」 難易度3
  ロケット: (0.1, 0.8) 角度: -π/4
  ゴール: (0.9, 0.8) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.3), mass:25, radius:0.05, color:"#7D3C98", ring:false, type:gas}]
  特殊: [{type:'asteroidBelt', data:{id:"a1", points:[(0.5,0.5),(0.5,1.0)], width:0.05, density:4, speed:0}}]
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 画面中央の縦壁（小惑星帯）を惑星で越える

Stage 29「ブーストスルー」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.35), mass:15, radius:0.04, color:"#C39BD3", ring:false, type:gas},
    {id:"p2", pos:(0.7, 0.65), mass:15, radius:0.04, color:"#AED6F1", ring:false, type:ice}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.5,0.0),(0.5,0.4)], width:0.04, density:3, speed:0}},
    {type:'booster', data:{id:"b1", pos:(0.5, 0.55), radius:0.02, direction:0, power:120}}
  ]
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 小惑星帯の下を通ってブースターで加速

Stage 30「星雲の渦」 難易度3
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.5) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.3, 0.5), mass:20, radius:0.045, color:"#D2B4DE", ring:false, type:gas},
    {id:"p2", pos:(0.7, 0.5), mass:20, radius:0.045, color:"#A9CCE3", ring:false, type:ice},
    {id:"p3", pos:(0.5, 0.3), mass:15, radius:0.04, color:"#F5B7B1", ring:false, type:lava}
  ]
  特殊: []
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 3惑星に囲まれたゴールに精密射撃

Stage 31「フローティング」 難易度3
  ロケット: (0.1, 0.1) 角度: π/4
  ゴール: (0.9, 0.9) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.4, 0.4), mass:15, radius:0.04, color:"#82E0AA", ring:false, type:rocky},
    {id:"p2", pos:(0.6, 0.6), mass:15, radius:0.04, color:"#F0B27A", ring:false, type:lava}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.5),(0.4,0.55)], width:0.035, density:3, speed:0.3}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.6,0.45),(1.0,0.5)], width:0.035, density:3, speed:-0.3}}
  ]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15

Stage 32「ブースト迷路」 難易度3
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:25, radius:0.05, color:"#7FB3D8", ring:false, type:ice}]
  特殊: [
    {type:'booster', data:{id:"b1", pos:(0.3, 0.65), radius:0.02, direction:-π/2, power:90}},
    {type:'booster', data:{id:"b2", pos:(0.65, 0.3), radius:0.02, direction:-π/4, power:90}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.45,0.0),(0.45,0.35)], width:0.04, density:3, speed:0}}
  ]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15

Stage 33「ねじれ飛行」 難易度3
  ロケット: (0.15, 0.5) 角度: 0
  ゴール: (0.85, 0.5) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.35, 0.3), mass:18, radius:0.04, color:"#E8DAEF", ring:false, type:gas},
    {id:"p2", pos:(0.5, 0.7), mass:18, radius:0.04, color:"#D4EFDF", ring:false, type:rocky},
    {id:"p3", pos:(0.65, 0.3), mass:18, radius:0.04, color:"#FADBD8", ring:false, type:lava}
  ]
  特殊: []
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 3惑星を交互にかすめるS字飛行

Stage 34「流星群」 難易度4
  ロケット: (0.1, 0.8) 角度: -π/6
  ゴール: (0.9, 0.2) 半径: 0.025
  惑星: [{id:"p1", pos:(0.5, 0.45), mass:22, radius:0.05, color:"#A569BD", ring:false, type:gas}]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.2,0.3),(0.4,0.35),(0.6,0.3)], width:0.03, density:5, speed:1.0}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.4,0.65),(0.6,0.7),(0.8,0.65)], width:0.03, density:5, speed:-1.0}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → 高速で流れる2つの小惑星帯の隙間をタイミングで抜ける

Stage 35「惑星の壁」 難易度4
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: [
    {id:"p1", pos:(0.4, 0.25), mass:15, radius:0.04, color:"#E74C3C", ring:false, type:lava},
    {id:"p2", pos:(0.4, 0.5), mass:15, radius:0.04, color:"#3498DB", ring:false, type:ice},
    {id:"p3", pos:(0.4, 0.75), mass:15, radius:0.04, color:"#2ECC71", ring:false, type:rocky}
  ]
  特殊: [{type:'booster', data:{id:"b1", pos:(0.6, 0.5), radius:0.02, direction:0, power:100}}]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → 3惑星の縦壁の隙間を通過しブースターで加速

Stage 36「スパイラル」 難易度4
  ロケット: (0.9, 0.9) 角度: -3π/4
  ゴール: (0.5, 0.5) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.5, 0.5), mass:45, radius:0.07, color:"#8E44AD", ring:true, type:gas}
  ]
  特殊: [{type:'asteroidBelt', data:{id:"a1", points:[(0.25,0.25),(0.35,0.5),(0.25,0.75)], width:0.04, density:4, speed:0}}]
  燃料: 0.7
  星閾値: star3=0.3, star2=0.1
  → 巨大惑星の周囲を螺旋しながら中心付近のゴールへ

Stage 37「ブーストチェイン」 難易度4
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.9) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3, 0.5), mass:15, radius:0.04, color:"#BB8FCE", ring:false, type:gas},
    {id:"p2", pos:(0.7, 0.5), mass:15, radius:0.04, color:"#85C1E9", ring:false, type:ice}
  ]
  特殊: [
    {type:'booster', data:{id:"b1", pos:(0.2, 0.4), radius:0.02, direction:-π/3, power:70}},
    {type:'booster', data:{id:"b2", pos:(0.5, 0.25), radius:0.02, direction:0, power:70}},
    {type:'booster', data:{id:"b3", pos:(0.8, 0.4), radius:0.02, direction:π/2, power:70}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → 3つのブースターを順に取って大カーブ

Stage 38「ダブルスパイラル」 難易度4
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3, 0.65), mass:22, radius:0.045, color:"#C39BD3", ring:false, type:gas},
    {id:"p2", pos:(0.7, 0.35), mass:22, radius:0.045, color:"#AED6F1", ring:false, type:ice}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.15,0.4),(0.5,0.5),(0.85,0.4)], width:0.035, density:4, speed:0.5}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.1

Stage 39「星雲の試練」 難易度4
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.25, 0.6), mass:15, radius:0.04, color:"#D2B4DE", ring:false, type:gas},
    {id:"p2", pos:(0.5, 0.4), mass:25, radius:0.05, color:"#F5CBA7", ring:true, type:gas},
    {id:"p3", pos:(0.75, 0.6), mass:15, radius:0.04, color:"#AED6F1", ring:false, type:ice}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.3),(0.3,0.25)], width:0.03, density:3, speed:0}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.7,0.75),(1.0,0.7)], width:0.03, density:3, speed:0}},
    {type:'booster', data:{id:"b1", pos:(0.6, 0.25), radius:0.02, direction:-π/4, power:100}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.1

Stage 40「星雲マスター」 難易度5
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.2, 0.7), mass:18, radius:0.04, color:"#9B59B6", ring:false, type:gas},
    {id:"p2", pos:(0.45, 0.45), mass:30, radius:0.06, color:"#8E44AD", ring:true, type:gas},
    {id:"p3", pos:(0.7, 0.7), mass:18, radius:0.04, color:"#6C3483", ring:false, type:gas},
    {id:"p4", pos:(0.8, 0.25), mass:12, radius:0.035, color:"#A569BD", ring:false, type:gas}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.5),(0.25,0.45),(0.5,0.55)], width:0.04, density:4, speed:0.8}},
    {type:'booster', data:{id:"b1", pos:(0.35, 0.3), radius:0.02, direction:-π/3, power:100}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1
  → ワールド2ボス。全要素組み合わせ
```

#### World 3: ブラックホール地帯（ステージ 41-60）

**コンセプト**: ブラックホール登場。超強力な重力源。吸い込まれたらミス。

```
Stage 41「暗黒の始まり」 難易度3
  ロケット: (0.15, 0.8) 角度: -π/4
  ゴール: (0.85, 0.2) 半径: 0.025
  惑星: [{id:"p1", pos:(0.4, 0.5), mass:15, radius:0.04, color:"#5D6D7E", ring:false, type:rocky}]
  特殊: [{type:'blackhole', data:{id:"bh1", pos:(0.7, 0.5), mass:200, eventHorizonRadius:0.035, visualRadius:0.06}}]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → 初ブラックホール。遠巻きに避ける

Stage 42「吸引の罠」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: []
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.35), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'booster', data:{id:"b1", pos:(0.5, 0.7), radius:0.02, direction:0, power:120}}
  ]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → ブラックホールの下をくぐってブースターで加速

Stage 43「ブラックホール・スイングバイ」 難易度3
  ロケット: (0.1, 0.9) 角度: -π/6
  ゴール: (0.1, 0.1) 半径: 0.025
  惑星: []
  特殊: [{type:'blackhole', data:{id:"bh1", pos:(0.5, 0.5), mass:300, eventHorizonRadius:0.04, visualRadius:0.07}}]
  燃料: 0.8
  星閾値: star3=0.5, star2=0.2
  → ブラックホールの超重力でUターン（危険だが最短ルート）

Stage 44「双子の闇」 難易度3
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.025
  惑星: []
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.5), mass:200, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.7, 0.5), mass:200, eventHorizonRadius:0.035, visualRadius:0.06}}
  ]
  燃料: 0.8
  星閾値: star3=0.5, star2=0.2
  → 2つのブラックホールの間を通す（引力が相殺するルート）

Stage 45「闇と光」 難易度3
  ロケット: (0.1, 0.85) 角度: -π/4
  ゴール: (0.9, 0.15) 半径: 0.025
  惑星: [{id:"p1", pos:(0.65, 0.4), mass:20, radius:0.045, color:"#5DADE2", ring:false, type:ice}]
  特殊: [{type:'blackhole', data:{id:"bh1", pos:(0.35, 0.6), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}}]
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 惑星とブラックホールの複合重力場

Stage 46「事象の地平線」 難易度4
  ロケット: (0.15, 0.5) 角度: 0
  ゴール: (0.85, 0.5) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5, 0.3), mass:18, radius:0.04, color:"#ABB2B9", ring:false, type:rocky}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.65), mass:300, eventHorizonRadius:0.045, visualRadius:0.08}},
    {type:'booster', data:{id:"b1", pos:(0.7, 0.35), radius:0.02, direction:0, power:100}}
  ]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15

Stage 47「ブラックホール三角」 難易度4
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.02
  惑星: []
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.35), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh2", pos:(0.7, 0.35), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh3", pos:(0.5, 0.65), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}}
  ]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 3ブラックホールの中心を通す精密射撃

Stage 48「闇の回廊」 難易度4
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:25, radius:0.05, color:"#F4D03F", ring:true, type:gas}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.25, 0.4), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.75, 0.6), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.4,0.2),(0.6,0.2)], width:0.03, density:3, speed:0}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15

Stage 49「重力レンズ」 難易度4
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3, 0.3), mass:12, radius:0.035, color:"#D5F5E3", ring:false, type:rocky},
    {id:"p2", pos:(0.7, 0.7), mass:12, radius:0.035, color:"#FADBD8", ring:false, type:lava}
  ]
  特殊: [{type:'blackhole', data:{id:"bh1", pos:(0.5, 0.5), mass:350, eventHorizonRadius:0.05, visualRadius:0.09}}]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → 中央の巨大ブラックホールを大きく迂回

Stage 50「ハーフウェイ」 難易度4
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.25, 0.5), mass:20, radius:0.045, color:"#AEB6BF", ring:false, type:rocky},
    {id:"p2", pos:(0.75, 0.5), mass:20, radius:0.045, color:"#F5B041", ring:false, type:lava}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.5), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'booster', data:{id:"b1", pos:(0.5, 0.7), radius:0.02, direction:-π/2, power:120}}
  ]
  燃料: 0.7
  星閾値: star3=0.3, star2=0.1
  → 全100ステージの中間地点

Stage 51「漆黒の海」 難易度4
  ロケット: (0.1, 0.1) 角度: π/4
  ゴール: (0.9, 0.9) 半径: 0.02
  惑星: [{id:"p1", pos:(0.6, 0.4), mass:18, radius:0.04, color:"#7F8C8D", ring:false, type:rocky}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.6), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.5,0.7),(0.8,0.75)], width:0.035, density:3, speed:0.5}}
  ]
  燃料: 0.7
  星閾値: star3=0.3, star2=0.1

Stage 52「スリングショット・マスター」 難易度4
  ロケット: (0.9, 0.9) 角度: -3π/4
  ゴール: (0.1, 0.9) 半径: 0.02
  惑星: []
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.4), mass:350, eventHorizonRadius:0.05, visualRadius:0.09}},
    {type:'booster', data:{id:"b1", pos:(0.3, 0.2), radius:0.02, direction:π, power:100}},
    {type:'booster', data:{id:"b2", pos:(0.7, 0.7), radius:0.02, direction:-π/2, power:100}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.1

Stage 53「闇の迷宮」 難易度4
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:22, radius:0.045, color:"#BFC9CA", ring:false, type:rocky}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.25), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh2", pos:(0.7, 0.75), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.65),(0.3,0.6),(0.5,0.65)], width:0.03, density:3, speed:0}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.5,0.35),(0.7,0.4),(1.0,0.35)], width:0.03, density:3, speed:0}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.1

Stage 54「パルサー」 難易度4
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.25, 0.65), mass:15, radius:0.04, color:"#E8DAEF", ring:false, type:gas},
    {id:"p2", pos:(0.75, 0.35), mass:15, radius:0.04, color:"#D5F5E3", ring:false, type:ice}
  ]
  特殊: [{type:'blackhole', data:{id:"bh1", pos:(0.5, 0.5), mass:400, eventHorizonRadius:0.055, visualRadius:0.10}}]
  燃料: 0.65
  星閾値: star3=0.25, star2=0.1
  → 超巨大ブラックホール。2惑星をうまく使って迂回

Stage 55「ダークマター」 難易度4
  ロケット: (0.1, 0.85) 角度: -π/6
  ゴール: (0.85, 0.85) 半径: 0.02
  惑星: [{id:"p1", pos:(0.6, 0.3), mass:20, radius:0.045, color:"#F9E79F", ring:true, type:gas}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.4), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'blackhole', data:{id:"bh2", pos:(0.7, 0.6), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'booster', data:{id:"b1", pos:(0.85, 0.5), radius:0.02, direction:π/2, power:120}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1

Stage 56「重力波」 難易度5
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3, 0.5), mass:20, radius:0.04, color:"#85929E", ring:false, type:rocky},
    {id:"p2", pos:(0.7, 0.5), mass:20, radius:0.04, color:"#D7BDE2", ring:false, type:gas}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.25), mass:300, eventHorizonRadius:0.045, visualRadius:0.08}},
    {type:'blackhole', data:{id:"bh2", pos:(0.5, 0.75), mass:300, eventHorizonRadius:0.045, visualRadius:0.08}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1
  → 上下にブラックホール、左右に惑星。中央の「安全地帯」を通す

Stage 57「ダークトンネル」 難易度5
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.02
  惑星: []
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.25, 0.65), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.5, 0.45), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'blackhole', data:{id:"bh3", pos:(0.75, 0.25), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'booster', data:{id:"b1", pos:(0.4, 0.8), radius:0.02, direction:-π/3, power:100}},
    {type:'booster', data:{id:"b2", pos:(0.65, 0.15), radius:0.02, direction:-π/6, power:100}}
  ]
  燃料: 0.6
  星閾値: star3=0.2, star2=0.1

Stage 58「ブラックホール回廊」 難易度5
  ロケット: (0.05, 0.5) 角度: 0
  ゴール: (0.95, 0.5) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5, 0.5), mass:30, radius:0.05, color:"#F0B27A", ring:true, type:gas}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3, 0.3), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh2", pos:(0.3, 0.7), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh3", pos:(0.7, 0.3), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh4", pos:(0.7, 0.7), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1
  → 4ブラックホールの中心を惑星の引力で導かれて通過

Stage 59「特異点」 難易度5
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.2, 0.4), mass:15, radius:0.04, color:"#AEB6BF", ring:false, type:rocky},
    {id:"p2", pos:(0.8, 0.6), mass:15, radius:0.04, color:"#D4E6F1", ring:false, type:ice}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5, 0.5), mass:500, eventHorizonRadius:0.06, visualRadius:0.10}},
    {type:'booster', data:{id:"b1", pos:(0.2, 0.7), radius:0.02, direction:-π/2, power:150}},
    {type:'booster', data:{id:"b2", pos:(0.8, 0.3), radius:0.02, direction:-π/2, power:150}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1
  → 最大質量ブラックホール。ブースター必須

Stage 60「ブラックホールマスター」 難易度5
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.2, 0.5), mass:18, radius:0.04, color:"#D5DBDB", ring:false, type:rocky},
    {id:"p2", pos:(0.5, 0.3), mass:22, radius:0.045, color:"#FAD7A0", ring:true, type:gas},
    {id:"p3", pos:(0.8, 0.5), mass:18, radius:0.04, color:"#A9DFBF", ring:false, type:ice}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.35, 0.7), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'blackhole', data:{id:"bh2", pos:(0.65, 0.7), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.3,0.15),(0.7,0.15)], width:0.04, density:4, speed:0.5}},
    {type:'booster', data:{id:"b1", pos:(0.5, 0.55), radius:0.02, direction:-π/2, power:130}}
  ]
  燃料: 0.5
  星閾値: star3=0.2, star2=0.1
  → ワールド3ボス。ゴール半径最小
```

#### World 4: ワームホール回廊（ステージ 61-80）

**コンセプト**: ワームホールでワープ。入り口と出口の位置・角度を読んでルートを組み立てる。

```
Stage 61「初めてのワープ」 難易度3
  ロケット: (0.15, 0.8) 角度: -π/4
  ゴール: (0.85, 0.2) 半径: 0.025
  惑星: []
  特殊: [{type:'wormhole', data:{id:"w1", entry:(0.5,0.5), exit:(0.75,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.0}}]
  燃料: 0.9
  星閾値: star3=0.6, star2=0.3
  → ワームホールの使い方チュートリアル

Stage 62「ワープ＆カーブ」 難易度3
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.025
  惑星: [{id:"p1", pos:(0.8, 0.4), mass:20, radius:0.045, color:"#1ABC9C", ring:false, type:ice}]
  特殊: [{type:'wormhole', data:{id:"w1", entry:(0.4,0.6), exit:(0.6,0.5), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.0}}]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → ワームホールから出て惑星でカーブ

Stage 63「逆方向ワープ」 難易度3
  ロケット: (0.9, 0.9) 角度: -3π/4
  ゴール: (0.1, 0.1) 半径: 0.025
  惑星: [{id:"p1", pos:(0.3, 0.5), mass:15, radius:0.04, color:"#48C9B0", ring:false, type:ice}]
  特殊: [{type:'wormhole', data:{id:"w1", entry:(0.6,0.6), exit:(0.3,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.2}}]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25

Stage 64「ダブルワープ」 難易度3
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.025
  惑星: []
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.5), exit:(0.5,0.2), entryRadius:0.025, exitRadius:0.025, exitAngle:π/4, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.7,0.4), exit:(0.85,0.5), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.0}}
  ]
  燃料: 0.85
  星閾値: star3=0.55, star2=0.25
  → 2つのワームホールを連続使用

Stage 65「ワープ＆ブラックホール」 難易度4
  ロケット: (0.1, 0.8) 角度: -π/4
  ゴール: (0.9, 0.2) 半径: 0.025
  惑星: []
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.4,0.5), exit:(0.7,0.4), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.2}},
    {type:'blackhole', data:{id:"bh1", pos:(0.6, 0.7), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}}
  ]
  燃料: 0.8
  星閾値: star3=0.5, star2=0.2
  → ブラックホールを避けてワームホールへ

Stage 66「加速ワープ」 難易度4
  ロケット: (0.15, 0.85) 角度: -π/4
  ゴール: (0.85, 0.15) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5, 0.35), mass:20, radius:0.045, color:"#45B39D", ring:false, type:ice}]
  特殊: [{type:'wormhole', data:{id:"w1", entry:(0.3,0.6), exit:(0.65,0.25), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.5}}]
  燃料: 0.8
  星閾値: star3=0.45, star2=0.2
  → 加速ワープ（speedMultiplier 1.5）で高速射出

Stage 67「トリプルワープ」 難易度4
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.5, 0.1) 半径: 0.02
  惑星: []
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.25,0.7), exit:(0.7,0.8), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.7,0.5), exit:(0.3,0.4), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w3", entry:(0.4,0.2), exit:(0.5,0.15), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:0.8}}
  ]
  燃料: 0.8
  星閾値: star3=0.5, star2=0.2
  → 3つのワームホールを順に通す

Stage 68「ワープ迷路」 難易度4
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5,0.5), mass:25, radius:0.05, color:"#2ECC71", ring:false, type:rocky}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.3), exit:(0.7,0.7), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.3,0.7), exit:(0.7,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.0}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.5,0.2),(0.5,0.8)], width:0.04, density:3, speed:0}}
  ]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 正しいワームホールを選ぶ。間違えると逆方向へ飛ばされる

Stage 69「減速ワープ」 難易度4
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3,0.5), mass:18, radius:0.04, color:"#58D68D", ring:false, type:rocky},
    {id:"p2", pos:(0.7,0.5), mass:18, radius:0.04, color:"#EC7063", ring:false, type:lava}
  ]
  特殊: [{type:'wormhole', data:{id:"w1", entry:(0.5,0.65), exit:(0.5,0.35), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:0.6}}]
  燃料: 0.75
  星閾値: star3=0.4, star2=0.15
  → 減速ワープ。出口で遅くなるので惑星の引力に捕まりやすい

Stage 70「ワームホール＆ブースト」 難易度4
  ロケット: (0.1, 0.85) 角度: -π/6
  ゴール: (0.9, 0.15) 半径: 0.02
  惑星: [{id:"p1", pos:(0.6,0.6), mass:20, radius:0.045, color:"#27AE60", ring:false, type:rocky}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.35,0.6), exit:(0.5,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.0}},
    {type:'booster', data:{id:"b1", pos:(0.7,0.25), radius:0.02, direction:-π/6, power:100}},
    {type:'blackhole', data:{id:"bh1", pos:(0.3,0.3), mass:200, eventHorizonRadius:0.035, visualRadius:0.06}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → ワームホール→ブースター→ゴール。ブラックホールを避ける

Stage 71-80: (同様のパターンで、以下の要素を組み合わせ)
  - ワームホール2~3個
  - ブラックホール1~2個
  - 惑星2~3個
  - 小惑星帯0~2本
  - ブースター0~2個
  難易度: 71-75は難易度4、76-80は難易度5
  ゴール半径: 0.02~0.015
  燃料: 0.7~0.5

Stage 71「時空のねじれ」 難易度4
  ロケット: (0.15, 0.15) 角度: π/4
  ゴール: (0.85, 0.85) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5,0.5), mass:30, radius:0.05, color:"#16A085", ring:true, type:ice}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.4), exit:(0.7,0.6), entryRadius:0.025, exitRadius:0.025, exitAngle:π/4, speedMultiplier:1.2}},
    {type:'blackhole', data:{id:"bh1", pos:(0.7,0.3), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15

Stage 72「パラレルワープ」 難易度4
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.02
  惑星: []
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.3), exit:(0.6,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:π/2, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.3,0.7), exit:(0.6,0.7), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.5), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15
  → 上下にワームホール。正しい方を選ばないとブラックホールへ

Stage 73「ループ」 難易度4
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.25,0.5), mass:20, radius:0.04, color:"#1ABC9C", ring:false, type:ice},
    {id:"p2", pos:(0.75,0.5), mass:20, radius:0.04, color:"#E74C3C", ring:false, type:lava}
  ]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.5,0.6), exit:(0.5,0.8), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.3}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.15
  → ワームホールがループになっている。1回ループして加速し、2周目でずらしてゴールへ

Stage 74「ワープクロス」 難易度5
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.02
  惑星: [{id:"p1", pos:(0.5,0.5), mass:25, radius:0.05, color:"#17A589", ring:false, type:ice}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.7), exit:(0.7,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.7,0.7), exit:(0.3,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:3π/4, speedMultiplier:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.25), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.1

Stage 75「時空の十字路」 難易度5
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.35), mass:15, radius:0.04, color:"#48C9B0", ring:false, type:ice},
    {id:"p2", pos:(0.7,0.65), mass:15, radius:0.04, color:"#F5B041", ring:false, type:lava}
  ]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.5,0.65), exit:(0.2,0.4), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.2}},
    {type:'wormhole', data:{id:"w2", entry:(0.35,0.2), exit:(0.65,0.2), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:0.8}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.45), mass:250, eventHorizonRadius:0.04, visualRadius:0.07}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1

Stage 76「カオスフィールド」 難易度5
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.015
  惑星: [{id:"p1", pos:(0.5,0.5), mass:30, radius:0.05, color:"#2ECC71", ring:true, type:rocky}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.3), exit:(0.7,0.7), entryRadius:0.025, exitRadius:0.025, exitAngle:π/4, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.7,0.3), exit:(0.3,0.7), entryRadius:0.025, exitRadius:0.025, exitAngle:3π/4, speedMultiplier:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.2), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}},
    {type:'blackhole', data:{id:"bh2", pos:(0.5,0.8), mass:200, eventHorizonRadius:0.03, visualRadius:0.055}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1

Stage 77「ワームホール連鎖」 難易度5
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.015
  惑星: []
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.2,0.8), exit:(0.4,0.6), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.5,0.4), exit:(0.7,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.2}},
    {type:'wormhole', data:{id:"w3", entry:(0.8,0.2), exit:(0.9,0.1), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.5}},
    {type:'blackhole', data:{id:"bh1", pos:(0.6,0.6), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1

Stage 78「反転ワープ」 難易度5
  ロケット: (0.5, 0.9) 角度: -π/2
  ゴール: (0.5, 0.1) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.5), mass:22, radius:0.045, color:"#45B39D", ring:false, type:ice},
    {id:"p2", pos:(0.7,0.5), mass:22, radius:0.045, color:"#EB984E", ring:false, type:lava}
  ]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.5,0.7), exit:(0.5,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:π/2, speedMultiplier:0.5}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.5), mass:300, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'booster', data:{id:"b1", pos:(0.5,0.2), radius:0.02, direction:-π/2, power:150}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1
  → ワームホールが逆方向に射出。減速+反転で惑星を利用

Stage 79「終わりなき回廊」 難易度5
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.015
  惑星: [{id:"p1", pos:(0.5,0.5), mass:35, radius:0.06, color:"#1ABC9C", ring:true, type:ice}]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.25,0.6), exit:(0.6,0.25), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.0}},
    {type:'wormhole', data:{id:"w2", entry:(0.75,0.4), exit:(0.4,0.75), entryRadius:0.025, exitRadius:0.025, exitAngle:π, speedMultiplier:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.3,0.3), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.7,0.7), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'booster', data:{id:"b1", pos:(0.85,0.15), radius:0.02, direction:-π/4, power:100}}
  ]
  燃料: 0.5
  星閾値: star3=0.2, star2=0.1

Stage 80「ワームホールマスター」 難易度5
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.4), mass:20, radius:0.04, color:"#48C9B0", ring:false, type:ice},
    {id:"p2", pos:(0.7,0.6), mass:20, radius:0.04, color:"#EC7063", ring:false, type:lava}
  ]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.2,0.75), exit:(0.5,0.5), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/3, speedMultiplier:1.3}},
    {type:'wormhole', data:{id:"w2", entry:(0.6,0.3), exit:(0.8,0.2), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.4,0.65), mass:280, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'blackhole', data:{id:"bh2", pos:(0.6,0.5), mass:250, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.7,0.1),(0.9,0.1)], width:0.04, density:4, speed:0}},
    {type:'booster', data:{id:"b1", pos:(0.85,0.1), radius:0.02, direction:-π/4, power:120}}
  ]
  燃料: 0.5
  星閾値: star3=0.15, star2=0.05
  → ワールド4ボス。全特殊オブジェクト総動員
```

#### World 5: 銀河の果て（ステージ 81-100）

**コンセプト**: 全要素フル動員。最高難易度。ゴール半径極小。燃料制限厳しい。

```
Stage 81「最後の旅路」 難易度4
  ロケット: (0.15, 0.85) 角度: -π/4
  ゴール: (0.85, 0.15) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.4,0.55), mass:22, radius:0.045, color:"#F39C12", ring:true, type:gas},
    {id:"p2", pos:(0.65,0.35), mass:18, radius:0.04, color:"#E74C3C", ring:false, type:lava}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.3,0.3), mass:200, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'wormhole', data:{id:"w1", entry:(0.55,0.7), exit:(0.75,0.25), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.2}}
  ]
  燃料: 0.7
  星閾値: star3=0.35, star2=0.15

Stage 82「銀河の渦」 難易度4
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.02
  惑星: [
    {id:"p1", pos:(0.3,0.6), mass:25, radius:0.05, color:"#F1C40F", ring:true, type:gas},
    {id:"p2", pos:(0.7,0.4), mass:25, radius:0.05, color:"#E67E22", ring:true, type:gas}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.1,0.5),(0.5,0.45),(0.9,0.5)], width:0.04, density:4, speed:1.0}},
    {type:'booster', data:{id:"b1", pos:(0.5,0.7), radius:0.02, direction:-π/2, power:120}}
  ]
  燃料: 0.65
  星閾値: star3=0.3, star2=0.15

Stage 83-89: (パターン省略、設計原則)
  - 惑星: 2~4個（mass 15~45）
  - ブラックホール: 1~3個（mass 200~400）
  - ワームホール: 1~2個
  - 小惑星帯: 1~2本（speed 0.5~1.5）
  - ブースター: 0~2個
  - ゴール半径: 0.02~0.015
  - 燃料: 0.65~0.45
  - 難易度: 4~5
  各ステージ名:
    83「超新星」 84「暗黒星団」 85「時間の果て」
    86「銀河衝突」 87「ダークエネルギー」 88「量子重力」
    89「事象の先」

Stage 83「超新星」 難易度5
  ロケット: (0.1, 0.5) 角度: 0
  ゴール: (0.9, 0.5) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.35), mass:20, radius:0.04, color:"#F5B041", ring:false, type:lava},
    {id:"p2", pos:(0.5,0.65), mass:30, radius:0.055, color:"#EB984E", ring:true, type:gas},
    {id:"p3", pos:(0.7,0.35), mass:20, radius:0.04, color:"#DC7633", ring:false, type:lava}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.35), mass:250, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'wormhole', data:{id:"w1", entry:(0.3,0.7), exit:(0.75,0.55), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:1.2}}
  ]
  燃料: 0.6
  星閾値: star3=0.25, star2=0.1

Stage 84「暗黒星団」 難易度5
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.015
  惑星: [{id:"p1", pos:(0.5,0.5), mass:35, radius:0.06, color:"#D4AC0D", ring:true, type:gas}]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.2,0.4), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.8,0.4), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh3", pos:(0.5,0.7), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'booster', data:{id:"b1", pos:(0.5,0.3), radius:0.02, direction:-π/2, power:130}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1

Stage 85「時間の果て」 難易度5
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.25,0.6), mass:18, radius:0.04, color:"#F7DC6F", ring:false, type:gas},
    {id:"p2", pos:(0.75,0.4), mass:18, radius:0.04, color:"#F0B27A", ring:false, type:lava}
  ]
  特殊: [
    {type:'wormhole', data:{id:"w1", entry:(0.4,0.5), exit:(0.6,0.5), entryRadius:0.025, exitRadius:0.025, exitAngle:π, speedMultiplier:0.5}},
    {type:'wormhole', data:{id:"w2", entry:(0.6,0.5), exit:(0.4,0.5), entryRadius:0.025, exitRadius:0.025, exitAngle:0, speedMultiplier:0.5}},
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.25), mass:300, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'booster', data:{id:"b1", pos:(0.5,0.7), radius:0.02, direction:-π/4, power:100}}
  ]
  燃料: 0.55
  星閾値: star3=0.2, star2=0.1
  → 無限ループワームホール。ブースターで脱出

Stage 86「銀河衝突」 難易度5
  ロケット: (0.05, 0.5) 角度: 0
  ゴール: (0.95, 0.5) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.25,0.4), mass:25, radius:0.05, color:"#F39C12", ring:true, type:gas},
    {id:"p2", pos:(0.5,0.5), mass:40, radius:0.065, color:"#E74C3C", ring:true, type:lava},
    {id:"p3", pos:(0.75,0.6), mass:25, radius:0.05, color:"#3498DB", ring:true, type:ice}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.3),(0.5,0.25),(1.0,0.3)], width:0.04, density:5, speed:1.5}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.0,0.7),(0.5,0.75),(1.0,0.7)], width:0.04, density:5, speed:-1.5}}
  ]
  燃料: 0.5
  星閾値: star3=0.2, star2=0.1

Stage 87「ダークエネルギー」 難易度5
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.35,0.5), mass:20, radius:0.04, color:"#D4AC0D", ring:false, type:gas},
    {id:"p2", pos:(0.65,0.5), mass:20, radius:0.04, color:"#A04000", ring:false, type:lava}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.2,0.3), mass:250, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.8,0.3), mass:250, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'wormhole', data:{id:"w1", entry:(0.5,0.7), exit:(0.5,0.4), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.5}},
    {type:'booster', data:{id:"b1", pos:(0.5,0.2), radius:0.02, direction:-π/2, power:120}}
  ]
  燃料: 0.5
  星閾値: star3=0.2, star2=0.1

Stage 88「量子重力」 難易度5
  ロケット: (0.1, 0.9) 角度: -π/4
  ゴール: (0.9, 0.1) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.5), mass:15, radius:0.035, color:"#F9E79F", ring:false, type:gas},
    {id:"p2", pos:(0.5,0.3), mass:15, radius:0.035, color:"#FADBD8", ring:false, type:lava},
    {id:"p3", pos:(0.7,0.5), mass:15, radius:0.035, color:"#D5F5E3", ring:false, type:ice},
    {id:"p4", pos:(0.5,0.7), mass:15, radius:0.035, color:"#D4E6F1", ring:false, type:rocky}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.5), mass:350, eventHorizonRadius:0.05, visualRadius:0.09}},
    {type:'wormhole', data:{id:"w1", entry:(0.2,0.7), exit:(0.4,0.2), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.3}},
    {type:'wormhole', data:{id:"w2", entry:(0.6,0.2), exit:(0.8,0.3), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/4, speedMultiplier:1.0}}
  ]
  燃料: 0.45
  星閾値: star3=0.15, star2=0.05

Stage 89「事象の先」 難易度5
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.2,0.5), mass:25, radius:0.05, color:"#F4D03F", ring:true, type:gas},
    {id:"p2", pos:(0.8,0.5), mass:25, radius:0.05, color:"#E59866", ring:true, type:lava}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.5,0.5), mass:400, eventHorizonRadius:0.055, visualRadius:0.10}},
    {type:'wormhole', data:{id:"w1", entry:(0.35,0.75), exit:(0.15,0.35), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/3, speedMultiplier:1.5}},
    {type:'wormhole', data:{id:"w2", entry:(0.25,0.2), exit:(0.5,0.15), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.0}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.6,0.2),(0.8,0.25),(0.9,0.3)], width:0.035, density:4, speed:0.8}},
    {type:'booster', data:{id:"b1", pos:(0.35,0.3), radius:0.02, direction:-π/4, power:130}}
  ]
  燃料: 0.45
  星閾値: star3=0.15, star2=0.05

Stage 90「銀河の壁」 難易度5
  ロケット: (0.05, 0.95) 角度: -π/4
  ゴール: (0.95, 0.05) 半径: 0.015
  惑星: [
    {id:"p1", pos:(0.3,0.7), mass:20, radius:0.04, color:"#F39C12", ring:false, type:gas},
    {id:"p2", pos:(0.5,0.5), mass:35, radius:0.06, color:"#D35400", ring:true, type:lava},
    {id:"p3", pos:(0.7,0.3), mass:20, radius:0.04, color:"#2ECC71", ring:false, type:ice}
  ]
  特殊: [
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.45),(0.5,0.4),(1.0,0.45)], width:0.05, density:5, speed:1.0}},
    {type:'blackhole', data:{id:"bh1", pos:(0.2,0.3), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'blackhole', data:{id:"bh2", pos:(0.8,0.7), mass:220, eventHorizonRadius:0.035, visualRadius:0.06}},
    {type:'wormhole', data:{id:"w1", entry:(0.15,0.6), exit:(0.6,0.2), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/6, speedMultiplier:1.3}},
    {type:'booster', data:{id:"b1", pos:(0.8,0.15), radius:0.02, direction:-π/4, power:100}}
  ]
  燃料: 0.45
  星閾値: star3=0.15, star2=0.05

Stage 91-99: (段階的に難易度上昇)
  各ステージ名:
    91「コスモストーム」 92「重力の海」 93「次元の裂け目」
    94「暗黒のダンス」 95「銀河核」 96「時空の嵐」
    97「無限の彼方」 98「最終防衛線」 99「銀河の心臓」
  設計原則:
    - 惑星: 3~5個
    - ブラックホール: 2~4個
    - ワームホール: 2~3個
    - 小惑星帯: 1~3本
    - ブースター: 1~2個
    - ゴール半径: 0.015
    - 燃料: 0.5~0.35
    - 全て難易度5

Stage 100「ビッグバン」 難易度5（最終ステージ）
  ロケット: (0.5, 0.95) 角度: -π/2
  ゴール: (0.5, 0.05) 半径: 0.012（全ステージ最小）
  惑星: [
    {id:"p1", pos:(0.2, 0.7), mass:20, radius:0.04, color:"#F39C12", ring:false, type:gas},
    {id:"p2", pos:(0.8, 0.7), mass:20, radius:0.04, color:"#E74C3C", ring:false, type:lava},
    {id:"p3", pos:(0.2, 0.3), mass:20, radius:0.04, color:"#3498DB", ring:false, type:ice},
    {id:"p4", pos:(0.8, 0.3), mass:20, radius:0.04, color:"#2ECC71", ring:false, type:rocky},
    {id:"p5", pos:(0.5, 0.5), mass:45, radius:0.07, color:"#F1C40F", ring:true, type:gas}
  ]
  特殊: [
    {type:'blackhole', data:{id:"bh1", pos:(0.35, 0.5), mass:300, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'blackhole', data:{id:"bh2", pos:(0.65, 0.5), mass:300, eventHorizonRadius:0.04, visualRadius:0.07}},
    {type:'wormhole', data:{id:"w1", entry:(0.4, 0.8), exit:(0.3, 0.4), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/3, speedMultiplier:1.5}},
    {type:'wormhole', data:{id:"w2", entry:(0.15, 0.25), exit:(0.5, 0.15), entryRadius:0.025, exitRadius:0.025, exitAngle:-π/2, speedMultiplier:1.0}},
    {type:'asteroidBelt', data:{id:"a1", points:[(0.0,0.55),(0.25,0.5),(0.5,0.55)], width:0.04, density:5, speed:1.0}},
    {type:'asteroidBelt', data:{id:"a2", points:[(0.5,0.45),(0.75,0.5),(1.0,0.45)], width:0.04, density:5, speed:-1.0}},
    {type:'booster', data:{id:"b1", pos:(0.2, 0.55), radius:0.02, direction:-π/2, power:150}},
    {type:'booster', data:{id:"b2", pos:(0.85, 0.2), radius:0.02, direction:-π/2, power:120}}
  ]
  燃料: 0.35
  星閾値: star3=0.15, star2=0.05
  → 最終ステージ。全要素フル動員。ゴール半径0.012は極小。
    惑星5個+ブラックホール2個+ワームホール2個+小惑星帯2本+ブースター2個。
    燃料0.35は最も少ない。真の宇宙マスターだけがクリアできる。
```

---

## 8. 特殊オブジェクト仕様

### 8.1 ブラックホール

| 項目 | 仕様 |
|---|---|
| 引力 | `GRAVITY_CONSTANT * mass * BLACKHOLE_PULL_MULTIPLIER / dist^2` |
| 吸収判定 | ロケット座標がeventHorizonRadius内に入ったら吸収 |
| 視覚演出 | 中心が漆黒の円、周囲に回転する降着円盤（Skia Path、4色グラデーション） |
| 吸収演出 | ロケットが渦巻きながら縮小（0.5秒、rotation加速+scale 1.0→0.0） |
| サウンド | 低音の唸り音（距離に応じて音量変化） |
| ハプティクス | 接近時に連続バイブ（距離に応じて間隔変化） |

**描画擬似コード（Skia）**:
```
// 降着円盤
for i = 0 to 3:
  arc_radius = visualRadius * (0.6 + i * 0.15)
  arc_start = time * (2 + i) // 回転速度
  arc_sweep = π * (0.3 + i * 0.1)
  color = [#FF6B35, #FFD700, #00D4FF, #FF1493][i] with alpha 0.6
  drawArc(center, arc_radius, arc_start, arc_sweep, color)

// 中心の黒円
drawCircle(center, eventHorizonRadius, #000000)

// 光のリム
drawCircle(center, eventHorizonRadius, stroke: #FFFFFF alpha 0.3, width: 1)
```

### 8.2 ワームホール

| 項目 | 仕様 |
|---|---|
| 突入判定 | ロケット座標がentryRadius内。クールダウン中は無視 |
| ワープ処理 | `rocket.position = exitPosition`、`rocket.velocity = fromAngle(exitAngle, speed * speedMultiplier)` |
| クールダウン | ワープ後30フレーム（0.5秒）は同じワームホールに再突入不可 |
| 入口演出 | 渦巻きパーティクル（Skia、8個のドットが螺旋） |
| 出口演出 | 放射状パーティクル（射出方向に光線） |
| 色 | 入口: シアン(#00FFFF)、出口: マゼンタ(#FF00FF) |
| サウンド | 「シュワーン」ワープ音（突入時1回） |
| ハプティクス | 突入時に強バイブ1回 |

**入口・出口ペア描画擬似コード**:
```
// 入口
for i = 0 to 7:
  angle = time * 3 + i * (2π / 8)
  r = entryRadius * (0.5 + sin(time * 2 + i) * 0.3)
  dot_pos = center + fromAngle(angle, r)
  drawCircle(dot_pos, 2, #00FFFF alpha (0.5 + sin(time * 4 + i) * 0.3))

// 入口-出口を結ぶ点線
drawDashedLine(entryPosition, exitPosition, #FFFFFF alpha 0.15, dashLength: 4, gap: 8)
```

### 8.3 小惑星帯

| 項目 | 仕様 |
|---|---|
| 衝突判定 | ロケットから中心線（ベジェ曲線近似）までの最短距離 < width/2 |
| 移動 | speed > 0 の場合、中心線のポイントがspeed * dt ずつ横方向にシフト（ループ） |
| 描画 | 中心線に沿って `density * 10` 個のランダムサイズ岩石を配置 |
| 岩石サイズ | 3px ~ 8px（ランダム、シード固定でフレーム間のチラつき防止） |
| 色 | グレー系 #808080 ~ #A0A0A0（ランダム） |
| サウンド | なし（衝突時はcrash音） |

### 8.4 ブースター

| 項目 | 仕様 |
|---|---|
| 取得判定 | ロケット座標がradius内。1ステージで同じブースターは1回のみ |
| 効果 | `rocket.velocity = add(rocket.velocity, fromAngle(direction, power * dt))` を1フレーム適用 |
| 描画 | 矢印アイコン（direction方向に向く）+ パルスリング |
| 色 | 黄緑 #7FFF00 |
| 取得演出 | 光の爆発（0.3秒） + スケールアウト |
| サウンド | 「シュイン!」加速音 |
| ハプティクス | 取得時に中バイブ1回 |

---

## 9. 星3評価システム

### 9.1 評価ロジック

```
function calculateStars(fuel: number, thresholds: StarThresholds): 0 | 1 | 2 | 3 {
  if (fuel >= thresholds.star3) return 3;
  if (fuel >= thresholds.star2) return 2;
  return 1; // ゴール到達 = 最低星1
}
```

### 9.2 コイン報酬

| 星数 | 初回クリア報酬 | 2回目以降 | 星更新ボーナス |
|---|---|---|---|
| 星1 | 10コイン | 2コイン | - |
| 星2 | 20コイン | 3コイン | +10コイン |
| 星3 | 30コイン | 5コイン | +15コイン |

星更新ボーナス: 以前の最高星数より上がった場合に追加付与。

### 9.3 燃料消費の仕組み

- 燃料は発射後、毎フレーム `FUEL_CONSUMPTION_RATE * dt` ずつ減少
- 燃料は「飛行時間」に比例して消費される（≒最短ルート=高評価）
- 惑星の引力でスイングバイすると短縮 → 高評価
- ワームホール利用で距離短縮 → 高評価
- ブースター取得で加速 → 飛行時間短縮 → 高評価

### 9.4 閾値設計方針

| 難易度 | star3燃料 | star2燃料 | 解説 |
|---|---|---|---|
| 1 | 0.70 | 0.40 | 直線的に飛ばせれば星3 |
| 2 | 0.55-0.60 | 0.25-0.30 | 適切なスイングバイで星3 |
| 3 | 0.40-0.50 | 0.15-0.20 | 最適ルート発見が必要 |
| 4 | 0.30-0.40 | 0.10-0.15 | 複数テクニック組み合わせ |
| 5 | 0.15-0.25 | 0.05-0.10 | 完璧なルートのみ星3 |

---

## 10. 軌跡描画仕様

### 10.1 基本仕様

| 項目 | 値 |
|---|---|
| 描画エンジン | @shopify/react-native-skia (Canvas + Path) |
| 軌跡ポイント数 | 最大300点 |
| 保存間隔 | 2フレームごとに1点 |
| 描画方式 | Skia Path の lineTo で連結 |

### 10.2 ネオンライン描画擬似コード

```
function drawTrail(canvas, trail: Vector2D[], skinTrailColor: string, skinTrailWidth: number) {
  if (trail.length < 2) return;

  const totalPoints = trail.length;

  // 1. 外側のグロー（太い半透明ライン）
  const glowPath = new Path();
  glowPath.moveTo(trail[0].x, trail[0].y);
  for (let i = 1; i < totalPoints; i++) {
    glowPath.lineTo(trail[i].x, trail[i].y);
  }

  // グローは先頭（古い部分）から末尾（新しい部分）へα値を上げる
  const glowPaint = new Paint();
  glowPaint.setStyle('stroke');
  glowPaint.setStrokeWidth(skinTrailWidth * 3);
  glowPaint.setShader(
    LinearGradient(
      trail[0], trail[totalPoints - 1],
      [color(skinTrailColor, 0.0), color(skinTrailColor, 0.3)]
    )
  );
  glowPaint.setMaskFilter(Blur(skinTrailWidth * 2));
  canvas.drawPath(glowPath, glowPaint);

  // 2. 内側のコアライン（細い高輝度ライン）
  const corePaint = new Paint();
  corePaint.setStyle('stroke');
  corePaint.setStrokeWidth(skinTrailWidth);
  corePaint.setShader(
    LinearGradient(
      trail[0], trail[totalPoints - 1],
      [color('#FFFFFF', 0.0), color('#FFFFFF', 0.9)]
    )
  );
  canvas.drawPath(glowPath, corePaint);

  // 3. 最新位置にパーティクル（光点）
  const headPos = trail[totalPoints - 1];
  const headPaint = new Paint();
  headPaint.setColor(color(skinTrailColor, 1.0));
  headPaint.setMaskFilter(Blur(8));
  canvas.drawCircle(headPos.x, headPos.y, skinTrailWidth * 2, headPaint);
}
```

### 10.3 スキン別軌跡パラメータ

| スキンID | trailColor | trailWidth | glowColor | 演出 |
|---|---|---|---|---|
| default | #00BFFF | 3 | #00BFFF | 標準ネオンブルー |
| fire | #FF4500 | 4 | #FF6347 | 炎のゆらぎ（sin波で幅変動） |
| ice | #00FFFF | 3 | #E0FFFF | 氷の結晶パーティクル追加 |
| thunder | #FFD700 | 3 | #FFFF00 | ジグザグライン（ランダム振れ） |
| rainbow | (時間変化) | 4 | (時間変化) | HSLで色相が時間回転 |
| ghost | #FFFFFF | 2 | #FFFFFF | α値が低く（0.5）、点線表示 |
| neon_pink | #FF1493 | 3 | #FF69B4 | ピンクネオン |
| emerald | #50C878 | 3 | #00FF7F | エメラルドグリーン |
| gold | #FFD700 | 4 | #FFA500 | 金色パーティクル追加 |
| cosmic | #9400D3 | 5 | #8A2BE2 | 紫+白の二重軌跡 |

### 10.4 シェア用軌跡キャプチャ

```
function captureTrajectory(stage: StageData, trail: Vector2D[], stars: number): SkImage {
  // 1200x630のオフスクリーンキャンバスを作成
  const surface = Skia.Surface.Make(1200, 630);
  const canvas = surface.getCanvas();

  // 背景グラデーション
  canvas.drawRect(fullRect, bgGradientPaint);

  // ステージのオブジェクト（惑星、特殊オブジェクト）を縮小描画
  drawStageObjects(canvas, stage, scale);

  // 軌跡をネオンラインで描画
  drawTrail(canvas, scaledTrail, skinTrailColor, skinTrailWidth);

  // ステージ名と星評価をオーバーレイ
  drawText(canvas, `Stage ${stage.id}`, 30, 580, white, 24);
  drawStars(canvas, stars, 1060, 580);

  // ロゴ
  drawText(canvas, "🚀 ぶっ飛びロケット", 30, 30, white, 18);

  return surface.makeImageSnapshot();
}
```

---

## 11. 収益化設計

### 11.1 AdMob広告

| 広告タイプ | 表示タイミング | 頻度 |
|---|---|---|
| Banner (320x50) | タイトル、ステージ選択、設定、ショップ画面の最下部 | 常時 |
| Interstitial | ステージクリア後（リザルト画面遷移前） | 3ステージクリアごと |
| Rewarded | リザルト画面の「コイン2倍」ボタン | ユーザー任意 |
| Rewarded | ゲーム画面の「ヒント表示」ボタン（5回失敗後に出現） | ユーザー任意 |

**広告ID（テスト用）**:
```typescript
export const AD_IDS = {
  banner: {
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  },
  interstitial: {
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
  },
  rewarded: {
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
  },
} as const;
```

### 11.2 IAP（アプリ内課金）

| 商品ID | 名前 | 価格(税込) | コイン数 | 備考 |
|---|---|---|---|---|
| `coins_500` | コインパック小 | ¥120 | 500 | |
| `coins_2000` | コインパック中 | ¥370 | 2,000 | |
| `coins_5000` | コインパック大 | ¥860 | 5,000 | 🔥人気 表示 |
| `remove_ads` | 広告除去 | ¥490 | 0 | 買い切り、Banner+Interstitial非表示 |

**収益予測**:
- DAU 1,000人想定
- Banner eCPM: ¥300 → ¥300/日
- Interstitial eCPM: ¥1,500 → ¥500/日（DAU×0.33回表示）
- Rewarded eCPM: ¥3,000 → ¥300/日（DAU×10%視聴）
- IAP: DAU×1%×¥370平均 = ¥3,700/日
- 合計: 約¥4,800/日 = 約¥144,000/月

### 11.3 リワード広告のヒント機能

5回連続失敗後にゲーム画面に「💡ヒント」ボタンが出現:
- リワード広告視聴 → 最適ルートの予測軌道が5秒間表示される
- ヒントは1ステージにつき1回のみ

---

## 12. シェア機能

### 12.1 シェアトリガー

| トリガー | シェア内容 | 画像 |
|---|---|---|
| リザルト画面「📤シェア」ボタン | 軌跡画像 + テキスト | 1200x630 軌跡キャプチャ |
| 星3初回獲得時のモーダル | 🌟パーフェクト画像 | 1200x630 星3エフェクト付き |
| 全100ステージクリア時 | エンディング画像 | 1200x630 全クリ証明書 |
| デイリーチャレンジ星3 | デイリー結果画像 | 1200x630 デイリー結果 |

### 12.2 シェアテキストテンプレート

```
【クリア時】
🚀 ぶっ飛びロケット
Stage {stageId} 「{stageName}」を⭐{stars}でクリア！
残り燃料: {fuel}%
#ぶっ飛びロケット #RocketFling

【星3パーフェクト】
🌟 PERFECT! 🌟
Stage {stageId} 「{stageName}」を完璧にクリア！
この神ショットを見よ！🚀
#ぶっ飛びロケット #神ショット

【全クリ】
🎊 全100ステージ制覇！🎊
銀河の果てまで到達しました！
総獲得星: {totalStars}/300 ⭐
#ぶっ飛びロケット #全クリ

【デイリー】
📅 デイリーチャレンジ Day {streak}
今日の「{challengeName}」を⭐{stars}でクリア！
連続{streak}日目！🔥
#ぶっ飛びロケット #デイリー
```

### 12.3 実装方式

```typescript
async function shareResult(imageUri: string, text: string) {
  // expo-sharing を使用
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(imageUri, {
      mimeType: 'image/png',
      dialogTitle: text,
    });
  }
}
```

---

## 13. サウンド・ハプティクス

### 13.1 サウンド一覧

| サウンドID | ファイル | 再生タイミング | 音量 | ループ |
|---|---|---|---|---|
| bgm_title | bgm/title.mp3 | タイトル画面 | 0.5 | ○ |
| bgm_world1-5 | bgm/world{n}.mp3 | 各ワールドのゲーム画面 | 0.4 | ○ |
| sfx_launch | launch.mp3 | ロケット発射時 | 1.0 | × |
| sfx_boost | boost.mp3 | ブースター取得時 | 0.8 | × |
| sfx_goal | goal.mp3 | ゴール到達時 | 1.0 | × |
| sfx_crash | crash.mp3 | 惑星/小惑星帯衝突時 | 0.8 | × |
| sfx_wormhole | wormhole.mp3 | ワームホール突入時 | 0.9 | × |
| sfx_blackhole | blackhole.mp3 | ブラックホール吸収時 | 1.0 | × |
| sfx_star1-3 | star{n}.mp3 | リザルトで星出現時 | 0.8 | × |
| sfx_button | button.mp3 | UIボタンタップ時 | 0.5 | × |
| sfx_coin | coin.mp3 | コイン獲得時 | 0.6 | × |

### 13.2 サウンド管理 (src/hooks/useSound.ts)

```typescript
// expo-av の Audio.Sound を使用
// 起動時にBGM+全SFXをプリロード
// BGMはフェードイン/フェードアウト（500ms）
// SFXは同時再生可能（最大4チャンネル）
// 設定のbgmVolume/sfxVolumeに従う

const PRELOAD_SOUNDS = [
  { id: 'sfx_launch', source: require('../../assets/sounds/launch.mp3') },
  { id: 'sfx_goal', source: require('../../assets/sounds/goal.mp3') },
  // ... 全サウンド
];

function useSound() {
  const sounds = useRef<Map<string, Audio.Sound>>(new Map());

  async function preloadAll() { /* 起動時に全サウンドロード */ }
  async function playBGM(worldId: number) { /* BGM再生 */ }
  async function stopBGM() { /* BGM停止 */ }
  async function playSFX(id: string) { /* SFX再生 */ }

  return { preloadAll, playBGM, stopBGM, playSFX };
}
```

### 13.3 ハプティクス仕様

| イベント | 種類 | expo-haptics API |
|---|---|---|
| ドラッグ開始 | Light | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` |
| パワーMax到達 | Medium | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| 発射 | Heavy | `Haptics.impactAsync(ImpactFeedbackStyle.Heavy)` |
| ブースター取得 | Medium | `Haptics.impactAsync(ImpactFeedbackStyle.Medium)` |
| ワームホール突入 | Heavy | `Haptics.impactAsync(ImpactFeedbackStyle.Heavy)` |
| 惑星衝突 | Heavy + Notification Error | `Heavy` → 100ms後 → `notificationAsync(Error)` |
| ブラックホール接近 | Selection (連続) | `selectionAsync()` を距離に反比例する間隔で連続呼び出し |
| ブラックホール吸収 | Heavy + Heavy + Heavy | 100ms間隔で3回 |
| ゴール | Success | `Haptics.notificationAsync(NotificationFeedbackType.Success)` |
| 星獲得 | Light (各星ごと) | 星出現アニメに同期 |
| UIボタン | Light | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` |

---

## 14. AsyncStorageキー設計

```typescript
// src/constants/storage.ts

export const STORAGE_KEYS = {
  /** プレイヤー進行データ (JSON) */
  PLAYER_PROGRESS: '@rocket_fling/player_progress',

  /** アプリ設定 (JSON) */
  SETTINGS: '@rocket_fling/settings',

  /** 広告除去フラグ (boolean) */
  ADS_REMOVED: '@rocket_fling/ads_removed',

  /** 初回起動フラグ (boolean) */
  FIRST_LAUNCH: '@rocket_fling/first_launch',

  /** 最終プレイ日 (YYYY-MM-DD) */
  LAST_PLAY_DATE: '@rocket_fling/last_play_date',

  /** IAP購入レシート (JSON配列) */
  IAP_RECEIPTS: '@rocket_fling/iap_receipts',

  /** デイリーチャレンジの最終完了日 (YYYY-MM-DD) */
  DAILY_LAST_COMPLETED: '@rocket_fling/daily_last_completed',

  /** ヒント使用済みステージ (JSON配列 number[]) */
  HINT_USED_STAGES: '@rocket_fling/hint_used_stages',

  /** 累計プレイ時間 (number ms) */
  TOTAL_PLAY_TIME: '@rocket_fling/total_play_time',

  /** 最高コンボ（連続星3数） */
  BEST_STAR3_STREAK: '@rocket_fling/best_star3_streak',
} as const;
```

### 14.1 データ初期値

```typescript
const DEFAULT_PROGRESS: PlayerProgress = {
  totalStars: 0,
  clearedStages: {},
  unlockedWorlds: [1],
  coins: 0,
  unlockedSkins: ['default'],
  equippedSkinId: 'default',
  achievements: {},
  dailyChallenge: {
    lastPlayedDate: '',
    streak: 0,
    todayCleared: false,
    todayStars: 0,
  },
  totalLaunches: 0,
  totalPlayTimeMs: 0,
};

const DEFAULT_SETTINGS: AppSettings = {
  bgmVolume: 0.8,
  sfxVolume: 1.0,
  hapticsEnabled: true,
  showTrajectoryPreview: true,
  language: 'ja',
};
```

### 14.2 保存タイミング

| データ | 保存タイミング |
|---|---|
| PLAYER_PROGRESS | ステージクリア時、コイン変動時、スキン購入時、実績解除時 |
| SETTINGS | 設定変更時 |
| ADS_REMOVED | IAP購入確認後 |
| LAST_PLAY_DATE | アプリ起動時 |
| TOTAL_PLAY_TIME | ゲーム画面を離れる時（30秒ごとのバックグラウンド保存も） |

---

## 15. ロケットスキン（10種類）

```typescript
// src/data/skins.ts

export const ROCKET_SKINS: RocketSkin[] = [
  {
    id: 'default',
    name: 'スタンダード',
    description: '最初のロケット。信頼と実績の白。',
    price: 0,
    rarity: 'common',
    trailColor: '#00BFFF',
    trailWidth: 3,
    glowColor: '#00BFFF',
    unlockCondition: 'default',
  },
  {
    id: 'fire',
    name: 'ファイアロケット',
    description: '炎をまとう真っ赤なロケット。軌跡が燃え上がる。',
    price: 500,
    rarity: 'rare',
    trailColor: '#FF4500',
    trailWidth: 4,
    glowColor: '#FF6347',
    unlockCondition: 'purchase',
  },
  {
    id: 'ice',
    name: 'アイスロケット',
    description: '絶対零度の蒼き軌跡。冷たく美しい。',
    price: 500,
    rarity: 'rare',
    trailColor: '#00FFFF',
    trailWidth: 3,
    glowColor: '#E0FFFF',
    unlockCondition: 'purchase',
  },
  {
    id: 'thunder',
    name: 'サンダーロケット',
    description: '雷の如く駆ける。軌跡が稲妻のように揺れる。',
    price: 800,
    rarity: 'epic',
    trailColor: '#FFD700',
    trailWidth: 3,
    glowColor: '#FFFF00',
    unlockCondition: 'purchase',
  },
  {
    id: 'rainbow',
    name: 'レインボーロケット',
    description: '虹色に輝く特別な軌跡。全ての色を纏う。',
    price: 1200,
    rarity: 'legendary',
    trailColor: '#FF0000', // 実際はHSLアニメーション
    trailWidth: 4,
    glowColor: '#FFFFFF',
    unlockCondition: 'purchase',
  },
  {
    id: 'ghost',
    name: 'ゴーストロケット',
    description: '半透明の幽霊ロケット。存在感が薄い。',
    price: 300,
    rarity: 'common',
    trailColor: '#FFFFFF',
    trailWidth: 2,
    glowColor: '#FFFFFF',
    unlockCondition: 'purchase',
  },
  {
    id: 'neon_pink',
    name: 'ネオンピンク',
    description: '夜の街を駆けるネオンの光。',
    price: 600,
    rarity: 'rare',
    trailColor: '#FF1493',
    trailWidth: 3,
    glowColor: '#FF69B4',
    unlockCondition: 'purchase',
  },
  {
    id: 'emerald',
    name: 'エメラルドロケット',
    description: '森の精霊が宿る翡翠の輝き。',
    price: 800,
    rarity: 'epic',
    trailColor: '#50C878',
    trailWidth: 3,
    glowColor: '#00FF7F',
    unlockCondition: 'purchase',
  },
  {
    id: 'gold',
    name: 'ゴールドロケット',
    description: '黄金のロケット。全ステージ星3の証。',
    price: 0,
    rarity: 'legendary',
    trailColor: '#FFD700',
    trailWidth: 4,
    glowColor: '#FFA500',
    unlockCondition: 'achievement',
    achievementId: 'all_stars',
  },
  {
    id: 'cosmic',
    name: 'コズミックロケット',
    description: '宇宙そのものの色。二重の軌跡が空間を裂く。',
    price: 0,
    rarity: 'legendary',
    trailColor: '#9400D3',
    trailWidth: 5,
    glowColor: '#8A2BE2',
    unlockCondition: 'daily',
    // デイリーチャレンジ30日連続で解放
  },
];
```

---

## 16. デイリーチャレンジ

### 16.1 曜日別チャレンジ定義

```typescript
// src/data/dailyChallenges.ts

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    dayOfWeek: 0, // 日曜
    name: '重力迷宮',
    description: '4つの惑星に囲まれた迷宮を突破せよ',
    stageConfig: {
      rocketStart: { nx: 0.5, ny: 0.9 },
      rocketAngle: -Math.PI / 2,
      goalStar: { position: { nx: 0.5, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.0 },
      planets: [
        { id: 'dp1', position: { nx: 0.25, ny: 0.4 }, mass: 20, radius: 0.045, color: '#E74C3C', hasRing: false, type: 'lava' },
        { id: 'dp2', position: { nx: 0.75, ny: 0.4 }, mass: 20, radius: 0.045, color: '#3498DB', hasRing: false, type: 'ice' },
        { id: 'dp3', position: { nx: 0.25, ny: 0.7 }, mass: 15, radius: 0.04, color: '#2ECC71', hasRing: false, type: 'rocky' },
        { id: 'dp4', position: { nx: 0.75, ny: 0.7 }, mass: 15, radius: 0.04, color: '#F39C12', hasRing: false, type: 'gas' },
      ],
      specialObjects: [],
      initialFuel: 0.8,
      starThresholds: { star3: 0.5, star2: 0.25, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#0A0E27',
    },
    bonusCoins: 50,
  },
  {
    dayOfWeek: 1, // 月曜
    name: 'ブラックホール回避',
    description: '巨大ブラックホールの脇を通り抜けろ',
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.8 },
      rocketAngle: -Math.PI / 4,
      goalStar: { position: { nx: 0.9, ny: 0.2 }, radius: 0.025, pulseSpeed: 1.2 },
      planets: [{ id: 'dp1', position: { nx: 0.6, ny: 0.4 }, mass: 18, radius: 0.04, color: '#5DADE2', hasRing: false, type: 'ice' }],
      specialObjects: [
        { type: 'blackhole', data: { id: 'dbh1', position: { nx: 0.4, ny: 0.5 }, mass: 350, eventHorizonRadius: 0.05, visualRadius: 0.09 } },
      ],
      initialFuel: 0.75,
      starThresholds: { star3: 0.45, star2: 0.2, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#000000',
    },
    bonusCoins: 50,
  },
  {
    dayOfWeek: 2, // 火曜
    name: 'ワープマスター',
    description: '3つのワームホールを使いこなせ',
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.9 },
      rocketAngle: -Math.PI / 4,
      goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.02, pulseSpeed: 1.5 },
      planets: [],
      specialObjects: [
        { type: 'wormhole', data: { id: 'dw1', entryPosition: { nx: 0.3, ny: 0.7 }, exitPosition: { nx: 0.5, ny: 0.5 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.2 } },
        { type: 'wormhole', data: { id: 'dw2', entryPosition: { nx: 0.6, ny: 0.35 }, exitPosition: { nx: 0.8, ny: 0.2 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 6, speedMultiplier: 1.0 } },
        { type: 'wormhole', data: { id: 'dw3', entryPosition: { nx: 0.85, ny: 0.15 }, exitPosition: { nx: 0.9, ny: 0.1 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 2, speedMultiplier: 0.8 } },
      ],
      initialFuel: 0.85,
      starThresholds: { star3: 0.55, star2: 0.3, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#0A2E2E',
    },
    bonusCoins: 50,
  },
  {
    dayOfWeek: 3, // 水曜
    name: '小惑星サバイバル',
    description: '3本の小惑星帯を突破して生還せよ',
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.5 },
      rocketAngle: 0,
      goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.025, pulseSpeed: 1.0 },
      planets: [
        { id: 'dp1', position: { nx: 0.3, ny: 0.3 }, mass: 15, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
        { id: 'dp2', position: { nx: 0.7, ny: 0.7 }, mass: 15, radius: 0.04, color: '#3498DB', hasRing: false, type: 'ice' },
      ],
      specialObjects: [
        { type: 'asteroidBelt', data: { id: 'da1', points: [{ nx: 0.25, ny: 0.0 }, { nx: 0.25, ny: 0.35 }], width: 0.04, density: 4, speed: 0 } },
        { type: 'asteroidBelt', data: { id: 'da2', points: [{ nx: 0.5, ny: 0.65 }, { nx: 0.5, ny: 1.0 }], width: 0.04, density: 4, speed: 0 } },
        { type: 'asteroidBelt', data: { id: 'da3', points: [{ nx: 0.75, ny: 0.0 }, { nx: 0.75, ny: 0.35 }], width: 0.04, density: 4, speed: 0.5 } },
      ],
      initialFuel: 0.8,
      starThresholds: { star3: 0.45, star2: 0.2, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#1A2151',
    },
    bonusCoins: 50,
  },
  {
    dayOfWeek: 4, // 木曜
    name: 'ブーストラッシュ',
    description: '5つのブースターを全て取れ！',
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.9 },
      rocketAngle: -Math.PI / 4,
      goalStar: { position: { nx: 0.9, ny: 0.1 }, radius: 0.025, pulseSpeed: 1.0 },
      planets: [{ id: 'dp1', position: { nx: 0.5, ny: 0.5 }, mass: 25, radius: 0.05, color: '#9B59B6', hasRing: true, type: 'gas' }],
      specialObjects: [
        { type: 'booster', data: { id: 'db1', position: { nx: 0.2, ny: 0.7 }, radius: 0.02, direction: -Math.PI / 3, power: 70 } },
        { type: 'booster', data: { id: 'db2', position: { nx: 0.35, ny: 0.5 }, radius: 0.02, direction: -Math.PI / 4, power: 70 } },
        { type: 'booster', data: { id: 'db3', position: { nx: 0.5, ny: 0.35 }, radius: 0.02, direction: -Math.PI / 6, power: 70 } },
        { type: 'booster', data: { id: 'db4', position: { nx: 0.65, ny: 0.25 }, radius: 0.02, direction: -Math.PI / 4, power: 70 } },
        { type: 'booster', data: { id: 'db5', position: { nx: 0.8, ny: 0.15 }, radius: 0.02, direction: -Math.PI / 4, power: 70 } },
      ],
      initialFuel: 0.7,
      starThresholds: { star3: 0.4, star2: 0.2, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#1A0A2E',
    },
    bonusCoins: 50,
  },
  {
    dayOfWeek: 5, // 金曜
    name: 'カオスフライト',
    description: '全要素が混在する究極のステージ',
    stageConfig: {
      rocketStart: { nx: 0.5, ny: 0.95 },
      rocketAngle: -Math.PI / 2,
      goalStar: { position: { nx: 0.5, ny: 0.05 }, radius: 0.02, pulseSpeed: 1.5 },
      planets: [
        { id: 'dp1', position: { nx: 0.3, ny: 0.6 }, mass: 20, radius: 0.04, color: '#F39C12', hasRing: false, type: 'gas' },
        { id: 'dp2', position: { nx: 0.7, ny: 0.4 }, mass: 20, radius: 0.04, color: '#E74C3C', hasRing: false, type: 'lava' },
      ],
      specialObjects: [
        { type: 'blackhole', data: { id: 'dbh1', position: { nx: 0.5, ny: 0.5 }, mass: 250, eventHorizonRadius: 0.04, visualRadius: 0.07 } },
        { type: 'wormhole', data: { id: 'dw1', entryPosition: { nx: 0.2, ny: 0.4 }, exitPosition: { nx: 0.8, ny: 0.25 }, entryRadius: 0.025, exitRadius: 0.025, exitAngle: -Math.PI / 4, speedMultiplier: 1.3 } },
        { type: 'asteroidBelt', data: { id: 'da1', points: [{ nx: 0.3, ny: 0.25 }, { nx: 0.7, ny: 0.25 }], width: 0.035, density: 4, speed: 0.8 } },
        { type: 'booster', data: { id: 'db1', position: { nx: 0.5, ny: 0.75 }, radius: 0.02, direction: -Math.PI / 2, power: 120 } },
      ],
      initialFuel: 0.6,
      starThresholds: { star3: 0.3, star2: 0.1, star1: 0.0 },
      maxTrailLength: 300,
      bgColor: '#1A0A00',
    },
    bonusCoins: 80,
  },
  {
    dayOfWeek: 6, // 土曜
    name: 'スピードラン',
    description: '最短ルートで星3を目指せ！燃料が少ない！',
    stageConfig: {
      rocketStart: { nx: 0.1, ny: 0.5 },
      rocketAngle: 0,
      goalStar: { position: { nx: 0.9, ny: 0.5 }, radius: 0.03, pulseSpeed: 2.0 },
      planets: [
        { id: 'dp1', position: { nx: 0.4, ny: 0.35 }, mass: 25, radius: 0.05, color: '#2ECC71', hasRing: true, type: 'rocky' },
        { id: 'dp2', position: { nx: 0.6, ny: 0.65 }, mass: 25, radius: 0.05, color: '#E67E22', hasRing: true, type: 'gas' },
      ],
      specialObjects: [
        { type: 'booster', data: { id: 'db1', position: { nx: 0.5, ny: 0.5 }, radius: 0.02, direction: 0, power: 150 } },
      ],
      initialFuel: 0.5,
      starThresholds: { star3: 0.3, star2: 0.15, star1: 0.0 },
      maxTrailLength: 200,
      bgColor: '#0A0E27',
    },
    bonusCoins: 60,
  },
];
```

### 16.2 連続ボーナス

| 連続日数 | ボーナス |
|---|---|
| 3日 | +20コイン |
| 7日 | +50コイン |
| 14日 | +100コイン |
| 21日 | +200コイン |
| 30日 | +300コイン + 「コズミック」スキン解放 |

### 16.3 リセット仕様

- 日付はデバイスのローカル時刻の0:00で切り替え
- 連続記録はクリアしなくても「プレイした」だけでカウント
- 1日でもプレイしなかった場合、streakは0にリセット

---

## 17. 実績システム（25個）

```typescript
// src/data/achievements.ts

export const ACHIEVEMENTS: Achievement[] = [
  // === launch カテゴリ ===
  {
    id: 'first_launch',
    name: 'はじめの一歩',
    description: '初めてロケットを発射する',
    icon: '🚀',
    targetValue: 1,
    rewardCoins: 10,
    category: 'launch',
  },
  {
    id: 'launches_100',
    name: 'ロケットマニア',
    description: '100回ロケットを発射する',
    icon: '🔥',
    targetValue: 100,
    rewardCoins: 50,
    category: 'launch',
  },
  {
    id: 'launches_500',
    name: 'ミッションコマンダー',
    description: '500回ロケットを発射する',
    icon: '🎖',
    targetValue: 500,
    rewardCoins: 200,
    category: 'launch',
  },
  {
    id: 'launches_1000',
    name: 'レジェンドパイロット',
    description: '1000回ロケットを発射する',
    icon: '👨‍🚀',
    targetValue: 1000,
    rewardCoins: 500,
    category: 'launch',
  },

  // === clear カテゴリ ===
  {
    id: 'first_clear',
    name: '初クリア',
    description: '初めてステージをクリアする',
    icon: '⭐',
    targetValue: 1,
    rewardCoins: 10,
    category: 'clear',
  },
  {
    id: 'clear_10',
    name: '宇宙旅行者',
    description: '10ステージクリアする',
    icon: '🌍',
    targetValue: 10,
    rewardCoins: 30,
    category: 'clear',
  },
  {
    id: 'clear_50',
    name: '銀河探検家',
    description: '50ステージクリアする',
    icon: '🌌',
    targetValue: 50,
    rewardCoins: 100,
    category: 'clear',
  },
  {
    id: 'clear_100',
    name: '宇宙の覇者',
    description: '全100ステージクリアする',
    icon: '🏆',
    targetValue: 100,
    rewardCoins: 500,
    category: 'clear',
  },

  // === star カテゴリ ===
  {
    id: 'stars_50',
    name: 'スターコレクター',
    description: '星を50個集める',
    icon: '✨',
    targetValue: 50,
    rewardCoins: 100,
    category: 'star',
  },
  {
    id: 'stars_150',
    name: 'スターマスター',
    description: '星を150個集める',
    icon: '🌟',
    targetValue: 150,
    rewardCoins: 300,
    category: 'star',
  },
  {
    id: 'all_stars',
    name: 'パーフェクトスター',
    description: '全300個の星を集める（全ステージ星3）',
    icon: '💫',
    targetValue: 300,
    rewardCoins: 1000,
    rewardSkinId: 'gold',
    category: 'star',
  },
  {
    id: 'star3_streak_5',
    name: '連続パーフェクト',
    description: '5ステージ連続で星3を取る',
    icon: '🎯',
    targetValue: 5,
    rewardCoins: 100,
    category: 'star',
  },
  {
    id: 'star3_streak_10',
    name: '止まらない完璧',
    description: '10ステージ連続で星3を取る',
    icon: '💎',
    targetValue: 10,
    rewardCoins: 300,
    category: 'star',
  },

  // === special カテゴリ ===
  {
    id: 'blackhole_graze',
    name: 'ブラックホール生還者',
    description: 'ブラックホールのeventHorizon半径×1.5以内を通過してクリア',
    icon: '🕳',
    targetValue: 1,
    rewardCoins: 200,
    category: 'special',
  },
  {
    id: 'wormhole_10',
    name: 'ワープナビゲーター',
    description: 'ワームホールを10回通過する',
    icon: '🌀',
    targetValue: 10,
    rewardCoins: 50,
    category: 'special',
  },
  {
    id: 'wormhole_50',
    name: 'ディメンションホッパー',
    description: 'ワームホールを50回通過する',
    icon: '🔮',
    targetValue: 50,
    rewardCoins: 200,
    category: 'special',
  },
  {
    id: 'booster_collect_30',
    name: 'ブーストコレクター',
    description: 'ブースターを30個取得する',
    icon: '⚡',
    targetValue: 30,
    rewardCoins: 100,
    category: 'special',
  },
  {
    id: 'one_shot_clear',
    name: 'ワンショットヒーロー',
    description: '燃料90%以上残してクリアする（難易度3以上）',
    icon: '🎪',
    targetValue: 1,
    rewardCoins: 150,
    category: 'special',
  },
  {
    id: 'world1_master',
    name: '太陽系マスター',
    description: 'ワールド1を全ステージ星3でクリア',
    icon: '🌍',
    targetValue: 60, // 20ステージ × 3星
    rewardCoins: 200,
    category: 'special',
  },
  {
    id: 'world5_clear',
    name: '銀河の果てへ',
    description: 'ワールド5のステージ100をクリア',
    icon: '🌟',
    targetValue: 1,
    rewardCoins: 500,
    category: 'special',
  },
  {
    id: 'no_hint_world',
    name: 'ヒントなし制覇',
    description: 'ヒントを一度も使わずにワールド1つをクリア',
    icon: '🧠',
    targetValue: 1,
    rewardCoins: 300,
    category: 'special',
  },

  // === daily カテゴリ ===
  {
    id: 'daily_3',
    name: '三日坊主…じゃない!',
    description: 'デイリーチャレンジを3日連続クリア',
    icon: '📅',
    targetValue: 3,
    rewardCoins: 30,
    category: 'daily',
  },
  {
    id: 'daily_7',
    name: '1週間パイロット',
    description: 'デイリーチャレンジを7日連続クリア',
    icon: '🗓',
    targetValue: 7,
    rewardCoins: 80,
    category: 'daily',
  },
  {
    id: 'daily_30',
    name: '宇宙の日課',
    description: 'デイリーチャレンジを30日連続クリア',
    icon: '🏅',
    targetValue: 30,
    rewardCoins: 500,
    rewardSkinId: 'cosmic',
    category: 'daily',
  },
  {
    id: 'daily_star3_7',
    name: 'パーフェクトウィーク',
    description: 'デイリーチャレンジを7日連続で星3クリア',
    icon: '🌈',
    targetValue: 7,
    rewardCoins: 200,
    category: 'daily',
  },
];
```

### 17.1 実績チェックロジック

```
function checkAchievements(progress: PlayerProgress, event: GameEvent): string[] {
  const newlyUnlocked: string[] = [];

  for (const achievement of ACHIEVEMENTS) {
    const current = progress.achievements[achievement.id];
    if (current?.isUnlocked) continue; // 既に解放済み

    let currentValue = 0;

    switch (achievement.id) {
      case 'first_launch':
      case 'launches_100':
      case 'launches_500':
      case 'launches_1000':
        currentValue = progress.totalLaunches;
        break;

      case 'first_clear':
      case 'clear_10':
      case 'clear_50':
      case 'clear_100':
        currentValue = Object.keys(progress.clearedStages).length;
        break;

      case 'stars_50':
      case 'stars_150':
      case 'all_stars':
        currentValue = progress.totalStars;
        break;

      case 'star3_streak_5':
      case 'star3_streak_10':
        currentValue = calculateCurrentStar3Streak(progress);
        break;

      case 'daily_3':
      case 'daily_7':
      case 'daily_30':
        currentValue = progress.dailyChallenge.streak;
        break;

      // ... 他の実績も同様にチェック
    }

    if (currentValue >= achievement.targetValue) {
      newlyUnlocked.push(achievement.id);
      progress.achievements[achievement.id] = {
        achievementId: achievement.id,
        currentValue,
        isUnlocked: true,
        unlockedAt: Date.now(),
      };
      progress.coins += achievement.rewardCoins;
      if (achievement.rewardSkinId) {
        progress.unlockedSkins.push(achievement.rewardSkinId);
      }
    } else {
      progress.achievements[achievement.id] = {
        achievementId: achievement.id,
        currentValue,
        isUnlocked: false,
        unlockedAt: null,
      };
    }
  }

  return newlyUnlocked; // 解放通知を表示するために返す
}
```

### 17.2 実績解放通知

新しい実績が解放されたら、画面上部からトーストアニメーション（1.5秒表示）:
```
┌──────────────────────────────┐
│ 🏅 実績解放! 「はじめの一歩」 +10💰│
└──────────────────────────────┘
```

---

## 18. 状態管理 (zustand)

### 18.1 gameStore.ts

```typescript
import { create } from 'zustand';

interface GameStore {
  state: GameState;
  // アクション
  initStage: (stageData: StageData) => void;
  startDrag: (position: Vector2D) => void;
  updateDrag: (position: Vector2D) => void;
  endDrag: () => void;
  updatePhysics: (dt: number) => void;
  handleCollision: (result: CollisionResult) => void;
  retry: () => void;
  pause: () => void;
  resume: () => void;
}
```

### 18.2 progressStore.ts

```typescript
interface ProgressStore {
  progress: PlayerProgress;
  // アクション
  loadProgress: () => Promise<void>;
  saveProgress: () => Promise<void>;
  clearStage: (stageId: number, stars: number, fuelRemaining: number, trajectory: Vector2D[]) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  equipSkin: (skinId: string) => void;
  purchaseSkin: (skinId: string) => boolean;
  updateDailyChallenge: (stars: number) => void;
}
```

---

## 19. パフォーマンス最適化

| 対象 | 手法 |
|---|---|
| 物理演算 | サブステップ4回で精度確保しつつ、予測軌道は2倍dtで軽量化 |
| 軌跡描画 | 300ポイント制限、2フレーム間隔保存、古いポイントは削除 |
| 星空背景 | 50個の星をステージ初期化時にランダム生成、以降はキャッシュ |
| 小惑星帯 | 岩石位置をシード固定で生成、毎フレーム再計算しない |
| Skia描画 | useSharedValue + runOnUI でUIスレッド負荷を軽減 |
| サウンド | 起動時に全サウンドプリロード、再生はキャッシュから |
| AsyncStorage | 書き込みはバッチ（同フレーム内の複数変更をまとめる） |
| 広告 | プリロード（ゲーム画面入場時にInterstitialをロード開始） |

---

## 20. EAS Build設定 (eas.json)

```json
{
  "cli": { "version": ">= 13.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "pokkori@example.com",
        "ascAppId": "XXXXXXXXXX"
      },
      "android": {
        "serviceAccountKeyPath": "./play-store-key.json"
      }
    }
  }
}
```

---

## 21. カラーパレット (src/constants/colors.ts)

```typescript
export const COLORS = {
  // 背景
  BG_PRIMARY: '#0A0E27',
  BG_SECONDARY: '#1A2151',

  // UI
  UI_PRIMARY: '#00BFFF',    // メインアクセント（シアン）
  UI_SECONDARY: '#FFD700',  // サブアクセント（ゴールド）
  UI_DANGER: '#FF4444',     // 警告
  UI_SUCCESS: '#00FF7F',    // 成功

  // テキスト
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_SECONDARY: '#B0B0B0',
  TEXT_DISABLED: '#505050',

  // ボタン
  BUTTON_PRIMARY: '#00BFFF',
  BUTTON_PRESSED: '#0099CC',
  BUTTON_DISABLED: '#333333',

  // 星
  STAR_FILLED: '#FFD700',
  STAR_EMPTY: '#333333',

  // レアリティ
  RARITY_COMMON: '#B0B0B0',
  RARITY_RARE: '#4A90D9',
  RARITY_EPIC: '#9B59B6',
  RARITY_LEGENDARY: '#FFD700',

  // ゲームオブジェクト
  GOAL_STAR: '#FFD700',
  BLACKHOLE_RIM: '#FF6B35',
  WORMHOLE_ENTRY: '#00FFFF',
  WORMHOLE_EXIT: '#FF00FF',
  BOOSTER: '#7FFF00',
  ASTEROID: '#808080',
} as const;
```

---

## 22. レイアウト定数 (src/constants/layout.ts)

```typescript
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const LAYOUT = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,

  /** ゲームキャンバスのアスペクト比基準幅 */
  GAME_WIDTH: SCREEN_WIDTH,
  /** ゲームキャンバスのアスペクト比基準高さ */
  GAME_HEIGHT: SCREEN_HEIGHT,

  /** HUDの高さ */
  HUD_HEIGHT: 50,

  /** Banner広告の高さ */
  BANNER_AD_HEIGHT: 50,

  /** ステージグリッドの列数 */
  STAGE_GRID_COLUMNS: 4,

  /** ボタンの角丸 */
  BUTTON_RADIUS: 12,

  /** カードの角丸 */
  CARD_RADIUS: 16,

  /** スリングショットの最大ドラッグ距離(px) */
  MAX_DRAG_DISTANCE_PX: SCREEN_WIDTH * 0.25,

  /** ロケットのタップ判定半径(px) */
  ROCKET_TAP_RADIUS_PX: SCREEN_WIDTH * 0.08,

  /** 正規化座標→ピクセル変換 */
  toPixelX: (nx: number) => nx * SCREEN_WIDTH,
  toPixelY: (ny: number) => ny * SCREEN_HEIGHT,
  toNormalizedX: (px: number) => px / SCREEN_WIDTH,
  toNormalizedY: (py: number) => py / SCREEN_HEIGHT,
} as const;
```

---

以上が「ぶっ飛びロケット (Rocket Fling)」の完全設計書です。全ての仕様が確定しており、「あとで決める」項目はありません。実装者はこの設計書に従って迷いなく実装を進められます。
