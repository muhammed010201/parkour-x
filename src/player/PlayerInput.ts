/**
 * Player input handling
 */

import { InputManager } from '../input/InputManager'
import { TimeUtils } from '../utils/MathUtils'

export class PlayerInput {
  private inputManager: InputManager
  private moveInput: { x: number; z: number } = { x: 0, z: 0 }
  private wantJump: boolean = false
  private wantSprint: boolean = false
  private wantCrouch: boolean = false
  private previousJumpState: boolean = false

  constructor() {
    this.inputManager = InputManager.getInstance()
  }

  update() {
    // Movement input
    this.moveInput.x = 0
    this.moveInput.z = 0

    if (this.inputManager.isKeyPressed('moveForward')) this.moveInput.z += 1
    if (this.inputManager.isKeyPressed('moveBackward')) this.moveInput.z -= 1
    if (this.inputManager.isKeyPressed('moveLeft')) this.moveInput.x -= 1
    if (this.inputManager.isKeyPressed('moveRight')) this.moveInput.x += 1

    // Normalize diagonal movement
    const moveLength = Math.sqrt(this.moveInput.x ** 2 + this.moveInput.z ** 2)
    if (moveLength > 0) {
      this.moveInput.x /= moveLength
      this.moveInput.z /= moveLength
    }

    // Sprint input
    this.wantSprint = this.inputManager.isKeyPressed('sprint')

    // Crouch input
    this.wantCrouch = this.inputManager.isKeyPressed('crouch')

    // Jump input (only on press, not hold)
    const isJumpPressed = this.inputManager.isKeyPressed('jump')
    if (isJumpPressed && !this.previousJumpState) {
      this.wantJump = true
    }
    this.previousJumpState = isJumpPressed
  }

  getMoveInput(): { x: number; z: number } {
    return this.moveInput
  }

  getWantJump(): boolean {
    return this.wantJump
  }

  consumeJump(): boolean {
    const jump = this.wantJump
    this.wantJump = false
    return jump
  }

  getWantSprint(): boolean {
    return this.wantSprint && this.moveInput.z > 0.5
  }

  getWantCrouch(): boolean {
    return this.wantCrouch
  }

  getMouseDelta() {
    return this.inputManager.getMouseDelta()
  }
}
