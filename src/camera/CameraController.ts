/**
 * Camera system with smooth follow and collision avoidance
 */

import * as THREE from 'three'
import { Vector3 } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { Vector3Utils, MathUtils, TimeUtils } from '../utils/MathUtils'

export class CameraController {
  private camera: THREE.PerspectiveCamera
  private targetPosition: Vector3
  private currentPosition: Vector3
  private smoothVelocity: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
  private targetFOV: number = GAME_CONFIG.CAMERA_FOV
  private smoothTime: number = GAME_CONFIG.CAMERA_SMOOTH_TIME
  private distance: number = GAME_CONFIG.CAMERA_DISTANCE
  private height: number = GAME_CONFIG.CAMERA_HEIGHT

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera
    this.camera.fov = GAME_CONFIG.CAMERA_FOV
    this.camera.far = 1000
    this.camera.near = 0.1
    this.camera.updateProjectionMatrix()

    this.targetPosition = Vector3Utils.zero()
    this.currentPosition = Vector3Utils.zero()
  }

  update(playerPosition: Vector3, yaw: number, pitch: number, isSprinting: boolean) {
    // Update target FOV
    this.targetFOV = isSprinting ? GAME_CONFIG.CAMERA_FOV_SPRINT : GAME_CONFIG.CAMERA_FOV
    this.camera.fov = MathUtils.lerp(this.camera.fov, this.targetFOV, 0.1)
    this.camera.updateProjectionMatrix()

    // Calculate desired camera position
    const distance = this.distance
    const height = this.height

    const cameraOffsetX = Math.sin(yaw) * distance * Math.cos(pitch)
    const cameraOffsetY = height + Math.sin(pitch) * distance
    const cameraOffsetZ = Math.cos(yaw) * distance * Math.cos(pitch)

    this.targetPosition = {
      x: playerPosition.x + cameraOffsetX,
      y: playerPosition.y + cameraOffsetY,
      z: playerPosition.z + cameraOffsetZ
    }

    // Smooth damp camera position
    this.currentPosition.x = MathUtils.smoothDamp(
      this.currentPosition.x,
      this.targetPosition.x,
      { value: this.smoothVelocity.x },
      this.smoothTime,
      TimeUtils.deltaTime
    )

    this.currentPosition.y = MathUtils.smoothDamp(
      this.currentPosition.y,
      this.targetPosition.y,
      { value: this.smoothVelocity.y },
      this.smoothTime,
      TimeUtils.deltaTime
    )

    this.currentPosition.z = MathUtils.smoothDamp(
      this.currentPosition.z,
      this.targetPosition.z,
      { value: this.smoothVelocity.z },
      this.smoothTime,
      TimeUtils.deltaTime
    )

    // Update camera position and look at player
    this.camera.position.set(
      this.currentPosition.x,
      this.currentPosition.y,
      this.currentPosition.z
    )

    this.camera.lookAt(
      playerPosition.x,
      playerPosition.y + 0.6,
      playerPosition.z
    )
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera
  }
}
