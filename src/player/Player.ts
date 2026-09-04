/**
 * Main player controller
 */

import * as THREE from 'three'
import { Vector3, PlayerState, GameDifficulty } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { Vector3Utils, TimeUtils } from '../utils/MathUtils'
import { PhysicsWorld, RigidBody, Collider } from '../physics/PhysicsWorld'
import { PlayerInput } from './PlayerInput'
import { PlayerMovement } from './PlayerMovement'
import { JumpSystem } from './JumpSystem'

export class Player {
  private mesh: THREE.Mesh
  private rigidBody: RigidBody
  private collider: Collider
  private input: PlayerInput
  private movement: PlayerMovement
  private jumpSystem: JumpSystem
  private physicsWorld: PhysicsWorld

  private isGrounded: boolean = false
  private isSprinting: boolean = false
  private isCrouching: boolean = false
  private state: PlayerState
  private groundContactTime: number = 0
  private lastFrameGrounded: boolean = false
  private cameraYaw: number = 0
  private cameraPitch: number = 0
  private cameraSensitivity: number = 1
  private mouseSensitivity: number = 1
  private invertY: boolean = false
  private currentDifficulty: GameDifficulty = GameDifficulty.NORMAL
  private difficultyMultiplier: number = 1

  constructor(position: Vector3, physicsWorld: PhysicsWorld) {
    this.physicsWorld = physicsWorld

    // Create mesh
    this.mesh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.4, 1.8, 4, 8),
      new THREE.MeshStandardMaterial({ color: 0x2563eb })
    )
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    // Create rigidbody
    this.rigidBody = {
      position: Vector3Utils.clone(position),
      velocity: Vector3Utils.zero(),
      acceleration: Vector3Utils.zero(),
      mass: 1,
      friction: GAME_CONFIG.GROUND_FRICTION,
      useGravity: true,
      isKinematic: false
    }

    // Create collider
    this.collider = {
      type: 'capsule',
      size: { x: 0.8, y: 1.8, z: 0.8 },
      offset: Vector3Utils.zero(),
      isTrigger: false,
      rigidBody: this.rigidBody
    }

    // Add to physics world
    this.physicsWorld.addRigidBody(this.rigidBody)
    this.physicsWorld.addCollider('player', this.collider)

    // Initialize systems
    this.input = new PlayerInput()
    this.movement = new PlayerMovement()
    this.jumpSystem = new JumpSystem()

    // Initialize state
    this.state = {
      position: Vector3Utils.clone(position),
      velocity: Vector3Utils.zero(),
      isGrounded: false,
      isJumping: false,
      isSprinting: false,
      isCrouching: false,
      health: 100,
      canJump: true
    }
  }

  update() {
    // Update input
    this.input.update()

    // Check if grounded
    const previousGrounded = this.isGrounded
    this.isGrounded = this.checkGrounded()

    // Handle ground transitions
    if (this.isGrounded && !previousGrounded) {
      this.jumpSystem.onGrounded()
      this.groundContactTime = TimeUtils.time
    }

    // Handle jump input
    if (this.input.getWantJump()) {
      this.jumpSystem.onJumpInputDown()
    }

    // Get movement input
    const moveInput = this.input.getMoveInput()
    this.isSprinting = this.input.getWantSprint() && this.isGrounded
    this.isCrouching = this.input.getWantCrouch()

    // Calculate forward and right vectors
    const forward = this.getForwardVector()
    const right = this.getRightVector()

    // Update movement
    this.rigidBody.velocity = this.movement.update(
      this.input,
      this.isGrounded,
      this.isSprinting,
      this.rigidBody.velocity,
      forward,
      right
    )

    // Handle jumping
    if (this.jumpSystem.canJump(this.isGrounded)) {
      if (this.input.consumeJump()) {
        const jumpVelocity = this.jumpSystem.performJump(
          this.isSprinting,
          { x: this.rigidBody.velocity.x, y: 0, z: this.rigidBody.velocity.z }
        )
        this.rigidBody.velocity.y = jumpVelocity.y
        this.isGrounded = false
      }
    }

    // Update jump hold
    if (this.input.getWantJump()) {
      this.rigidBody.velocity = this.jumpSystem.updateJumpHold(this.rigidBody.velocity)
    }

    // Update mesh position
    this.mesh.position.set(
      this.rigidBody.position.x,
      this.rigidBody.position.y,
      this.rigidBody.position.z
    )

    // Update state
    this.state.position = Vector3Utils.clone(this.rigidBody.position)
    this.state.velocity = Vector3Utils.clone(this.rigidBody.velocity)
    this.state.isGrounded = this.isGrounded
    this.state.isSprinting = this.isSprinting
    this.state.isCrouching = this.isCrouching
    this.state.canJump = this.jumpSystem.canJump(this.isGrounded)
  }

  private checkGrounded(): boolean {
    const groundCheckDistance = GAME_CONFIG.GROUND_CHECK_DISTANCE
    const rayOrigin = { ...this.rigidBody.position, y: this.rigidBody.position.y - 0.9 }
    const rayDirection = { x: 0, y: -1, z: 0 }

    const result = this.physicsWorld.rayCast(rayOrigin, rayDirection, groundCheckDistance)
    return result.hit && result.collider?.isTrigger === false
  }

  private getForwardVector(): Vector3 {
    return {
      x: Math.sin(this.cameraYaw),
      y: 0,
      z: Math.cos(this.cameraYaw)
    }
  }

  private getRightVector(): Vector3 {
    const angle = this.cameraYaw + Math.PI / 2
    return {
      x: Math.sin(angle),
      y: 0,
      z: Math.cos(angle)
    }
  }

  updateCamera() {
    const mouseDelta = this.input.getMouseDelta()
    this.cameraYaw -= mouseDelta.x * this.mouseSensitivity * 0.005
    this.cameraPitch += (this.invertY ? -mouseDelta.y : mouseDelta.y) * this.cameraSensitivity * 0.005

    this.cameraPitch = Math.max(
      GAME_CONFIG.MIN_PITCH,
      Math.min(GAME_CONFIG.MAX_PITCH, this.cameraPitch)
    )
  }

  setDifficulty(difficulty: GameDifficulty) {
    this.currentDifficulty = difficulty
    const settings = GAME_CONFIG.DIFFICULTY_SETTINGS[difficulty]
    this.difficultyMultiplier = settings.jumpForceMultiplier
  }

  getCameraYaw(): number {
    return this.cameraYaw
  }

  getCameraPitch(): number {
    return this.cameraPitch
  }

  getMesh(): THREE.Mesh {
    return this.mesh
  }

  getState(): PlayerState {
    return this.state
  }

  getPosition(): Vector3 {
    return Vector3Utils.clone(this.rigidBody.position)
  }

  setPosition(position: Vector3) {
    this.rigidBody.position = Vector3Utils.clone(position)
    this.rigidBody.velocity = Vector3Utils.zero()
    this.jumpSystem.reset()
  }

  setHealth(health: number) {
    this.state.health = Math.max(0, Math.min(100, health))
  }

  getHealth(): number {
    return this.state.health
  }

  setCameraSensitivity(sensitivity: number) {
    this.cameraSensitivity = sensitivity
  }

  setMouseSensitivity(sensitivity: number) {
    this.mouseSensitivity = sensitivity
  }

  setInvertY(invert: boolean) {
    this.invertY = invert
  }

  reset() {
    this.jumpSystem.reset()
    this.movement.reset()
    this.isGrounded = false
    this.isSprinting = false
    this.isCrouching = false
  }
}
