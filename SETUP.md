# PARKOUR X - Setup & Installation Guide

## Quick Start (5 Minutes)

### Step 1: Clone Repository
```bash
git clone https://github.com/muhammed010201/parkour-x.git
cd parkour-x
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

The game will open automatically at `http://localhost:5173`

---

## System Requirements

### Minimum
- **OS**: Windows, macOS, Linux
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: 4GB
- **GPU**: Integrated graphics or better
- **Node.js**: v16.0.0 or higher

### Recommended
- **Browser**: Chrome/Edge (latest)
- **RAM**: 8GB+
- **GPU**: Dedicated GPU (NVIDIA/AMD)
- **Node.js**: v18.0.0 or higher

---

## Installation Methods

### Method 1: Using NPM (Recommended)

```bash
# Install Node.js from https://nodejs.org/

# Clone repository
git clone https://github.com/muhammed010201/parkour-x.git
cd parkour-x

# Install dependencies
npm install

# Start development server
npm run dev
```

### Method 2: Using Yarn

```bash
# Install Yarn globally
npm install -g yarn

# Clone repository
git clone https://github.com/muhammed010201/parkour-x.git
cd parkour-x

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Method 3: Using PNPM

```bash
# Install PNPM globally
npm install -g pnpm

# Clone repository
git clone https://github.com/muhammed010201/parkour-x.git
cd parkour-x

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

---

## Development Setup

### IDE Setup (VS Code Recommended)

1. **Install VS Code**: https://code.visualstudio.com/

2. **Install Extensions**:
   - TypeScript Vue Plugin (Vue)
   - ESLint
   - Prettier - Code formatter
   - Three.js Snippets

3. **Open Project**:
```bash
code .
```

4. **Configure Settings** (.vscode/settings.json):
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Development Server

```bash
# Start with hot reload
npm run dev

# Server will start at http://localhost:5173
# Changes automatically refresh in browser
```

---

## Building for Production

### Production Build

```bash
# Create optimized production build
npm run build

# Output will be in ./dist directory
```

### Preview Production Build

```bash
# Test production build locally
npm run preview

# Server will start at http://localhost:4173
```

### Deploy to GitHub Pages

```bash
# Build
npm run build

# Deploy (requires GitHub CLI or manual upload)
git add dist/
git commit -m "Production build"
git push origin main
```

---

## Project Structure

```
parkour-x/
├── src/
│   ├── main.ts                    # Entry point
│   ├── game/
│   │   └── Game.ts               # Main game class
│   ├── player/
│   │   ├── Player.ts             # Player controller
│   │   ├── PlayerMovement.ts      # Movement logic
│   │   ├── PlayerInput.ts         # Input handling
│   │   └── JumpSystem.ts          # Jump mechanics
│   ├── camera/
│   │   └── CameraController.ts    # Camera system
│   ├── physics/
│   │   └── PhysicsWorld.ts        # Physics engine
│   ├── level/
│   │   ├── Level.ts              # Level manager
│   │   ├── LevelBuilder.ts        # Level 1-2
│   │   └── ExtendedLevelBuilder.ts # Level 3-5
│   ├── ui/
│   │   └── UIManager.ts          # UI system
│   ├── audio/
│   │   └── AudioManager.ts        # Audio system
│   ├── systems/
│   │   ├── CheckpointSystem.ts    # Checkpoints
│   │   └── SaveSystem.ts          # Save/load
│   ├── input/
│   │   └── InputManager.ts        # Input system
│   ├── utils/
│   │   └── MathUtils.ts           # Math utilities
│   └── data/
│       ├── types.ts              # TypeScript types
│       └── constants.ts          # Constants
├── public/
│   ├── sounds/                    # Sound effects (add here)
│   ├── music/                     # Background music (add here)
│   └── ambient/                   # Ambient audio (add here)
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
├── .gitignore
├── README.md
└── SETUP.md                       # This file
```

---

## Customization

### Game Constants

Edit `src/data/constants.ts`:

```typescript
// Player movement speed
PLAYER_SPEED: 15
PLAYER_SPRINT_SPEED: 25

// Jump physics
JUMP_FORCE: 12
COYOTE_TIME: 0.15      // Time to jump after leaving platform
JUMP_BUFFER_TIME: 0.1  // Time to buffer jump input

// Camera settings
CAMERA_DISTANCE: 5
CAMERA_FOV: 75

// Difficulty multipliers
DIFFICULTY_SETTINGS: {
  EASY: { platformScale: 1.5, ... }
  // ...
}
```

### Game Settings

Default settings in `src/data/constants.ts`:

```typescript
DEFAULT_CONTROLS
DEFAULT_GRAPHICS_SETTINGS
DEFAULT_AUDIO_SETTINGS
```

### Adding Custom Levels

Create a new level builder method in `src/level/LevelBuilder.ts`:

```typescript
static createCustomLevel(difficulty: GameDifficulty): LevelData {
  return {
    id: 'custom_level',
    name: 'My Custom Level',
    difficulty,
    section: 6,
    platforms: [
      {
        id: 'platform_1',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 3, y: 0.5, z: 3 },
        material: 'concrete',
        isMoving: false
      }
      // Add more platforms...
    ],
    obstacles: [],
    checkpoints: [],
    collectibles: [],
    spawn: { x: 0, y: 1, z: 0 },
    finish: { x: 20, y: 0, z: 0 }
  }
}
```

Then add to Game.ts:

```typescript
case 3:
  levelData = LevelBuilder.createCustomLevel(difficulty)
  break
```

---

## Troubleshooting

### Problem: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Problem: Port 5173 already in use

**Solution**:
```bash
# Use different port
npm run dev -- --port 3000
```

### Problem: WebGL not supported

**Solution**:
- Update GPU drivers
- Use Chrome/Firefox (more WebGL support)
- Check browser console for specific error

### Problem: Audio not playing

**Solution**:
1. Add audio files to `/public/sounds/`, `/public/music/`, `/public/ambient/`
2. Check browser console for errors
3. Ensure audio file formats are supported (MP3, WAV, OGG)

### Problem: Game runs slowly

**Solution**:
1. Lower graphics quality in settings (LOW or MEDIUM)
2. Close other browser tabs
3. Check GPU temperature
4. Update graphics drivers
5. Use Chrome (best performance)

### Problem: Controls not responding

**Solution**:
1. Click on game window to ensure focus
2. Check if pointer is locked (click to unlock)
3. Refresh page (F5)
4. Clear browser cache
5. Try different browser

---

## Performance Tips

### For Better Performance

1. **Browser Settings**:
   - Use Chrome or Edge (best WebGL support)
   - Disable extensions
   - Close other tabs

2. **Game Settings**:
   - Set quality to LOW or MEDIUM
   - Limit FPS to 60
   - Disable effects and shadows if needed

3. **System Settings**:
   - Close background applications
   - Ensure good GPU driver
   - Check system RAM availability

### For Development

1. Use VS Code debugger
2. Check browser DevTools (F12)
3. Monitor FPS counter
4. Use Chrome Performance tab to profile

---

## Adding Assets

### Sound Effects

Place files in `public/sounds/`:
```
public/sounds/
├── jump.mp3
├── land.mp3
├── checkpoint.mp3
└── ...
```

Play in code:
```typescript
const audioManager = AudioManager.getInstance()
audioManager.playSound('jump')
```

### Music

Place files in `public/music/`:
```
public/music/
├── menu.mp3
├── level1.mp3
└── ...
```

Play in code:
```typescript
audioManager.playMusic('menu')
```

### 3D Models

Place models in `public/models/`:
```
public/models/
├── player.gltf
├── platform.gltf
└── ...
```

---

## Debugging

### Browser Console

Press `F12` to open developer tools:

```javascript
// Check game state
console.log(window.gameInstance)

// Monitor FPS
console.log('FPS:', 1/deltaTime)

// Check errors
// Look for red error messages
```

### VS Code Debugging

1. Install "Debugger for Chrome" extension
2. Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

3. Press F5 to start debugging

---

## Git Workflow

### Creating a Feature Branch

```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### Creating a Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request"
3. Add description
4. Submit PR

---

## Performance Targets

- **60 FPS** on mid-range hardware
- **<100ms** input latency
- **<50MB** total asset size
- **<5 seconds** initial load time
- **<2 seconds** level load time

---

## Common Commands

```bash
# Development
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build

# Clean install
rm -rf node_modules   # Remove node_modules
rm package-lock.json  # Remove lock file
npm install           # Fresh install

# Git commands
git status            # Check status
git add .             # Stage changes
git commit -m "msg"   # Commit changes
git push              # Push to remote
git pull              # Pull from remote
```

---

## Resources

- **Three.js Docs**: https://threejs.org/docs/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Vite Documentation**: https://vitejs.dev/guide/
- **MDN Web Docs**: https://developer.mozilla.org/
- **WebGL Specification**: https://www.khronos.org/webgl/

---

## Support

For issues:
1. Check existing issues on GitHub
2. Review troubleshooting section above
3. Open new issue with details
4. Include browser, OS, and error messages

---

**Ready to develop? Run `npm run dev` and start building!** 🚀
