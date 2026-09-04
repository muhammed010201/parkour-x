/**
 * Level loader and manager
 */

import * as THREE from 'three'
import { LevelData, GameDifficulty, PlatformData, ObstacleData } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { CheckpointSystem } from './CheckpointSystem'

export class Level {
  private scene: THREE.Scene
  private levelData: LevelData
  private meshes: Map<string, THREE.Mesh> = new Map()
  private checkpointSystem: CheckpointSystem
  private difficulty: GameDifficulty
  private platforms: THREE.Group
  private obstacles: THREE.Group

  constructor(
    scene: THREE.Scene,
    levelData: LevelData,
    difficulty: GameDifficulty
  ) {
    this.scene = scene
    this.levelData = levelData
    this.difficulty = difficulty
    this.checkpointSystem = new CheckpointSystem()

    this.platforms = new THREE.Group()
    this.obstacles = new THREE.Group()
    this.scene.add(this.platforms)
    this.scene.add(this.obstacles)

    this.initialize()
  }

  private initialize() {
    // Add platforms
    for (const platformData of this.levelData.platforms) {
      this.createPlatform(platformData)
    }

    // Add obstacles
    for (const obstacleData of this.levelData.obstacles) {
      this.createObstacle(obstacleData)
    }

    // Add checkpoints
    for (const checkpointData of this.levelData.checkpoints) {
      this.checkpointSystem.addCheckpoint(checkpointData)
    }
  }

  private createPlatform(data: PlatformData) {
    const diffSettings = GAME_CONFIG.DIFFICULTY_SETTINGS[this.difficulty]
    const scale = diffSettings.platformScale

    const geometry = new THREE.BoxGeometry(
      data.scale.x * scale,
      data.scale.y * scale,
      data.scale.z * scale
    )

    // Create material based on type
    const material = this.createMaterial(data.material)
    const mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(data.position.x, data.position.y, data.position.z)
    mesh.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.platforms.add(mesh)
    this.meshes.set(data.id, mesh)
  }

  private createObstacle(data: ObstacleData) {
    let geometry: THREE.BufferGeometry
    let mesh: THREE.Mesh

    switch (data.type) {
      case 'moving':
        geometry = new THREE.BoxGeometry(data.scale.x, data.scale.y, data.scale.z)
        break
      case 'rotating':
        geometry = new THREE.BoxGeometry(data.scale.x, data.scale.y, data.scale.z)
        break
      case 'spike':
        geometry = new THREE.ConeGeometry(data.scale.x / 2, data.scale.y, 4)
        break
      default:
        geometry = new THREE.BoxGeometry(data.scale.x, data.scale.y, data.scale.z)
    }

    const material = new THREE.MeshStandardMaterial({ color: 0xef4444 })
    mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(data.position.x, data.position.y, data.position.z)
    mesh.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)
    mesh.castShadow = true
    mesh.receiveShadow = true

    this.obstacles.add(mesh)
    this.meshes.set(data.id, mesh)
  }

  private createMaterial(materialType: string): THREE.Material {
    const colors: { [key: string]: number } = {
      concrete: 0x7f8c8d,
      stone: 0x95a5a6,
      wood: 0x8b4513,
      metal: 0xbdc3c7,
      brick: 0xd35400,
      glass: 0xb0e0e6,
      platform: 0x2ecc71
    }

    const color = colors[materialType] || 0x7f8c8d
    return new THREE.MeshStandardMaterial({
      color,
      roughness: materialType === 'metal' ? 0.3 : 0.7,
      metalness: materialType === 'metal' ? 0.8 : 0.1
    })
  }

  getMesh(id: string): THREE.Mesh | undefined {
    return this.meshes.get(id)
  }

  getCheckpointSystem(): CheckpointSystem {
    return this.checkpointSystem
  }

  getSpawnPosition() {
    return this.levelData.spawn
  }

  getFinishPosition() {
    return this.levelData.finish
  }

  getPlatforms(): THREE.Group {
    return this.platforms
  }

  getObstacles(): THREE.Group {
    return this.obstacles
  }

  dispose() {
    this.platforms.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    this.obstacles.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => mat.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    this.scene.remove(this.platforms)
    this.scene.remove(this.obstacles)
  }
}
