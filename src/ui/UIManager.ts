/**
 * UI Manager and components
 */

export class UIManager {
  private container: HTMLDivElement
  private hudContainer: HTMLDivElement
  private menuContainer: HTMLDivElement
  private isPaused: boolean = false

  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'ui-container'
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-family: 'Arial', sans-serif;
      color: #fff;
      pointer-events: none;
      z-index: 100;
    `
    document.body.appendChild(this.container)

    this.hudContainer = document.createElement('div')
    this.hudContainer.id = 'hud'
    this.hudContainer.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      pointer-events: auto;
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 10px;
    `
    this.container.appendChild(this.hudContainer)

    this.menuContainer = document.createElement('div')
    this.menuContainer.id = 'menu'
    this.menuContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
      pointer-events: auto;
      z-index: 200;
    `
    this.container.appendChild(this.menuContainer)
  }

  updateHUD(time: string, score: number, checkpoint: number, deaths: number) {
    const hudHTML = `
      <div style="font-size: 24px; font-weight: bold; color: #00ff00; text-shadow: 0 0 10px #00ff00;">
        TIME: ${time}
      </div>
      <div style="font-size: 20px; color: #ffff00;">SCORE: ${score}</div>
      <div style="font-size: 20px; color: #ff6b6b; text-align: right;">
        CHECKPOINT: ${checkpoint}<br>DEATHS: ${deaths}
      </div>
    `
    this.hudContainer.innerHTML = hudHTML
  }

  showMainMenu() {
    this.menuContainer.style.display = 'flex'
    const menuHTML = `
      <h1 style="font-size: 64px; margin-bottom: 40px; color: #00ff00; text-shadow: 0 0 20px #00ff00;">PARKOUR X</h1>
      <div style="display: flex; flex-direction: column; gap: 15px; pointer-events: auto;">
        <button class="menu-btn" data-action="play" style="${this.getButtonStyle()}">PLAY</button>
        <button class="menu-btn" data-action="settings" style="${this.getButtonStyle()}">SETTINGS</button>
        <button class="menu-btn" data-action="credits" style="${this.getButtonStyle()}">CREDITS</button>
      </div>
    `
    this.menuContainer.innerHTML = menuHTML
  }

  showPauseMenu() {
    this.isPaused = true
    this.menuContainer.style.display = 'flex'
    const menuHTML = `
      <h2 style="font-size: 48px; color: #ffff00; margin-bottom: 40px;">PAUSED</h2>
      <div style="display: flex; flex-direction: column; gap: 15px; pointer-events: auto;">
        <button class="menu-btn" data-action="resume" style="${this.getButtonStyle()}">RESUME</button>
        <button class="menu-btn" data-action="restart" style="${this.getButtonStyle()}">RESTART LEVEL</button>
        <button class="menu-btn" data-action="settings" style="${this.getButtonStyle()}">SETTINGS</button>
        <button class="menu-btn" data-action="mainmenu" style="${this.getButtonStyle()}">MAIN MENU</button>
      </div>
    `
    this.menuContainer.innerHTML = menuHTML
  }

  showLevelCompleteScreen(time: string, score: number, collectibles: number) {
    this.menuContainer.style.display = 'flex'
    const screenHTML = `
      <h2 style="font-size: 48px; color: #00ff00; margin-bottom: 40px; text-shadow: 0 0 20px #00ff00;">LEVEL COMPLETE!</h2>
      <div style="font-size: 24px; color: #fff; margin-bottom: 40px; text-align: center;">
        <p>TIME: ${time}</p>
        <p>SCORE: ${score}</p>
        <p>COLLECTIBLES: ${collectibles}</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 15px; pointer-events: auto;">
        <button class="menu-btn" data-action="nextlevel" style="${this.getButtonStyle()}">NEXT LEVEL</button>
        <button class="menu-btn" data-action="replay" style="${this.getButtonStyle()}">REPLAY</button>
        <button class="menu-btn" data-action="mainmenu" style="${this.getButtonStyle()}">MAIN MENU</button>
      </div>
    `
    this.menuContainer.innerHTML = screenHTML
  }

  private getButtonStyle(): string {
    return `
      padding: 15px 30px;
      font-size: 20px;
      color: #fff;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #667eea;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: bold;
      text-transform: uppercase;
    `
  }

  hideMenu() {
    this.menuContainer.style.display = 'none'
    this.isPaused = false
  }

  getMenuContainer(): HTMLDivElement {
    return this.menuContainer
  }

  getContainer(): HTMLDivElement {
    return this.container
  }

  on(event: string, callback: (action: string) => void) {
    this.menuContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.classList.contains('menu-btn')) {
        const action = target.getAttribute('data-action')
        if (action) callback(action)
      }
    })
  }

  showLoading(progress: number) {
    const loadingHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      ">
        <h2 style="font-size: 32px; color: #00ff00; margin-bottom: 20px;">LOADING...</h2>
        <div style="width: 300px; height: 30px; background: #333; border: 2px solid #00ff00; border-radius: 5px; overflow: hidden;">
          <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, #667eea, #764ba2); transition: width 0.3s;"></div>
        </div>
        <p style="color: #fff; margin-top: 20px;">${Math.floor(progress)}%</p>
      </div>
    `
    this.container.innerHTML = loadingHTML
  }
}
