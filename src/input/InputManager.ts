/**
 * Centralized input management system
 */

import { InputMap, GameSettings } from '../data/types'
import { DEFAULT_CONTROLS } from '../data/constants'

export class InputManager {
  private static instance: InputManager
  private keysPressed: Map<string, boolean> = new Map()
  private keyBindings: InputMap = { ...DEFAULT_CONTROLS }
  private mouseX: number = 0
  private mouseY: number = 0
  private mouseDeltaX: number = 0
  private mouseDeltaY: number = 0
  private lastMouseX: number = 0
  private lastMouseY: number = 0
  private isLocked: boolean = false

  private constructor() {
    this.initialize()
  }

  static getInstance(): InputManager {
    if (!InputManager.instance) {
      InputManager.instance = new InputManager()
    }
    return InputManager.instance
  }

  private initialize() {
    window.addEventListener('keydown', (e) => this.onKeyDown(e))
    window.addEventListener('keyup', (e) => this.onKeyUp(e))
    window.addEventListener('mousemove', (e) => this.onMouseMove(e))
    window.addEventListener('mousedown', () => this.requestLockPointer())

    document.addEventListener('pointerlockchange', () => {
      this.isLocked = document.pointerLockElement === document.body
    })
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keysPressed.set(event.code, true)
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keysPressed.set(event.code, false)
  }

  private onMouseMove(event: MouseEvent) {
    this.lastMouseX = this.mouseX
    this.lastMouseY = this.mouseY
    this.mouseX = event.clientX
    this.mouseY = event.clientY
    this.mouseDeltaX = this.mouseX - this.lastMouseX
    this.mouseDeltaY = this.mouseY - this.lastMouseY
  }

  private requestLockPointer() {
    if (!this.isLocked) {
      document.body.requestPointerLock()
    }
  }

  isKeyPressed(action: keyof InputMap): boolean {
    const key = this.keyBindings[action]
    return this.keysPressed.get(key) || false
  }

  getMouseDelta(): { x: number; y: number } {
    return { x: this.mouseDeltaX, y: this.mouseDeltaY }
  }

  getMousePosition(): { x: number; y: number } {
    return { x: this.mouseX, y: this.mouseY }
  }

  setKeyBinding(action: keyof InputMap, key: string) {
    this.keyBindings[action] = key
  }

  getKeyBinding(action: keyof InputMap): string {
    return this.keyBindings[action]
  }

  loadSettings(settings: GameSettings) {
    this.keyBindings = { ...settings.controls }
  }

  unlockPointer() {
    if (this.isLocked) {
      document.exitPointerLock()
    }
  }

  isPointerLocked(): boolean {
    return this.isLocked
  }
}
