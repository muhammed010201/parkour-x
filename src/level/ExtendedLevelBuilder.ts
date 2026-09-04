/**
 * Extended level builders for all modes
 */

import { LevelData, GameDifficulty, PlatformData, ObstacleData, CollectibleData } from '../data/types'

export class ExtendedLevelBuilder {
  // LEVEL 2 - URBAN PARKOUR
  static createLevel2(difficulty: GameDifficulty): LevelData {
    const diffSettings = require('../data/constants').GAME_CONFIG.DIFFICULTY_SETTINGS[difficulty]
    const platforms: PlatformData[] = [
      {
        id: 'start',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 5, y: 0.5, z: 5 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'building1',
        position: { x: 8, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 4 },
        material: 'brick',
        isMoving: false
      },
      {
        id: 'building2',
        position: { x: 16, y: 5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 4 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'building3',
        position: { x: 24, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 4 },
        material: 'glass',
        isMoving: false
      },
      {
        id: 'finish',
        position: { x: 32, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 5, y: 0.5, z: 5 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: any[] = [
      { id: 'cp0', position: { x: 0, y: 1, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_2', index: 0 },
      { id: 'cp1', position: { x: 16, y: 5.5, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_2', index: 1 }
    ]

    return {
      id: 'level_2',
      name: 'Level 2 - Urban Parkour',
      difficulty,
      section: 2,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 32, y: 0.5, z: 0 }
    }
  }

  // LEVEL 3 - CONSTRUCTION ZONE
  static createLevel3(difficulty: GameDifficulty): LevelData {
    const platforms: PlatformData[] = [
      {
        id: 'start',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'beam1',
        position: { x: 6, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.5, y: 0.5, z: 3 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'beam2',
        position: { x: 12, y: 4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.5, y: 0.5, z: 3 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'platform_high',
        position: { x: 18, y: 6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 3 },
        material: 'brick',
        isMoving: false
      },
      {
        id: 'finish',
        position: { x: 26, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: any[] = [
      { id: 'cp0', position: { x: 0, y: 1, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_3', index: 0 },
      { id: 'cp1', position: { x: 18, y: 6.5, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_3', index: 1 }
    ]

    return {
      id: 'level_3',
      name: 'Level 3 - Construction Zone',
      difficulty,
      section: 3,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 26, y: 0.5, z: 0 }
    }
  }

  // LEVEL 4 - WAREHOUSE
  static createLevel4(difficulty: GameDifficulty): LevelData {
    const platforms: PlatformData[] = [
      {
        id: 'start',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'box1',
        position: { x: 5, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 2, z: 2 },
        material: 'wood',
        isMoving: false
      },
      {
        id: 'box2',
        position: { x: 10, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 2, z: 2 },
        material: 'wood',
        isMoving: false
      },
      {
        id: 'shelf',
        position: { x: 15, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 2 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'finish',
        position: { x: 22, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: any[] = [
      { id: 'cp0', position: { x: 0, y: 1, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_4', index: 0 },
      { id: 'cp1', position: { x: 10, y: 3.5, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_4', index: 1 }
    ]

    return {
      id: 'level_4',
      name: 'Level 4 - Warehouse',
      difficulty,
      section: 4,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 22, y: 0.5, z: 0 }
    }
  }

  // LEVEL 5 - EXTREME CHALLENGE
  static createLevel5(difficulty: GameDifficulty): LevelData {
    const platforms: PlatformData[] = [
      {
        id: 'start',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'narrow1',
        position: { x: 6, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 0.5, z: 3 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'narrow2',
        position: { x: 12, y: 6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 0.5, z: 3 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'jump_gap',
        position: { x: 18, y: 3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.5, y: 0.5, z: 1.5 },
        material: 'stone',
        isMoving: false
      },
      {
        id: 'final_stretch',
        position: { x: 24, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.5, y: 0.5, z: 2 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'finish',
        position: { x: 30, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: any[] = [
      { id: 'cp0', position: { x: 0, y: 1, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_5', index: 0 },
      { id: 'cp1', position: { x: 12, y: 6.5, z: 0 }, rotation: { x: 0, y: 0, z: 0, w: 1 }, levelId: 'level_5', index: 1 }
    ]

    return {
      id: 'level_5',
      name: 'Level 5 - Extreme Challenge',
      difficulty,
      section: 5,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 30, y: 0.5, z: 0 }
    }
  }
}
