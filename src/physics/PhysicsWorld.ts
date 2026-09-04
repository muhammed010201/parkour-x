/**
 * Physics world and collision detection
 */

import { Vector3 } from '../data/types'
import { GAME_CONFIG } from '../data/constants'
import { Vector3Utils, TimeUtils } from '../utils/MathUtils'

export interface RigidBody {
  position: Vector3
  velocity: Vector3
  acceleration: Vector3
  mass: number
  friction: number
  useGravity: boolean
  isKinematic: boolean
}

export interface Collider {
  type: 'box' | 'sphere' | 'capsule'
  size: Vector3
  offset: Vector3
  isTrigger: boolean
  rigidBody?: RigidBody
}

export class PhysicsWorld {
  private gravity: number = GAME_CONFIG.GRAVITY
  private rigidBodies: RigidBody[] = []
  private colliders: Map<string, Collider> = new Map()
  private contactPairs: Set<string> = new Set()

  addRigidBody(rigidBody: RigidBody): RigidBody {
    this.rigidBodies.push(rigidBody)
    return rigidBody
  }

  addCollider(id: string, collider: Collider): Collider {
    this.colliders.set(id, collider)
    return collider
  }

  removeRigidBody(rigidBody: RigidBody) {
    const index = this.rigidBodies.indexOf(rigidBody)
    if (index > -1) {
      this.rigidBodies.splice(index, 1)
    }
  }

  removeCollider(id: string) {
    this.colliders.delete(id)
  }

  update(deltaTime: number) {
    // Apply gravity and forces
    for (const body of this.rigidBodies) {
      if (!body.isKinematic && body.useGravity) {
        body.acceleration.y = this.gravity
      }

      // Update velocity
      body.velocity.x += body.acceleration.x * deltaTime
      body.velocity.y += body.acceleration.y * deltaTime
      body.velocity.z += body.acceleration.z * deltaTime

      // Apply friction
      body.velocity.x *= body.friction
      body.velocity.z *= body.friction

      // Clamp velocity
      const speed = Vector3Utils.length(body.velocity)
      if (speed > GAME_CONFIG.MAX_VELOCITY) {
        const normalized = Vector3Utils.normalize(body.velocity)
        body.velocity = Vector3Utils.multiply(normalized, GAME_CONFIG.MAX_VELOCITY)
      }

      // Update position
      body.position.x += body.velocity.x * deltaTime
      body.position.y += body.velocity.y * deltaTime
      body.position.z += body.velocity.z * deltaTime
    }

    // Check collisions
    this.checkCollisions()
  }

  private checkCollisions() {
    const ids = Array.from(this.colliders.keys())
    this.contactPairs.clear()

    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const colliderA = this.colliders.get(ids[i])!
        const colliderB = this.colliders.get(ids[j])!

        if (this.isColliding(colliderA, colliderB)) {
          const pair = `${ids[i]}-${ids[j]}`
          this.contactPairs.add(pair)
        }
      }
    }
  }

  private isColliding(colliderA: Collider, colliderB: Collider): boolean {
    if (colliderA.type === 'sphere' && colliderB.type === 'box') {
      return this.sphereBoxCollision(colliderA, colliderB)
    }
    if (colliderA.type === 'box' && colliderB.type === 'sphere') {
      return this.sphereBoxCollision(colliderB, colliderA)
    }
    if (colliderA.type === 'sphere' && colliderB.type === 'sphere') {
      return this.sphereSphereCollision(colliderA, colliderB)
    }
    if (colliderA.type === 'box' && colliderB.type === 'box') {
      return this.boxBoxCollision(colliderA, colliderB)
    }
    return false
  }

  private sphereBoxCollision(sphere: Collider, box: Collider): boolean {
    if (!sphere.rigidBody || !box.rigidBody) return false

    const spherePos = Vector3Utils.add(sphere.rigidBody.position, sphere.offset)
    const boxPos = Vector3Utils.add(box.rigidBody.position, box.offset)

    const closestX = Math.max(boxPos.x - box.size.x / 2, Math.min(spherePos.x, boxPos.x + box.size.x / 2))
    const closestY = Math.max(boxPos.y - box.size.y / 2, Math.min(spherePos.y, boxPos.y + box.size.y / 2))
    const closestZ = Math.max(boxPos.z - box.size.z / 2, Math.min(spherePos.z, boxPos.z + box.size.z / 2))

    const distance = Math.sqrt(
      (closestX - spherePos.x) ** 2 +
      (closestY - spherePos.y) ** 2 +
      (closestZ - spherePos.z) ** 2
    )

    return distance < sphere.size.x / 2
  }

  private sphereSphereCollision(sphereA: Collider, sphereB: Collider): boolean {
    if (!sphereA.rigidBody || !sphereB.rigidBody) return false

    const posA = Vector3Utils.add(sphereA.rigidBody.position, sphereA.offset)
    const posB = Vector3Utils.add(sphereB.rigidBody.position, sphereB.offset)

    const distance = Vector3Utils.distance(posA, posB)
    const radiusSum = sphereA.size.x / 2 + sphereB.size.x / 2

    return distance < radiusSum
  }

  private boxBoxCollision(boxA: Collider, boxB: Collider): boolean {
    if (!boxA.rigidBody || !boxB.rigidBody) return false

    const posA = Vector3Utils.add(boxA.rigidBody.position, boxA.offset)
    const posB = Vector3Utils.add(boxB.rigidBody.position, boxB.offset)

    return (
      posA.x - boxA.size.x / 2 < posB.x + boxB.size.x / 2 &&
      posA.x + boxA.size.x / 2 > posB.x - boxB.size.x / 2 &&
      posA.y - boxA.size.y / 2 < posB.y + boxB.size.y / 2 &&
      posA.y + boxA.size.y / 2 > posB.y - boxB.size.y / 2 &&
      posA.z - boxA.size.z / 2 < posB.z + boxB.size.z / 2 &&
      posA.z + boxA.size.z / 2 > posB.z - boxB.size.z / 2
    )
  }

  isColliding(idA: string, idB: string): boolean {
    const pair = `${idA}-${idB}`
    return this.contactPairs.has(pair) || this.contactPairs.has(`${idB}-${idA}`)
  }

  rayCast(origin: Vector3, direction: Vector3, maxDistance: number): { hit: boolean; distance: number; collider?: Collider } {
    let closestDistance = maxDistance
    let closestCollider: Collider | undefined

    for (const collider of this.colliders.values()) {
      if (!collider.rigidBody) continue

      const pos = Vector3Utils.add(collider.rigidBody.position, collider.offset)
      const toCollider = Vector3Utils.subtract(pos, origin)
      const distance = Vector3Utils.dot(toCollider, direction)

      if (distance > 0 && distance < closestDistance) {
        const closest = Vector3Utils.add(origin, Vector3Utils.multiply(direction, distance))
        const diff = Vector3Utils.distance(closest, pos)

        if (diff < collider.size.x / 2 && distance < closestDistance) {
          closestDistance = distance
          closestCollider = collider
        }
      }
    }

    return {
      hit: closestCollider !== undefined,
      distance: closestDistance,
      collider: closestCollider
    }
  }
}
