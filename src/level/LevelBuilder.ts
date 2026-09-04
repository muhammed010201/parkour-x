/**
 * Level data builder and loader
 */

import { LevelData, GameDifficulty, PlatformData, CheckpointData } from '../data/types'
import { Vector3Utils } from '../utils/MathUtils'

export class LevelBuilder {
  static createTutorialLevel(difficulty: GameDifficulty): LevelData {
    const platforms: PlatformData[] = [
      {
        id: 'start_platform',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 3 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'platform_1',
        position: { x: 5, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 0.5, z: 2 },
        material: 'wood',
        isMoving: false
      },
      {
        id: 'platform_2',
        position: { x: 10, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 0.5, z: 2 },
        material: 'wood',
        isMoving: false
      },
      {
        id: 'platform_3',
        position: { x: 15, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 0.5, z: 2 },
        material: 'stone',
        isMoving: false
      },
      {
        id: 'finish_platform',
        position: { x: 20, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 3 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: CheckpointData[] = [
      {
        id: 'checkpoint_0',
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        levelId: 'tutorial_level',
        index: 0
      },
      {
        id: 'checkpoint_1',
        position: { x: 10, y: 2.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        levelId: 'tutorial_level',
        index: 1
      }
    ]

    return {
      id: 'tutorial_level',
      name: 'Tutorial Level',
      difficulty,
      section: 1,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 20, y: 0.5, z: 0 }
    }
  }

  static createLevel1(difficulty: GameDifficulty): LevelData {
    const platforms: PlatformData[] = [
      {
        id: 'start_platform',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'concrete',
        isMoving: false
      },
      {
        id: 'platform_1',
        position: { x: 6, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2.5, y: 0.5, z: 2.5 },
        material: 'wood',
        isMoving: false
      },
      {
        id: 'platform_2',
        position: { x: 12, y: 4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2, y: 0.5, z: 2 },
        material: 'stone',
        isMoving: false
      },
      {
        id: 'platform_3',
        position: { x: 18, y: 2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 2.5, y: 0.5, z: 2.5 },
        material: 'metal',
        isMoving: false
      },
      {
        id: 'finish_platform',
        position: { x: 24, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 4, y: 0.5, z: 4 },
        material: 'platform',
        isMoving: false
      }
    ]

    const checkpoints: CheckpointData[] = [
      {
        id: 'checkpoint_0',
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        levelId: 'level_1',
        index: 0
      },
      {
        id: 'checkpoint_1',
        position: { x: 12, y: 4.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0, w: 1 },
        levelId: 'level_1',
        index: 1
      }
    ]

    return {
      id: 'level_1',
      name: 'Level 1 - Rising Challenge',
      difficulty,
      section: 1,
      platforms,
      obstacles: [],
      checkpoints,
      collectibles: [],
      spawn: { x: 0, y: 1, z: 0 },
      finish: { x: 24, y: 0.5, z: 0 }
    }
  }
}
