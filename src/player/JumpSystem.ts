/**
 * Player jump system with coyote time and jump buffer
 */

import { Vector3, PlayerState } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { TimeUtils } from '../utils/MathUtils'

export class JumpSystem {
  private jumpForce: number = GAME_CONFIG.JUMP_FORCE
  private sprintJumpForce: number = GAME_CONFIG.SPRINT_JUMP_FORCE
  private maxJumpHoldTime: number = GAME_CONFIG.MAX_JUMP_HOLD_TIME
  private minJumpForce: number = GAME_CONFIG.MIN_JUMP_FORCE
  private coyoteTime: number = GAME_CONFIG.COYOTE_TIME
  private jumpBufferTime: number = GAME_CONFIG.JUMP_BUFFER_TIME

  private lastGroundedTime: number = 0
  private jumpInputTime: number = -Infinity
  private isJumpHeld: boolean = false
  private jumpHoldDuration: number = 0
  private totalJumps: number = 0

  canJump(isGrounded: boolean): boolean {
    const timeSinceGrounded = TimeUtils.time - this.lastGroundedTime
    const timeSinceJumpInput = TimeUtils.time - this.jumpInputTime

    return (
      (isGrounded || timeSinceGrounded < this.coyoteTime) &&
      timeSinceJumpInput < this.jumpBufferTime
    )
  }

  performJump(isSprinting: boolean, airControl: Vector3): Vector3 {
    const jumpForce = isSprinting ? this.sprintJumpForce : this.jumpForce
    this.totalJumps++
    this.jumpInputTime = -Infinity // Consume input

    return {
      x: airControl.x,
      y: jumpForce,
      z: airControl.z
    }
  }

  onJumpInputDown() {
    this.jumpInputTime = TimeUtils.time
    this.isJumpHeld = true
    this.jumpHoldDuration = 0
  }

  onJumpInputUp() {
    this.isJumpHeld = false
  }

  onGrounded() {
    this.lastGroundedTime = TimeUtils.time
    this.totalJumps = 0
  }

  updateJumpHold(velocity: Vector3): Vector3 {
    if (this.isJumpHeld && velocity.y > 0) {
      this.jumpHoldDuration += TimeUtils.deltaTime

      if (this.jumpHoldDuration < this.maxJumpHoldTime) {
        const holdBoost = (1 - this.jumpHoldDuration / this.maxJumpHoldTime) * 2
        velocity.y += holdBoost * TimeUtils.deltaTime
        velocity.y = Math.max(this.minJumpForce, velocity.y)
      }
    }

    return velocity
  }

  reset() {
    this.jumpInputTime = -Infinity
    this.isJumpHeld = false
    this.jumpHoldDuration = 0
    this.totalJumps = 0
  }
}
