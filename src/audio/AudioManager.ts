/**
 * Audio management system
 */

import { AudioSettings } from '../data/types'
import { DEFAULT_AUDIO_SETTINGS } from '../data/constants'

export class AudioManager {
  private static instance: AudioManager
  private settings: AudioSettings = DEFAULT_AUDIO_SETTINGS
  private audioContext: AudioContext | null = null
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private musicTrack: HTMLAudioElement | null = null
  private ambientAudio: HTMLAudioElement | null = null
  private enabled: boolean = true

  private constructor() {
    this.initializeAudioContext()
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager()
    }
    return AudioManager.instance
  }

  private initializeAudioContext() {
    try {
      const audioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext
      this.audioContext = new audioContextClass()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  playSound(id: string, volume: number = 1) {
    if (!this.enabled) return

    let audio = this.sounds.get(id)
    if (!audio) {
      audio = new Audio()
      audio.src = `/sounds/${id}.mp3`
      this.sounds.set(id, audio)
    }

    audio.volume = volume * this.settings.sfxVolume * this.settings.masterVolume
    audio.currentTime = 0
    audio.play().catch(() => {
      // Silently fail if audio cannot play
    })
  }

  playMusic(trackId: string, loop: boolean = true) {
    if (!this.enabled) return

    if (this.musicTrack) {
      this.musicTrack.pause()
    }

    this.musicTrack = new Audio()
    this.musicTrack.src = `/music/${trackId}.mp3`
    this.musicTrack.loop = loop
    this.musicTrack.volume = this.settings.musicVolume * this.settings.masterVolume
    this.musicTrack.play().catch(() => {
      // Silently fail if audio cannot play
    })
  }

  stopMusic() {
    if (this.musicTrack) {
      this.musicTrack.pause()
      this.musicTrack.currentTime = 0
    }
  }

  playAmbient(trackId: string) {
    if (!this.enabled) return

    if (this.ambientAudio) {
      this.ambientAudio.pause()
    }

    this.ambientAudio = new Audio()
    this.ambientAudio.src = `/ambient/${trackId}.mp3`
    this.ambientAudio.loop = true
    this.ambientAudio.volume = this.settings.ambientVolume * this.settings.masterVolume
    this.ambientAudio.play().catch(() => {
      // Silently fail if audio cannot play
    })
  }

  stopAmbient() {
    if (this.ambientAudio) {
      this.ambientAudio.pause()
      this.ambientAudio.currentTime = 0
    }
  }

  setVolume(channel: keyof AudioSettings, volume: number) {
    this.settings[channel] = Math.max(0, Math.min(1, volume))
    this.updateVolumes()
  }

  private updateVolumes() {
    if (this.musicTrack) {
      this.musicTrack.volume = this.settings.musicVolume * this.settings.masterVolume
    }
    if (this.ambientAudio) {
      this.ambientAudio.volume = this.settings.ambientVolume * this.settings.masterVolume
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (!enabled) {
      this.stopMusic()
      this.stopAmbient()
    }
  }

  loadSettings(settings: AudioSettings) {
    this.settings = settings
    this.updateVolumes()
  }
}
