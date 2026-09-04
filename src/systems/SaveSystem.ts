/**
 * Save system for progress persistence
 */

import { GameProgress, LevelProgress, GameSettings, GameDifficulty } from '../data/types'
import { GAME_CONFIG, DEFAULT_GRAPHICS_SETTINGS, DEFAULT_AUDIO_SETTINGS, DEFAULT_CONTROLS } from '../data/constants'

export class SaveSystem {
  private storagePrefix: string = 'parkour_x_'

  saveProgress(progress: GameProgress): boolean {
    try {
      const data = JSON.stringify(progress)
      localStorage.setItem(this.storagePrefix + 'progress', data)
      return true
    } catch (error) {
      console.error('Failed to save progress:', error)
      return false
    }
  }

  loadProgress(): GameProgress | null {
    try {
      const data = localStorage.getItem(this.storagePrefix + 'progress')
      if (!data) return null
      return JSON.parse(data) as GameProgress
    } catch (error) {
      console.error('Failed to load progress:', error)
      return null
    }
  }

  saveSettings(settings: GameSettings): boolean {
    try {
      const data = JSON.stringify(settings)
      localStorage.setItem(this.storagePrefix + 'settings', data)
      return true
    } catch (error) {
      console.error('Failed to save settings:', error)
      return false
    }
  }

  loadSettings(): GameSettings | null {
    try {
      const data = localStorage.getItem(this.storagePrefix + 'settings')
      if (!data) return null
      return JSON.parse(data) as GameSettings
    } catch (error) {
      console.error('Failed to load settings:', error)
      return null
    }
  }

  saveLevelProgress(levelId: string, progress: LevelProgress): boolean {
    try {
      const data = JSON.stringify(progress)
      localStorage.setItem(this.storagePrefix + 'level_' + levelId, data)
      return true
    } catch (error) {
      console.error(`Failed to save level ${levelId} progress:`, error)
      return false
    }
  }

  loadLevelProgress(levelId: string): LevelProgress | null {
    try {
      const data = localStorage.getItem(this.storagePrefix + 'level_' + levelId)
      if (!data) return null
      return JSON.parse(data) as LevelProgress
    } catch (error) {
      console.error(`Failed to load level ${levelId} progress:`, error)
      return null
    }
  }

  clearAllData(): boolean {
    try {
      const keys = Object.keys(localStorage)
      for (const key of keys) {
        if (key.startsWith(this.storagePrefix)) {
          localStorage.removeItem(key)
        }
      }
      return true
    } catch (error) {
      console.error('Failed to clear data:', error)
      return false
    }
  }

  getDefaultProgress(): GameProgress {
    return {
      currentDifficulty: GameDifficulty.NORMAL,
      currentLevel: 1,
      currentSection: 1,
      currentCheckpoint: 0,
      unlockedDifficulties: [GameDifficulty.EASY, GameDifficulty.NORMAL],
      levelProgress: [],
      totalScore: 0,
      totalDeaths: 0
    }
  }

  getDefaultSettings(): GameSettings {
    return {
      graphics: DEFAULT_GRAPHICS_SETTINGS,
      audio: DEFAULT_AUDIO_SETTINGS,
      controls: DEFAULT_CONTROLS,
      cameraSensitivity: 1,
      mouseSensitivity: 1,
      invertY: false,
      enableCameraShake: true,
      enableMotionEffects: true,
      uiScale: 1
    }
  }
}
