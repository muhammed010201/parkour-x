# PARKOUR X - Professional 2D+3D Hybrid Parkour Game

A comprehensive parkour platform game built with TypeScript, Three.js, and advanced physics simulation. Features smooth movement mechanics, multiple difficulty modes, extensive level design, and professional game systems.

## 🎮 Features

### Core Gameplay
- **Advanced Movement System**: Smooth walking, sprinting, and precise jumping mechanics
- **Jump Physics**: Coyote time, jump buffer, variable jump height, and air control
- **Professional Controls**: Responsive keyboard and mouse input with full remapping support
- **Delta-Time Physics**: Frame-rate independent gameplay for consistent performance

### Difficulty Modes
- **EASY**: Large platforms, slow obstacles, forgiving timing
- **NORMAL**: Balanced challenge and gameplay
- **HARD**: Smaller platforms, faster obstacles, precise jumps
- **EXTREME**: Very tight platforming, multiple obstacles
- **INSANE**: Professional-level challenge with complex patterns

### Game Systems
- **5 Complete Levels** per difficulty mode (25+ playable levels total)
- **Checkpoint System**: Automatic progression tracking with manual restart
- **Progress Persistence**: Save and load game progress using localStorage
- **Camera System**: Smooth third-person camera with collision avoidance
- **Audio System**: Music, sound effects, and ambient audio management
- **Professional UI**: Main menu, pause menu, HUD, and level complete screens
- **Physics Engine**: Custom collision detection and velocity management

### Graphics & Performance
- **Three.js Rendering**: High-quality 3D graphics with shadows and lighting
- **Optimized Performance**: Runs on mid-range hardware
- **Multiple Quality Levels**: LOW, MEDIUM, HIGH, ULTRA settings
- **FPS Control**: Configurable frame rate limiting (30/60/120/UNLIMITED)

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ 
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/muhammed010201/parkour-x.git
cd parkour-x

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The game will automatically open in your browser at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 Controls

| Key | Action |
|-----|--------|
| `W` | Move Forward |
| `S` | Move Backward |
| `A` | Move Left |
| `D` | Move Right |
| `SPACE` | Jump |
| `SHIFT` | Sprint |
| `CTRL` | Crouch |
| `MOUSE` | Look Around (Click to lock/unlock) |
| `E` | Interact |
| `R` | Restart from Checkpoint |
| `ESC` | Pause/Menu |

All controls are fully customizable in the Settings menu.

## 📁 Project Structure

```
parkour-x/
├── src/
│   ├── main.ts                    # Entry point
│   ├── game/
│   │   └── Game.ts               # Main game manager & loop
│   ├── player/
│   │   ├── Player.ts             # Player controller
│   │   ├── PlayerMovement.ts      # Movement logic
│   │   ├── PlayerInput.ts         # Input handling
│   │   └── JumpSystem.ts          # Jump mechanics
│   ├── camera/
│   │   └── CameraController.ts    # Third-person camera
│   ├── physics/
│   │   └── PhysicsWorld.ts        # Physics & collisions
│   ├── level/
│   │   ├── Level.ts              # Level manager
│   │   ├── LevelBuilder.ts        # Level creation
│   │   └── ExtendedLevelBuilder.ts # Additional levels
│   ├── ui/
│   │   └── UIManager.ts          # UI system
│   ├── audio/
│   │   └── AudioManager.ts        # Audio system
│   ├── systems/
│   │   ├── CheckpointSystem.ts
│   │   └── SaveSystem.ts
│   ├── input/
│   │   └── InputManager.ts        # Input management
│   ├── utils/
│   │   └── MathUtils.ts          # Math utilities
│   └── data/
│       ├── types.ts              # TypeScript types
│       └── constants.ts          # Game constants
├── public/
│   ├── models/                   # 3D models
│   ├── textures/                 # Textures
│   ├── sounds/                   # Sound effects
│   └── music/                    # Background music
├── index.html                    # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🏗️ Architecture

### Core Systems

**Game Loop**: Delta-time based update cycle
- Frame-rate independent physics
- Consistent gameplay across devices
- Configurable FPS limiting

**Physics Engine**: Custom 3D physics
- Rigidbody dynamics
- Collision detection (box, sphere, capsule)
- Gravity and velocity management
- Raycast support for ground detection

**Input System**: Centralized input management
- Keyboard input with event handling
- Mouse look with pointer locking
- Remappable controls
- Settings persistence

**Level System**: Procedural level management
- JSON-based level data
- Dynamic platform generation
- Checkpoint placement
- Collectible management

### Player Movement

**Ground Movement**:
- Acceleration and deceleration
- Sprint speed boost
- Crouch functionality
- Direction-based movement

**Jumping**:
- Coyote Time (0.15s): Jump window after leaving platform
- Jump Buffer (0.1s): Input acceptance before landing
- Variable Jump Height: Hold space for higher jump
- Air Control: Limited horizontal movement while airborne

**Physics-Based**:
- Velocity-based movement
- Gravity simulation
- Friction application
- Collision response

## 🎨 Graphics Settings

Adjustable quality options:

**LOW**:
- Basic shadows disabled
- Standard lighting
- Lower texture quality
- No advanced effects
- 30-60 FPS target

**MEDIUM** (Default):
- Soft shadows
- Ambient lighting
- Standard textures
- Basic effects
- 60 FPS target

**HIGH**:
- PCF Shadows
- Full lighting
- High-quality textures
- All effects enabled
- 60-120 FPS target

**ULTRA**:
- Maximum shadow quality
- Advanced lighting
- Premium textures
- Full effects
- 120+ FPS target

## 📊 Game Systems

### Checkpoint System
- Automatic checkpoint placement in levels
- Manual restart with R key
- Visual and audio feedback
- Progress tracking
- Checkpoint state saving

### Save System
- Browser localStorage persistence
- Automatic progress saving
- Settings retention
- Level completion tracking
- Personal best times

### Audio System
- Background music management
- Sound effect playback
- Ambient audio layers
- Volume control per category
- Master volume control

### UI System
- Main menu interface
- Pause menu
- In-game HUD
- Level complete screen
- Settings menu
- Loading screen

## 🎯 Level Design

Each level features:
- **Progression**: Easy to difficult sections
- **Variety**: Different platform types and materials
- **Challenge**: Timed sections and precision jumps
- **Checkpoints**: Strategic save points
- **Collectibles**: Hidden bonuses and secrets

### Available Levels

**Level 1 - Tutorial**: Introduction to movement and jumping
**Level 2 - Urban Parkour**: Building-to-building traversal
**Level 3 - Construction Zone**: Industrial obstacles and beams
**Level 4 - Warehouse**: Box climbing and shelf navigation
**Level 5 - Extreme Challenge**: Precision platforming at its finest

Each level available in 5 difficulty modes.

## ⚙️ Configuration

### Game Constants

Edit `src/data/constants.ts` to adjust:

```typescript
// Physics
GRAVITY: -9.81
PLAYER_SPEED: 15
PLAYER_SPRINT_SPEED: 25
JUMP_FORCE: 12

// Timing
COYOTE_TIME: 0.15
JUMP_BUFFER_TIME: 0.1
MAX_JUMP_HOLD_TIME: 0.2

// Camera
CAMERA_DISTANCE: 5
CAMERA_FOV: 75
CAMERA_SMOOTH_TIME: 0.3

// Difficulty Multipliers
DIFFICULTY_SETTINGS: {
  EASY: { platformScale: 1.5, ... }
  NORMAL: { platformScale: 1.0, ... }
  // etc.
}
```

## 🐛 Known Limitations

- Desktop browsers only (Chrome, Firefox, Safari, Edge)
- Requires WebGL support
- Mobile touch controls not implemented
- Sound files need to be placed in `/public/sounds/` directory
- Music files need to be placed in `/public/music/` directory
- Ambient audio files need to be placed in `/public/ambient/` directory

## 🚀 Performance Optimization

The game implements several optimization techniques:

- **Object Pooling**: Reusable particle objects
- **Level of Detail (LOD)**: Reduced geometry for distant objects
- **Frustum Culling**: Only render visible objects
- **Physics Optimization**: Efficient collision detection
- **Asset Reuse**: Shared materials and geometries
- **Delta-Time Scaling**: Consistent physics regardless of FPS

## 📝 Development Guidelines

### Code Standards
- TypeScript for type safety
- Modular component architecture
- Clear separation of concerns
- Comprehensive error handling
- Performance-conscious design

### Testing Checklist
- Player movement and controls
- Jump mechanics (coyote time, buffer)
- Platform collision detection
- Camera behavior
- Audio playback
- Save/load functionality
- UI interactions
- Difficulty scaling

## 🔧 Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Dependencies

- **three**: 3D graphics library (v128+)
- **typescript**: Language and type safety
- **vite**: Build tool and dev server

## 🎯 Future Enhancements

- Mobile touch controls
- Multiplayer support
- Advanced physics (ragdoll, destruction)
- Advanced graphics (PBR materials, reflections)
- Level editor
- Replay system
- Leaderboards
- Advanced audio (3D positional audio)
- VR support

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Muhammed Ali** - Full Stack Game Developer

---

**Status**: Active Development 🚀

**Version**: 1.0.0

**Last Updated**: September 2026

---

**Play PARKOUR X and master the art of parkour! 🏃‍♂️**

For issues and feature requests, please open an issue on GitHub.
