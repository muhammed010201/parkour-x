/**
 * Checkpoint system for level progression
 */

import { Vector3, CheckpointData, Quaternion } from '../data/types'
import { Vector3Utils } from '../utils/MathUtils'

export class CheckpointSystem {
  private checkpoints: Map<string, CheckpointData> = new Map()
  private currentCheckpoint: string = ''
  private currentCheckpointIndex: number = 0
  private checkpointReached: Map<string, boolean> = new Map()

  addCheckpoint(checkpoint: CheckpointData) {
    const id = `checkpoint_${checkpoint.index}`
    this.checkpoints.set(id, checkpoint)
  }

  setCurrentCheckpoint(checkpointIndex: number) {
    const id = `checkpoint_${checkpointIndex}`
    if (this.checkpoints.has(id)) {
      this.currentCheckpoint = id
      this.currentCheckpointIndex = checkpointIndex
      this.checkpointReached.set(id, true)
      return true
    }
    return false
  }

  getCurrentCheckpoint(): CheckpointData | null {
    if (!this.currentCheckpoint) {
      // Return first checkpoint if none set
      const firstCheckpoint = Array.from(this.checkpoints.values()).sort((a, b) => a.index - b.index)[0]
      return firstCheckpoint || null
    }
    return this.checkpoints.get(this.currentCheckpoint) || null
  }

  getCurrentCheckpointPosition(): Vector3 {
    const checkpoint = this.getCurrentCheckpoint()
    return checkpoint ? checkpoint.position : Vector3Utils.zero()
  }

  getCheckpointCount(): number {
    return this.checkpoints.size
  }

  getNextCheckpoint(): CheckpointData | null {
    const nextCheckpoint = Array.from(this.checkpoints.values()).find(
      (cp) => cp.index === this.currentCheckpointIndex + 1
    )
    return nextCheckpoint || null
  }

  isCheckpointReached(checkpointIndex: number): boolean {
    const id = `checkpoint_${checkpointIndex}`
    return this.checkpointReached.get(id) || false
  }

  reset() {
    this.currentCheckpoint = ''
    this.currentCheckpointIndex = 0
    this.checkpointReached.clear()
  }
}
