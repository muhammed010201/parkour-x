/**
 * Application entry point
 */

import { Game } from './game/Game'

const initializeApp = () => {
  const game = new Game()
  game.run()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}
