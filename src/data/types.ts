/**
 * Core game type definitions
 */

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion {
  x: number;
  y: number;
  z: number;
  w: number;
}

export enum GameDifficulty {
  EASY = 'EASY',
  NORMAL = 'NORMAL',
  HARD = 'HARD',
  EXTREME = 'EXTREME',
  INSANE = 'INSANE'
}

export enum GameState {
  MENU = 'MENU',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  LEVEL_COMPLETE = 'LEVEL_COMPLETE',
  GAME_OVER = 'GAME_OVER'
}

export interface PlayerState {
  position: Vector3;
  velocity: Vector3;
  isGrounded: boolean;
  isJumping: boolean;
  isSprinting: boolean;
  isCrouching: boolean;
  health: number;
  canJump: boolean;
}

export interface CheckpointData {
  id: string;
  position: Vector3;
  rotation: Quaternion;
  levelId: string;
  index: number;
}

export interface LevelData {
  id: string;
  name: string;
  difficulty: GameDifficulty;
  section: number;
  platforms: PlatformData[];
  obstacles: ObstacleData[];
  checkpoints: CheckpointData[];
  collectibles: CollectibleData[];
  spawn: Vector3;
  finish: Vector3;
}

export interface PlatformData {
  id: string;
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  material: string;
  isMoving: boolean;
  movementPath?: Vector3[];
  movementDuration?: number;
}

export interface ObstacleData {
  id: string;
  type: 'platform' | 'spike' | 'moving' | 'rotating';
  position: Vector3;
  rotation: Vector3;
  scale: Vector3;
  speed?: number;
  damage?: number;
}

export interface CollectibleData {
  id: string;
  type: 'coin' | 'token' | 'orb' | 'secret';
  position: Vector3;
  points: number;
  hidden: boolean;
}

export interface GameProgress {
  currentDifficulty: GameDifficulty;
  currentLevel: number;
  currentSection: number;
  currentCheckpoint: number;
  unlockedDifficulties: GameDifficulty[];
  levelProgress: LevelProgress[];
  totalScore: number;
  totalDeaths: number;
}

export interface LevelProgress {
  levelId: string;
  completed: boolean;
  bestTime: number;
  bestScore: number;
  deaths: number;
  collectibles: number;
}

export interface InputMap {
  moveForward: string;
  moveBackward: string;
  moveLeft: string;
  moveRight: string;
  jump: string;
  sprint: string;
  crouch: string;
  interact: string;
  pause: string;
  restart: string;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  ambientVolume: number;
  enabled: boolean;
}

export interface GraphicsSettings {
  quality: 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA';
  fpsLimit: 30 | 60 | 120 | number;
  enableShadows: boolean;
  enableLighting: boolean;
  textureDensity: number;
  effectsEnabled: boolean;
  fov: number;
}

export interface GameSettings {
  graphics: GraphicsSettings;
  audio: AudioSettings;
  controls: InputMap;
  cameraSensitivity: number;
  mouseSensitivity: number;
  invertY: boolean;
  enableCameraShake: boolean;
  enableMotionEffects: boolean;
  uiScale: number;
}
