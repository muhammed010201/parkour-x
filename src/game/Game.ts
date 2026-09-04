/**
 * Main game manager and loop
 */

import * as THREE from 'three'
import { GameState, GameDifficulty, GameProgress } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { TimeUtils } from '../utils/MathUtils'
import { Player } from '../player/Player'
import { CameraController } from '../camera/CameraController'
import { Level } from '../level/Level'
import { LevelBuilder } from '../level/LevelBuilder'
import { PhysicsWorld } from '../physics/PhysicsWorld'
import { UIManager } from '../ui/UIManager'
import { AudioManager } from '../audio/AudioManager'
import { SaveSystem } from '../systems/SaveSystem'

export class Game {
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private renderer: THREE.WebGLRenderer
  private cameraController: CameraController
  private player: Player | null = null
  private level: Level | null = null
  private physicsWorld: PhysicsWorld
  private uiManager: UIManager
  private audioManager: AudioManager
  private saveSystem: SaveSystem

  private gameState: GameState = GameState.MENU
  private currentDifficulty: GameDifficulty = GameDifficulty.NORMAL
  private currentLevel: number = 1
  private levelStartTime: number = 0
  private deaths: number = 0
  private score: number = 0
  private gameProgress: GameProgress
  private isPaused: boolean = false
  private fpsLimit: number = 60
  private fpsCounter: number = 0
  private frameTime: number = 1000 / this.fpsLimit

  constructor() {
    // Initialize Three.js
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1a1a1a)
    this.scene.fog = new THREE.Fog(0x1a1a1a, 100, 500)

    this.camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.CAMERA_FOV,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    this.renderer = new THREE.WebGLRenderer({ antialias: true, precision: 'highp' })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(GAME_CONFIG.PIXEL_RATIO)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap
    document.body.appendChild(this.renderer.domElement)

    // Initialize systems
    this.physicsWorld = new PhysicsWorld()
    this.cameraController = new CameraController(this.camera)
    this.uiManager = new UIManager()
    this.audioManager = AudioManager.getInstance()
    this.saveSystem = new SaveSystem()

    // Load game progress
    const savedProgress = this.saveSystem.loadProgress()
    this.gameProgress = savedProgress || this.saveSystem.getDefaultProgress()

    // Setup lighting
    this.setupLighting()

    // Setup event listeners
    this.setupEventListeners()

    // Setup UI event handlers
    this.setupUIHandlers()
  }

  private setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(50, 50, 50)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.far = 200
    directionalLight.shadow.camera.left = -100
    directionalLight.shadow.camera.right = 100
    directionalLight.shadow.camera.top = 100
    directionalLight.shadow.camera.bottom = -100
    this.scene.add(directionalLight)

    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000)
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -50
    ground.receiveShadow = true
    this.scene.add(ground)
  }

  private setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize())
    window.addEventListener('keydown', (e) => this.onKeyDown(e))
  }

  private setupUIHandlers() {
    this.uiManager.on('menuAction', (action) => this.handleMenuAction(action))
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      if (this.gameState === GameState.PLAYING) {
        this.isPaused = !this.isPaused
        if (this.isPaused) {
          this.uiManager.showPauseMenu()
        } else {
          this.uiManager.hideMenu()
        }
      }
    }
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private handleMenuAction(action: string) {
    switch (action) {
      case 'play':
        this.startGame()
        break
      case 'resume':
        this.isPaused = false
        this.uiManager.hideMenu()
        break
      case 'restart':
        this.restartLevel()
        break
      case 'nextlevel':
        this.nextLevel()
        break
      case 'replay':
        this.restartLevel()
        break
      case 'mainmenu':
        this.backToMainMenu()
        break
      case 'settings':
        // TODO: Show settings menu
        break
      case 'credits':
        // TODO: Show credits
        break
    }
  }

  private startGame() {
    this.gameState = GameState.LOADING
    this.uiManager.showLoading(0)
    this.loadLevel(this.currentLevel, this.currentDifficulty)
    this.gameState = GameState.PLAYING
    this.levelStartTime = performance.now()
    this.deaths = 0
    this.score = 0
    this.uiManager.hideMenu()
    this.audioManager.playMusic('menu')
  }

  private loadLevel(levelNumber: number, difficulty: GameDifficulty) {
    // Clear previous level
    if (this.level) {
      this.level.dispose()
    }

    // Clear scene objects (except lighting)
    this.scene.children = this.scene.children.filter(
      (obj) => obj instanceof THREE.Light || obj instanceof THREE.Mesh && (obj as any).name === 'ground'
    )

    // Create level
    let levelData
    switch (levelNumber) {
      case 1:
        levelData = LevelBuilder.createTutorialLevel(difficulty)
        break
      case 2:
        levelData = LevelBuilder.createLevel1(difficulty)
        break
      default:
        levelData = LevelBuilder.createTutorialLevel(difficulty)
    }

    this.level = new Level(this.scene, levelData, difficulty)

    // Create/reset player
    if (!this.player) {
      this.player = new Player(this.level.getSpawnPosition(), this.physicsWorld)
      this.scene.add(this.player.getMesh())
    } else {
      this.player.setPosition(this.level.getSpawnPosition())
      this.player.reset()
    }

    this.player.setDifficulty(difficulty)
    this.currentDifficulty = difficulty
  }

  private restartLevel() {
    if (this.player && this.level) {
      this.player.setPosition(this.level.getSpawnPosition())
      this.deaths++
      this.isPaused = false
      this.uiManager.hideMenu()
      this.levelStartTime = performance.now()
    }
  }

  private nextLevel() {
    this.currentLevel++
    this.startGame()
  }

  private backToMainMenu() {
    this.gameState = GameState.MENU
    this.isPaused = false
    this.uiManager.showMainMenu()
    this.audioManager.stopMusic()
  }

  private update() {
    TimeUtils.update()

    if (this.gameState !== GameState.PLAYING || this.isPaused) return

    // Update physics
    this.physicsWorld.update(TimeUtils.deltaTime)

    // Update player
    if (this.player) {
      this.player.updateCamera()
      this.player.update()
    }

    // Check if player fell
    if (this.player && this.player.getPosition().y < GAME_CONFIG.DEATH_BOUNDARY) {
      this.restartLevel()
    }

    // Update HUD
    const elapsedTime = (performance.now() - this.levelStartTime) / 1000
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = Math.floor(elapsedTime % 60)
    const milliseconds = Math.floor((elapsedTime % 1) * 100)
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`

    if (this.player) {
      const checkpoint = this.level?.getCheckpointSystem().getCurrentCheckpoint()?.index || 0
      this.uiManager.updateHUD(timeString, this.score, checkpoint + 1, this.deaths)
    }
  }

  private render() {
    if (this.player) {
      const playerPos = this.player.getPosition()
      const playerYaw = this.player.getCameraYaw()
      const playerPitch = this.player.getCameraPitch()
      const isSprinting = this.player.getState().isSprinting
      this.cameraController.update(playerPos, playerYaw, playerPitch, isSprinting)
    }

    this.renderer.render(this.scene, this.camera)
  }

  run() {
    this.uiManager.showMainMenu()
    this.audioManager.playMusic('menu')

    let lastFrameTime = performance.now()

    const gameLoop = () => {
      const now = performance.now()
      const deltaTime = now - lastFrameTime

      if (deltaTime >= this.frameTime) {
        this.update()
        this.render()
        lastFrameTime = now - (deltaTime % this.frameTime)
      }

      requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
  }
}
