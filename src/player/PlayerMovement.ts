/**
 * Player movement logic
 */

import { Vector3 } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { Vector3Utils, TimeUtils, MathUtils } from '../utils/MathUtils'
import { PlayerInput } from './PlayerInput'

export class PlayerMovement {
  private moveSpeed: number = GAME_CONFIG.PLAYER_SPEED
  private sprintSpeed: number = GAME_CONFIG.PLAYER_SPRINT_SPEED
  private acceleration: number = GAME_CONFIG.PLAYER_ACCELERATION
  private deceleration: number = GAME_CONFIG.PLAYER_DECELERATION
  private airAcceleration: number = GAME_CONFIG.AIR_ACCELERATION
  private airMaxSpeed: number = GAME_CONFIG.AIR_MAX_SPEED

  private currentVelocity: Vector3 = Vector3Utils.zero()
  private currentDirection: { x: number; z: number } = { x: 0, z: 0 }

  update(
    input: PlayerInput,
    isGrounded: boolean,
    isSprinting: boolean,
    velocity: Vector3,
    forward: Vector3,
    right: Vector3
  ): Vector3 {
    const moveInput = input.getMoveInput()

    if (isGrounded) {
      return this.updateGroundMovement(moveInput, isSprinting, forward, right, velocity)
    } else {
      return this.updateAirMovement(moveInput, forward, right, velocity)
    }
  }

  private updateGroundMovement(
    moveInput: { x: number; z: number },
    isSprinting: boolean,
    forward: Vector3,
    right: Vector3,
    velocity: Vector3
  ): Vector3 {
    const targetSpeed = isSprinting ? this.sprintSpeed : this.moveSpeed
    const moveDirection = Vector3Utils.add(
      Vector3Utils.multiply(forward, moveInput.z),
      Vector3Utils.multiply(right, moveInput.x)
    )

    // Calculate horizontal velocity
    let horizontalVel = { x: velocity.x, y: 0, z: velocity.z }
    const currentSpeed = Vector3Utils.length(horizontalVel)

    if (moveInput.x !== 0 || moveInput.z !== 0) {
      // Accelerate
      const targetVel = Vector3Utils.multiply(moveDirection, targetSpeed)
      const accelRate = Math.min(this.acceleration * TimeUtils.deltaTime, targetSpeed)

      horizontalVel = {
        x: MathUtils.lerp(horizontalVel.x, targetVel.x, accelRate / targetSpeed),
        y: 0,
        z: MathUtils.lerp(horizontalVel.z, targetVel.z, accelRate / targetSpeed)
      }
    } else {
      // Decelerate
      const decelRate = Math.min(this.deceleration * TimeUtils.deltaTime, currentSpeed)
      horizontalVel = Vector3Utils.multiply(horizontalVel, Math.max(0, 1 - decelRate / Math.max(currentSpeed, 0.1)))
    }

    return {
      x: horizontalVel.x,
      y: velocity.y,
      z: horizontalVel.z
    }
  }

  private updateAirMovement(
    moveInput: { x: number; z: number },
    forward: Vector3,
    right: Vector3,
    velocity: Vector3
  ): Vector3 {
    if (moveInput.x === 0 && moveInput.z === 0) {
      return velocity
    }

    const moveDirection = Vector3Utils.add(
      Vector3Utils.multiply(forward, moveInput.z),
      Vector3Utils.multiply(right, moveInput.x)
    )

    const airAccel = Vector3Utils.multiply(
      moveDirection,
      this.airAcceleration * TimeUtils.deltaTime
    )

    let newVelocity = Vector3Utils.add(velocity, airAccel)

    // Limit air speed
    const horizontalSpeed = Math.sqrt(newVelocity.x ** 2 + newVelocity.z ** 2)
    if (horizontalSpeed > this.airMaxSpeed) {
      const speedRatio = this.airMaxSpeed / horizontalSpeed
      newVelocity.x *= speedRatio
      newVelocity.z *= speedRatio
    }

    return newVelocity
  }

  setDirection(forward: Vector3) {
    this.currentDirection.x = forward.x
    this.currentDirection.z = forward.z
  }

  reset() {
    this.currentVelocity = Vector3Utils.zero()
    this.currentDirection = { x: 0, z: 0 }
  }
}
