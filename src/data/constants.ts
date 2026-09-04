/**
 * Game constants and configuration
 */

export const GAME_CONFIG = {
  // Game title
  TITLE: 'PARKOUR X',
  VERSION: '1.0.0',

  // Canvas settings
  CANVAS_WIDTH: 1920,
  CANVAS_HEIGHT: 1080,
  PIXEL_RATIO: typeof window !== 'undefined' ? window.devicePixelRatio : 1,

  // Physics
  GRAVITY: -9.81,
  AIR_RESISTANCE: 0.99,
  GROUND_FRICTION: 0.8,
  MAX_VELOCITY: 50,

  // Player movement
  PLAYER_SPEED: 15,
  PLAYER_SPRINT_SPEED: 25,
  PLAYER_ACCELERATION: 100,
  PLAYER_DECELERATION: 80,

  // Jumping
  JUMP_FORCE: 12,
  SPRINT_JUMP_FORCE: 15,
  MAX_JUMP_HOLD_TIME: 0.2,
  MIN_JUMP_FORCE: 5,
  COYOTE_TIME: 0.15,
  JUMP_BUFFER_TIME: 0.1,

  // Air control
  AIR_ACCELERATION: 30,
  AIR_MAX_SPEED: 10,

  // Camera
  CAMERA_DISTANCE: 5,
  CAMERA_HEIGHT: 2,
  CAMERA_SMOOTH_TIME: 0.3,
  CAMERA_FOV: 75,
  CAMERA_FOV_SPRINT: 85,
  MIN_PITCH: -Math.PI / 2.2,
  MAX_PITCH: Math.PI / 3,

  // Collision
  PLAYER_RADIUS: 0.4,
  PLAYER_HEIGHT: 1.8,
  GROUND_CHECK_DISTANCE: 0.1,
  COLLISION_LAYERS: {
    PLAYER: 1,
    PLATFORM: 2,
    OBSTACLE: 4,
    COLLECTIBLE: 8,
    CHECKPOINT: 16,
    DEATH_ZONE: 32
  },

  // Level
  DEATH_BOUNDARY: -100,
  CHECKPOINT_RESPAWN_DELAY: 0.5,
  LEVEL_COMPLETE_DELAY: 2,

  // Difficulty multipliers
  DIFFICULTY_SETTINGS: {
    EASY: {
      platformScale: 1.5,
      obstacleSpeed: 0.7,
      jumpForceMultiplier: 1.1,
      checkpointDistance: 2.0,
      platformGap: 0.8
    },
    NORMAL: {
      platformScale: 1.0,
      obstacleSpeed: 1.0,
      jumpForceMultiplier: 1.0,
      checkpointDistance: 1.0,
      platformGap: 1.0
    },
    HARD: {
      platformScale: 0.85,
      obstacleSpeed: 1.3,
      jumpForceMultiplier: 0.95,
      checkpointDistance: 0.7,
      platformGap: 1.2
    },
    EXTREME: {
      platformScale: 0.7,
      obstacleSpeed: 1.6,
      jumpForceMultiplier: 0.9,
      checkpointDistance: 0.5,
      platformGap: 1.4
    },
    INSANE: {
      platformScale: 0.6,
      obstacleSpeed: 2.0,
      jumpForceMultiplier: 0.85,
      checkpointDistance: 0.3,
      platformGap: 1.6
    }
  },

  // Audio
  AUDIO_CHANNELS: {
    MUSIC: 0.7,
    SFX: 0.8,
    AMBIENT: 0.5,
    MASTER: 1.0
  },

  // UI
  UI_TRANSITION_TIME: 0.3,
  BUTTON_SCALE: 1.0,

  // Storage keys
  STORAGE_KEYS: {
    PROGRESS: 'parkour_x_progress',
    SETTINGS: 'parkour_x_settings',
    LEVEL_DATA: 'parkour_x_levels'
  }
}

export const DEFAULT_CONTROLS = {
  moveForward: 'KeyW',
  moveBackward: 'KeyS',
  moveLeft: 'KeyA',
  moveRight: 'KeyD',
  jump: 'Space',
  sprint: 'ShiftLeft',
  crouch: 'ControlLeft',
  interact: 'KeyE',
  pause: 'Escape',
  restart: 'KeyR'
}

export const DEFAULT_GRAPHICS_SETTINGS = {
  quality: 'HIGH' as const,
  fpsLimit: 60,
  enableShadows: true,
  enableLighting: true,
  textureDensity: 1.0,
  effectsEnabled: true,
  fov: 75
}

export const DEFAULT_AUDIO_SETTINGS = {
  masterVolume: 1.0,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  ambientVolume: 0.5,
  enabled: true
}
