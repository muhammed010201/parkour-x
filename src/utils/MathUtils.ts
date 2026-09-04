/**
 * Utility functions for vector operations
 */

export class Vector3Utils {
  static add(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }
  }

  static subtract(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z }
  }

  static multiply(v: { x: number; y: number; z: number }, scalar: number) {
    return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar }
  }

  static dot(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }

  static cross(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    }
  }

  static length(v: { x: number; y: number; z: number }) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
  }

  static normalize(v: { x: number; y: number; z: number }) {
    const len = this.length(v)
    if (len === 0) return { x: 0, y: 0, z: 0 }
    return { x: v.x / len, y: v.y / len, z: v.z / len }
  }

  static distance(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dz = a.z - b.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }

  static lerp(a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }, t: number) {
    return {
      x: a.x + (b.x - a.x) * t,
      y: a.y + (b.y - a.y) * t,
      z: a.z + (b.z - a.z) * t
    }
  }

  static clamp(v: { x: number; y: number; z: number }, min: number, max: number) {
    return {
      x: Math.max(min, Math.min(max, v.x)),
      y: Math.max(min, Math.min(max, v.y)),
      z: Math.max(min, Math.min(max, v.z))
    }
  }

  static clone(v: { x: number; y: number; z: number }) {
    return { x: v.x, y: v.y, z: v.z }
  }

  static zero() {
    return { x: 0, y: 0, z: 0 }
  }
}

export class MathUtils {
  static clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value))
  }

  static lerp(a: number, b: number, t: number) {
    return a + (b - a) * t
  }

  static smoothstep(t: number) {
    return t * t * (3 - 2 * t)
  }

  static smoothDamp(current: number, target: number, velocity: { value: number }, smoothTime: number, deltaTime: number, maxSpeed: number = Infinity) {
    smoothTime = Math.max(0.0001, smoothTime)
    const omega = 2 / smoothTime

    const x = omega * deltaTime
    const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)

    let change = current - target
    const originalTo = target
    const maxChange = maxSpeed * smoothTime
    change = MathUtils.clamp(change, -maxChange, maxChange)
    target = current - change

    const cd = (velocity.value + omega * change) * deltaTime
    velocity.value = (velocity.value - omega * cd) * exp

    let output = target + (change + cd) * exp

    if (originalTo - current > 0 === output > originalTo) {
      output = originalTo
      velocity.value = (output - originalTo) / deltaTime
    }

    return output
  }

  static degrees(radians: number) {
    return radians * (180 / Math.PI)
  }

  static radians(degrees: number) {
    return degrees * (Math.PI / 180)
  }
}

export class TimeUtils {
  static deltaTime: number = 0
  static time: number = 0
  static timeScale: number = 1
  private static lastTime: number = performance.now()

  static update() {
    const now = performance.now()
    this.deltaTime = (now - this.lastTime) / 1000 * this.timeScale
    this.time += this.deltaTime
    this.lastTime = now
  }

  static reset() {
    this.deltaTime = 0
    this.time = 0
    this.lastTime = performance.now()
  }
}
